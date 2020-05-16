package info.nemhauser.turmoil.engine.domain;

import info.nemhauser.turmoil.engine.enums.ItemSlot;
import info.nemhauser.turmoil.engine.enums.WeaponType;

public class Character extends Person
{
	String portrait;

	public Integer experience = 0;

	Account owner;

	String name;

	Weapon slotRightHand;
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

	/**
	 * TODO split into equipAccessory / equipArmor / equipWeapon
	 * TODO for rings and one handed weapons there should be a parameter to wear in left/rightHand and one/twoRing
	 * TODO later: move unequipped item into some inventory/stash
	 */
	public Item equip(Item item, boolean saveItem)
	{
		Item replacedItem = null;
		switch (item.itemType)
		{
			case ARMOR:
				switch (((Armor)item).armorType)
				{
					case HELM:
						if (slotHelm != null)
						{
							replacedItem = slotHelm;
						}
						slotHelm = (Armor) item;
						item.itemSlot = ItemSlot.HELM;
						break;
					case CHEST:
						if (slotChest != null)
						{
							replacedItem = slotChest;
						}
						slotChest = (Armor) item;
						item.itemSlot = ItemSlot.CHEST;
						break;
					case BELT:
						if (slotBelt != null)
						{
							replacedItem = slotBelt;
						}
						slotBelt = (Armor) item;
						item.itemSlot = ItemSlot.BELT;
						break;
					case GLOVES:
						if (slotGloves != null)
						{
							replacedItem = slotGloves;
						}
						slotGloves = (Armor) item;
						item.itemSlot = ItemSlot.GLOVES;
						break;
					case PANTS:
						if (slotPants != null)
						{
							replacedItem = slotPants;
						}
						slotPants = (Armor) item;
						item.itemSlot = ItemSlot.PANTS;
						break;
					case BOOTS:
						if (slotBoots != null)
						{
							replacedItem = slotBoots;
						}
						slotBoots = (Armor) item;
						item.itemSlot = ItemSlot.BOOTS;
						break;
					case BRACERS:
						if (slotBracers != null)
						{
							replacedItem = slotBracers;
						}
						slotBracers = (Armor) item;
						item.itemSlot = ItemSlot.BRACERS;
						break;
					case PAULDRONS:
						if (slotPauldrons != null)
						{
							replacedItem = slotPauldrons;
						}
						slotPauldrons = (Armor) item;
						item.itemSlot = ItemSlot.PAULDRONS;
						break;
				}
				break;
			case ACCESSORY:
				switch (((Accessory)item).accessoryType)
				{
					case AMULET:
						if (slotAmulet != null)
						{
							replacedItem = slotAmulet;
						}
						slotAmulet = (Accessory) item;
						item.itemSlot = ItemSlot.AMULET;
						break;
					case RING:
						if (slotRingOne == null)
						{
							slotRingOne = (Accessory) item;
							item.itemSlot = ItemSlot.RING_ONE;
						}
						else if (slotRingTwo == null)
						{
							slotRingTwo = (Accessory) item;
							item.itemSlot = ItemSlot.RING_TWO;
						}
						else if (slotRingThree == null)
						{
							slotRingThree = (Accessory) item;
							item.itemSlot = ItemSlot.RING_THREE;
						}
						else
						{
							slotRingFour = (Accessory) item;
							item.itemSlot = ItemSlot.RING_FOUR;
						}
						break;
					case MOJO:
					case SOURCE:
					case SHIELD:
						if (slotLeftHand == null && (slotRightHand == null || slotRightHand.isOneHanded()))
						{
							slotLeftHand = item;
							item.itemSlot = ItemSlot.LEFT_HAND;
						}
						else
						{
							return null;
						}
						break;
					case QUIVER:
						if (slotLeftHand == null
							&& (slotRightHand == null || slotRightHand.weaponType == WeaponType.BOW || slotRightHand.weaponType == WeaponType.CROSSBOW))
						{
							slotLeftHand = item;
							item.itemSlot = ItemSlot.LEFT_HAND;
						}
						else
						{
							return null;
						}
						break;
				}
				break;
			case WEAPON:
				if (((Weapon)item).isOneHanded())
				{
					if (slotRightHand == null)
					{
						slotRightHand = (Weapon) item;
						item.itemSlot = ItemSlot.RIGHT_HAND;
					}
					else if (slotLeftHand == null)
					{
						slotLeftHand = item;
						item.itemSlot = ItemSlot.LEFT_HAND;
					}
					else
					{
						replacedItem = slotRightHand;
						slotRightHand = (Weapon) item;
						item.itemSlot = ItemSlot.RIGHT_HAND;
					}
				}
				else if (slotLeftHand == null)
				{
					if (slotRightHand != null)
					{
						replacedItem = slotRightHand;
					}
					slotRightHand = (Weapon) item;
					item.itemSlot = ItemSlot.RIGHT_HAND;
				}
				else if (slotRightHand == null)
				{
					if (slotLeftHand != null)
					{
						replacedItem = slotLeftHand;
					}
					slotRightHand = (Weapon) item;
					item.itemSlot = ItemSlot.RIGHT_HAND;
				}
				else
				{
					return null;
				}
				break;
		}

		item.isEquipped = true;
		item.isStashed = false;
		item.stash = null;
		if (saveItem)
		{
			//item.save();
		}
		return replacedItem;
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
