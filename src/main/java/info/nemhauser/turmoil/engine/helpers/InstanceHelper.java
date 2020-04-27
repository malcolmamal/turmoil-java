package info.nemhauser.turmoil.engine.helpers;

import info.nemhauser.turmoil.engine.domain.Weapon;
import org.jgrapht.graph.DefaultUndirectedGraph;
import org.jgrapht.graph.DefaultEdge;
import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.Monster;
import info.nemhauser.turmoil.engine.domain.Person;
import info.nemhauser.turmoil.engine.generators.ItemGenerator;
import info.nemhauser.turmoil.engine.instances.CombatState;


class InstanceHelper
{
	public static DefaultUndirectedGraph<String, DefaultEdge> getInstanceGraph()
	{
		DefaultUndirectedGraph<String, DefaultEdge> graph = new DefaultUndirectedGraph<String, DefaultEdge>(DefaultEdge.class);

		int maxWidth = 8;
		int maxHeight = 6;

		for (int i = 1; i <= maxWidth; i++)
		{
			for (int j = 1; j <= maxHeight; j++)
			{
				String vertex = new String("${i}-${j}");
				graph.addVertex(vertex);

				if (j > 1)
				{
					String vertexAbove = new String("${i}-${j-1}");
					graph.addEdge(vertexAbove, vertex);

					if (i > 1 && i % 2 != 0)
					{
						String vertexDiagonalRight = new String("${i - 1}-${j - 1}");
						graph.addEdge(vertexDiagonalRight, vertex);
					}
				}

				if (i > 1)
				{
					String vertexBeside = new String("${i-1}-${j}");
					graph.addEdge(vertexBeside, vertex);

					if (i % 2 == 0 && j < maxHeight)
					{
						String vertexDiagonalLeft = new String("${i - 1}-${j + 1}");
						graph.addEdge(vertexDiagonalLeft, vertex);
					}
				}
			}
		}

		return graph;
	}

	public static CombatState createCombatState(Character character)
	{
		CombatState combatState = new CombatState();
		combatState.friend = character;
		combatState.friend.currentHealth = combatState.friend.health;
		combatState.friend.instancePosition = "polygon-1-4";
		combatState.enemy = InstanceHelper.createMonster(character);

		return combatState;
	}

	public static CombatState getCombatState(Character character)
	{
		CombatState combatState = ServerHelper.getCombatState(character);
		if (combatState == null)
		{
			combatState = createCombatState(character);
		}
		return combatState;
	}

	public static Monster createMonster(Character character)
	{
		Monster monster = new Monster();
		monster.level = character.level;
		monster.currentHealth = 100;
		monster.instancePosition = "polygon-8-3";

		monster.slotRightHand = (Weapon)ItemGenerator.rollMonsterWeapon(monster);
		monster.lootBag.put("loot", ItemGenerator.rollItem(character));

		return monster;
	}
}
