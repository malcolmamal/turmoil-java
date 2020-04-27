package info.nemhauser.turmoil.engine.domain;

import info.nemhauser.turmoil.engine.enums.ItemRarity;
import info.nemhauser.turmoil.engine.enums.ItemSlot;
import info.nemhauser.turmoil.engine.enums.ItemType;

public class Item
{
	String itemCode;
	public String itemName;
	public Integer level;

	Integer durability = 1;
	Integer priceValue = 1;

	public ItemType itemType;
	public ItemRarity rarity = ItemRarity.COMMON;

	Boolean isCrafted = false;
	Boolean isEquipped = false;
	Boolean isStashed = false;

	Stash stash;

	Character craftedBy;
	Account owner;

	ItemSlot itemSlot;

	public Attribute[] attributes;

	public String toString() {
		return itemName;
	}

	public String getFileCode()
	{
		return itemCode.toLowerCase();
	}

	public String getRarityClass()
	{
		switch (rarity)
		{
			case COMMON:
				return "white";
			case MAGIC:
				return "blue";
			case RARE:
				return "yellow";
			case LEGENDARY:
				return "orange";
			case SET:
				return "green";
			case UNIQUE:
				return "red";
			case EPIC:
				return "purple";
		}

		return "";
	}

	public String[] getItemProperties()
	{
		return new String[]{};
	}

	public void putToStash(Stash newStash)
	{
		if (newStash != null)
		{
			stash = newStash;
			isStashed = true;
		}
	}

	public String getImagePath()
	{
		return "images/items/";
	}

	public String getImageFile()
	{
		return getFileCode() + ".png";
	}

	public String toStringFull()
	{
		String value =	"itemCode: "	+ itemCode		+ ", " +
					"itemName: "	+ itemName		+ ", " +
					"level: "		+ level			+ ", " +
					"rarity: "		+ rarity		+ ", " +
					"isCrafted: "	+ isCrafted		+ ", " +
					"isEquipped: "	+ isEquipped	+ ", " +
					"isStashed: "	+ isStashed		+ ", " +
					"stash: "		+ stash			+ ", " +
					"craftedBy: "	+ craftedBy		+ ", " +
					"owner: "		+ owner			+ ", " +
					"itemSlot: "	+ itemSlot;

		value += ", [attributes: ";

		//TODO: ITERATOR
		/*
		attributes.each {
			value += it.toStringFull() + " ";
		}
		*/
		value += "]";

		return value;
	}
}
