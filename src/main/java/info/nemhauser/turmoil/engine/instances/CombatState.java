package info.nemhauser.turmoil.engine.instances;

import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.Monster;
import info.nemhauser.turmoil.engine.domain.Person;
import info.nemhauser.turmoil.engine.exceptions.GraphException;
import info.nemhauser.turmoil.engine.world.map.graph.Instance;
import info.nemhauser.turmoil.engine.world.map.graph.Neighbourhood;
import info.nemhauser.turmoil.engine.world.map.graph.Utils;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.DefaultUndirectedGraph;

import java.util.*;

public class CombatState
{
	private final DefaultUndirectedGraph<String, DefaultEdge> instanceGraph;

	private final LinkedHashMap<String, Monster> enemies = new LinkedHashMap<>();
	private final LinkedHashMap<String, Character> friends = new LinkedHashMap<>();
	private Character activeUnit;

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

	public LinkedHashMap<String, Character> getFriends()
	{
		return friends;
	}

	public Monster getEnemy(String key)
	{
		return enemies.get(key);
	}

	public Character getFriend(String key)
	{
		return friends.get(key);
	}

	public void addEnemy(Monster monster)
	{
		enemies.put(monster.getIdent(), monster);
	}

	public void addFriend(Character friend)
	{
		friends.put(friend.getIdent(), friend);
	}

	public DefaultUndirectedGraph<String, DefaultEdge> getInstanceGraph()
	{
		return instanceGraph;
	}

	public DefaultUndirectedGraph<String, DefaultEdge> getInstanceGraphForEnemy(Person enemy) throws GraphException
	{
		DefaultUndirectedGraph<String, DefaultEdge> graph = Utils.cloneGraph(instanceGraph);

		for (Monster monster : enemies.values())
		{
			String position = monster.getInstancePosition();

			if (position.equals(enemy.getInstancePosition()))
			{
				continue;
			}

			if (!graph.removeVertex(position))
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

	public Set<String> getPolygonsInRange(Person person)
	{
		return Neighbourhood.getVerticesInRange(instanceGraph, person.getInstancePosition(), person.getMovementPoints());
	}

	public Character getActiveUnit()
	{
		return activeUnit;
	}

	public void setActiveUnit(Character activeUnit)
	{
		this.activeUnit = activeUnit;
	}
}
