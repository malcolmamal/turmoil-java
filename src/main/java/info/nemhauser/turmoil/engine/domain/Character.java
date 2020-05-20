package info.nemhauser.turmoil.engine.domain;

import info.nemhauser.turmoil.engine.enums.AccessoryType;
import info.nemhauser.turmoil.engine.enums.ArmorType;
import info.nemhauser.turmoil.engine.enums.ItemSlot;
import info.nemhauser.turmoil.engine.enums.WeaponType;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

public class Character extends Person
{
	String portrait;

	public Integer experience = 0;

	Account owner;

	String name;

	public Weapon slotRightHand;
	Item slotLeftHand; // Weapon or Accessory

	Armor slotHelm;
	Armor slotChest;
	Armor slotBelt;
	Armor slotGloves;
	Armor slotPants;
	Armor slotBoots;
	Armor slotBracers;
	Armor slotPauldrons;

	Accessory slotAmulet;
	Accessory slotRingOne;
	Accessory slotRingTwo;
	Accessory slotRingThree;
	Accessory slotRingFour;

	CharacterState characterState;

	public String toString() {
		return name + "[" + level + "]";
	}

	//TODO: remember: Unfortunately 'character' is a reserved word in MySQL therefore plural form is used as an exception

	public Stash getPrimaryStash()
	{
		Stash stash = new Stash(); //Stash.findByOwner(owner);
		if (stash == null)
		{
			stash = new Stash();
			stash.owner = owner;
			//stash.save();
		}
		return stash;
	}

	public Item[] getEquippedItems()
	{
		ArrayList<Item> equippedItems = new ArrayList<>();
		try
		{
			for (Field field : getClass().getDeclaredFields())
			{
				if (!field.getName().startsWith("slot"))
				{
					continue;
				}

				Item equippedItem = (Item) field.get(this);
				if (equippedItem == null)
				{
					continue;
				}
				equippedItems.add(equippedItem);
			}
		}
		catch (IllegalAccessException e)
		{
			e.printStackTrace();
		}

		return equippedItems.toArray(new Item[0]);
	}

	public Item unequip(String itemIdent)
	{
		Item itemToReturn = null;

		try
		{
			for (Field field : getClass().getDeclaredFields())
			{
				if (!field.getName().startsWith("slot"))
				{
					continue;
				}

				Item equippedItem = (Item) field.get(this);
				if (equippedItem == null)
				{
					continue;
				}

				if (equippedItem.getIdent().equals(itemIdent))
				{
					itemToReturn = equippedItem;
					field.set(this, null);
				}
			}
		}
		catch (IllegalAccessException e)
		{
			e.printStackTrace();
		}

		//		for (Item item : new Item[] {
//			slotRightHand, slotLeftHand,
//			slotHelm, slotChest, slotBelt, slotGloves, slotPants, slotBoots, slotBracers, slotPauldrons,
//			slotAmulet, slotRingOne, slotRingTwo, slotRingThree, slotRingFour
//		})
//		{
//			if (item != null)
//			{
//				itemToReturn = item;
//			}
//		}

		return itemToReturn;
	}

	public Item equip(Item item)
	{
		switch (item.itemType)
		{
			case ARMOR -> {
				return equipArmor((Armor) item);
			}
			case ACCESSORY -> {
				return equipAccessory((Accessory) item);
			}
			case WEAPON -> {
				return equipWeapon((Weapon) item);
			}
		}

		return null;
	}

