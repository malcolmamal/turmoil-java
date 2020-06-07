package info.nemhauser.turmoil.engine.instances;

import info.nemhauser.turmoil.engine.domain.Monster;
import info.nemhauser.turmoil.engine.domain.Person;
import info.nemhauser.turmoil.engine.exceptions.GraphException;
import info.nemhauser.turmoil.engine.world.map.graph.Instance;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.DefaultUndirectedGraph;
import org.springframework.util.SerializationUtils;

import java.util.HashMap;
import java.util.LinkedHashMap;

public class CombatState
{
	private DefaultUndirectedGraph<String, DefaultEdge> instanceGraph;

	public Person friend;
	public Monster enemy;

	private final LinkedHashMap<String, Monster> enemies = new LinkedHashMap<>();

	public Integer turn = 1;

	//CombatRoundState ?

	public CombatState()
	{
		instanceGraph = Instance.getInstanceGraph();
	}

	public LinkedHashMap<String, Monster> getEnemies()
	{
		return enemies;
	}

	public Monster getEnemy(String key)
	{
		return enemies.get(key);
	}

	public void addEnemy(Monster monster)
	{
		enemies.put(monster.getIdent(), monster);

		enemy = monster;
	}

	public DefaultUndirectedGraph<String, DefaultEdge> getInstanceGraph()
	{
		return instanceGraph;
	}

	public DefaultUndirectedGraph<String, DefaultEdge> getInstanceGraphForEnemy(Monster enemy) throws GraphException
	{
		DefaultUndirectedGraph<String, DefaultEdge> graph = (DefaultUndirectedGraph<String, DefaultEdge>) SerializationUtils.deserialize(SerializationUtils.serialize(instanceGraph));

		if (graph == null)
		{
			throw new GraphException("Could not copy a graph");
		}

		for (Monster monster : enemies.values())
		{
			String position = monster.getGraphPosition();

			if (position.equals(enemy.getGraphPosition()))
			{
				continue;
			}

			if (graph.removeVertex(position))
			{
				System.out.println("removed vertex: " + position);
			}
			else
			{
				System.out.println("failed to remove vertex: " + position);
			}
		}

		return graph;
	}

	public HashMap<String, Monster> getEnemiesOnPositions()
	{
		HashMap<String, Monster> enemiesOnPositions = new HashMap<>();
		for (Monster monster : enemies.values())
		{
			enemiesOnPositions.put(monster.getInstancePosition(), monster);
		}

		return enemiesOnPositions;
	}

	public Monster getEnemyOnPosition(String position)
	{
		return getEnemiesOnPositions().get(position);
	}

	public void removeEnemy(Monster enemy)
	{
		enemies.remove(enemy.getIdent());
	}
}
