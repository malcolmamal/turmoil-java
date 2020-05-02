package info.nemhauser.turmoil.engine.instances;

import info.nemhauser.turmoil.engine.enums.AccessoryType;
import info.nemhauser.turmoil.engine.enums.ArmorType;
import info.nemhauser.turmoil.engine.enums.AttributeType;
import info.nemhauser.turmoil.engine.enums.ItemRarity;
import info.nemhauser.turmoil.engine.enums.ItemType;
import info.nemhauser.turmoil.engine.enums.WeaponType;

import java.util.ArrayList;
import java.util.Random;

public class EnumValues
{
	ItemType[] itemTypes;
	ArmorType[] armorTypes;
	WeaponType[] weaponTypes;
	AccessoryType[] accessoryTypes;
	ItemRarity[] itemRarities;
	AttributeType[] attributeTypes;

	public void init()
	{
		itemTypes = ItemType.values();
		armorTypes = ArmorType.values();
		weaponTypes = WeaponType.values();
		accessoryTypes = AccessoryType.values();
		itemRarities = ItemRarity.values();
		attributeTypes = AttributeType.values();
	}

	public Enum getRandomItemType()
	{
		return getRandomValue(itemTypes);
	}

	public Enum getRandomWeaponType()
	{
		return getRandomValue(weaponTypes);
	}

	public Enum getRandomArmorType()
	{
		return getRandomValue(armorTypes);
	}

	public Enum getRandomAccessoryType()
	{
		return getRandomValue(accessoryTypes);
	}

	public Enum getRandomItemRarity()
	{
		return getRandomValue(itemRarities);
	}

	public Enum getRandomAttributeType()
	{
		//TODO:
		return getRandomValue(attributeTypes);
		//return AttributeType.LIFE_HIT;
	}

	public Enum getProperRandomItemRarity()
	{
		/*
		35% COMMON
		30% MAGIC
		20% RARE
		5% LEGENDARY
		5% SET
		3% UNIQUE
		2% EPIC
		*/

		switch (new Random().nextInt(100) + 1)
		{
			case 1: case 2:
				return ItemRarity.EPIC;
			case 3: case 4: case 5:
				return ItemRarity.UNIQUE;
			case 6: case 7: case 8: case 9: case 10:
				return ItemRarity.SET;
			case 11: case 12: case 13: case 14: case 15:
				return ItemRarity.LEGENDARY;

				//TODO: some different idea for the switch
				/*
			case 16..35:
				return ItemRarity.RARE;
			case 36..65:
				return ItemRarity.MAGIC;
				 */

			default:
				return ItemRarity.COMMON;
		}
	}

	@SuppressWarnings("rawtypes")
	public static Enum getRandomValue(Enum[] values)
	{
		return values[new Random().nextInt(values.length)];
	}

	public static Enum getRandomValue(ArrayList<Enum> values)
	{
		return values.get(new Random().nextInt(values.size()));
	}
}
