package info.nemhauser.turmoil.engine.instances;

import info.nemhauser.turmoil.engine.domain.Monster;
import info.nemhauser.turmoil.engine.domain.Person;
import info.nemhauser.turmoil.engine.world.map.graph.Instance;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.DefaultUndirectedGraph;

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

	public HashMap<String, Monster> getEnemiesOnPositions()
	{
		HashMap<String, Monster> enemiesOnPositions = new HashMap<>();
		for (Monster monster : enemies.values())
		{
			enemiesOnPositions.put(monster.getInstancePosition(), monster);
		}

		return enemiesOnPositions;
	}
}
