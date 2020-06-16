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
	private static int monsterPosition = 0;

	public static CombatState createCombatState()
	{
		return new CombatState();
	}

	/**
	 * @deprecated handle it more proper, no idents and such
	 */
	@Deprecated
	public static CombatState getCombatState(String ident)
	{
		CombatState combatState = ServerHelper.getCombatState(ident);
		if (combatState == null)
		{
			combatState = createCombatState();
			ServerHelper.getCombatStates().put(ident, combatState);
		}

		return combatState;
	}

	public static Monster createMonster(Character character)
	{
		//TODO: make sure nothing resides on the position (no enemy or friendly units)

		monsterPosition++;
		if (monsterPosition > 6)
		{
			monsterPosition = 1;
		}

		Monster monster = new Monster(monsterPosition);
		monster.level = character.level;
		monster.health = 50;
		monster.currentHealth = monster.health;

		monster.slotRightHand = (Weapon)ItemGenerator.rollMonsterWeapon(monster);
		monster.lootBag.put("loot", ItemGenerator.rollItem(character));

		return monster;
	}
}
