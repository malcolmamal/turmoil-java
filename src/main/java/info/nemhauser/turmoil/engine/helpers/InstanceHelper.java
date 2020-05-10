package info.nemhauser.turmoil.engine.helpers;

import info.nemhauser.turmoil.engine.domain.Weapon;
import info.nemhauser.turmoil.engine.world.map.graph.Instance;
import org.jgrapht.graph.DefaultUndirectedGraph;
import org.jgrapht.graph.DefaultEdge;
import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.Monster;
import info.nemhauser.turmoil.engine.generators.ItemGenerator;
import info.nemhauser.turmoil.engine.instances.CombatState;


public class InstanceHelper
{
	/**
	 * @deprecated
	 *
	 * @return DefaultUndirectedGraph<String, DefaultEdge>
	 */
	public static DefaultUndirectedGraph<String, DefaultEdge> getInstanceGraph()
	{
		return Instance.getInstanceGraph();
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
