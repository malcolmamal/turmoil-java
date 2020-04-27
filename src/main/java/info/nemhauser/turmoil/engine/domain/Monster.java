package info.nemhauser.turmoil.engine.domain;

import java.util.HashMap;

public class Monster extends Person
{
	public Weapon slotRightHand;
	public HashMap<String, Item> lootBag = new HashMap<String, Item>();

	public String toString() {
		return name;
	}
}
