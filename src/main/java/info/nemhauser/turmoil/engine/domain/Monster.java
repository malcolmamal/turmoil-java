package info.nemhauser.turmoil.engine.domain;

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
	}

	public String toString() {
		return name;
	}
}
