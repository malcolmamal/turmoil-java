package info.nemhauser.turmoil.engine.domain;

import info.nemhauser.turmoil.engine.enums.DamageMagnitude;
import info.nemhauser.turmoil.engine.enums.DamageType;
import info.nemhauser.turmoil.utils.Random;

import java.util.HashMap;

public class Monster extends Person
{
	private static int identNumber = 1;

	public Weapon slotRightHand;
	public HashMap<String, Item> lootBag = new HashMap<>();

	public Monster(int position)
	{
		super("testEnemy" + identNumber++);

		instancePosition = "polygon-8-" + position;

		characterState = new PersonState(100, 100, 10, 20, 5, 50);
	}

	public String toString() {
		return name;
	}

	@Override
	public DamageType getDamageType()
	{
		DamageType damageType = Random.randomEnum(DamageType.class);

		if (damageType == DamageType.HEALING)
		{
			damageType = DamageType.PHYSICAL;
		}

		return damageType;
	}

	@Override
	public Boolean isCharacter()
	{
		return false;
	}

	public DamageMagnitude getDamageMagnitude()
	{
		return DamageMagnitude.NORMAL;
	}
}