	public Armor equipArmor(Armor armor)
	{
		Armor replacedItem = null;
		switch (armor.armorType)
		{
			case HELM -> {
				replacedItem = slotHelm;
				slotHelm = armor;
				slotHelm.setItemSlot(ItemSlot.HELM);

				return replacedItem;
			}
			case CHEST -> {
				replacedItem = slotChest;
				slotChest = armor;
				slotChest.setItemSlot(ItemSlot.CHEST);

				return replacedItem;
			}
			case BELT -> {
				replacedItem = slotBelt;
				slotBelt = armor;
				slotBelt.setItemSlot(ItemSlot.BELT);

				return replacedItem;
			}
			case GLOVES -> {
				replacedItem = slotGloves;
				slotGloves = armor;
				slotGloves.setItemSlot(ItemSlot.GLOVES);

				return replacedItem;
			}
			case PANTS -> {
				replacedItem = slotPants;
				slotPants = armor;
				slotPants.setItemSlot(ItemSlot.PANTS);

				return replacedItem;
			}
			case BOOTS -> {
				replacedItem = slotBoots;
				slotBoots = armor;
				slotBoots.setItemSlot(ItemSlot.BOOTS);

				return replacedItem;
			}
			case BRACERS -> {
				replacedItem = slotBracers;
				slotBracers = armor;
				slotBracers.setItemSlot(ItemSlot.BRACERS);

				return replacedItem;
			}
			case PAULDRONS -> {
				replacedItem = slotPauldrons;
				slotPauldrons = armor;
				slotPauldrons.setItemSlot(ItemSlot.PAULDRONS);

				return replacedItem;
			}
		}

		return null;
	}

	public Item equipWeapon(Weapon weapon)
	{
		Item replacedItem = null;
		if (weapon.isOneHanded())
		{
			if (slotRightHand == null)
			{
				slotRightHand = weapon;
				slotRightHand.setItemSlot(ItemSlot.RIGHT_HAND);
			}
			else if (slotLeftHand == null)
			{
				slotLeftHand = weapon;
				slotLeftHand.setItemSlot(ItemSlot.LEFT_HAND);
			}
			else
			{
				replacedItem = slotRightHand;
				slotRightHand = weapon;
				slotRightHand.setItemSlot(ItemSlot.RIGHT_HAND);
			}
		}
		else if (slotLeftHand == null)
		{
			replacedItem = slotRightHand;
			slotRightHand = weapon;
			slotRightHand.setItemSlot(ItemSlot.RIGHT_HAND);
		}
		else if (slotRightHand == null)
		{
			replacedItem = slotLeftHand;
			slotRightHand = weapon;
			slotRightHand.setItemSlot(ItemSlot.RIGHT_HAND);
		}

		return replacedItem;
	}

	public Item equipAccessory(Accessory accessory)
	{
		Item replacedItem = null;
		switch (accessory.accessoryType)
		{
			case AMULET -> {
				replacedItem = slotAmulet;
				slotAmulet = accessory;
				slotAmulet.setItemSlot(ItemSlot.AMULET);

				return replacedItem;
			}
			case RING -> {
				if (slotRingOne == null)
				{
					slotRingOne = accessory;
					slotRingOne.setItemSlot(ItemSlot.RING_ONE);
				}
				else if (slotRingTwo == null)
				{
					slotRingTwo = accessory;
					slotRingTwo.setItemSlot(ItemSlot.RING_TWO);
				}
				else if (slotRingThree == null)
				{
					slotRingThree = accessory;
					slotRingThree.setItemSlot(ItemSlot.RING_THREE);
				}
				else
				{
					replacedItem = slotRingFour;
					slotRingFour = accessory;
					slotRingFour.setItemSlot(ItemSlot.RING_FOUR);
				}

				return replacedItem;
			}
			case MOJO, SOURCE, SHIELD -> {
				if (!slotRightHand.isOneHanded())
				{
					replacedItem = slotRightHand;
				}
				else
				{
					replacedItem = slotLeftHand;
				}
				slotLeftHand = accessory;
				slotLeftHand.setItemSlot(ItemSlot.LEFT_HAND);

				return replacedItem;
			}
			case QUIVER -> {
				if (slotRightHand == null || slotRightHand.weaponType == WeaponType.BOW || slotRightHand.weaponType == WeaponType.CROSSBOW)
				{
					replacedItem = slotRightHand;
					slotLeftHand = accessory;
					slotLeftHand.setItemSlot(ItemSlot.LEFT_HAND);
				}

				return replacedItem;
			}
		}

		return null;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}
}
