package info.nemhauser.turmoil.engine.helpers;

import com.rabbitmq.client.AMQP;
import info.nemhauser.turmoil.engine.domain.Accessory;
import info.nemhauser.turmoil.engine.domain.Armor;
import info.nemhauser.turmoil.engine.domain.Attribute;
import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.CharacterState;
import info.nemhauser.turmoil.engine.domain.Item;
import info.nemhauser.turmoil.engine.domain.Weapon;
import info.nemhauser.turmoil.engine.enums.AttributeType;
import info.nemhauser.turmoil.engine.enums.DamageType;
import info.nemhauser.turmoil.engine.enums.ItemSlot;
import info.nemhauser.turmoil.engine.enums.ItemType;

import java.util.ArrayList;

public class CharacterStateHelper
{
	/**
	 * @deprecated
	 */
	public static CharacterState getCharacterState(Character character)
	{
		CharacterState characterState = ServerHelper.getCharacterState(character);
		if (characterState == null)
		{
			characterState = new CharacterState();
		}
		return characterState;
	}

	public static void setCharacterState(Character character, CharacterState characterState)
	{
		ServerHelper.setCharacterState(character, characterState);
	}

	public static void computeValuesForCharacterState(Character character)
	{
		computeValuesForCharacterState(getCharacterState(character), character);
	}

	public static void computeValuesForCharacterState(CharacterState characterState, Character character)
	{
		characterState.level = character.level;

		characterState.experience = character.experience;
		characterState.requiredExperience = 1000; // ExperienceHelper.getRequiredExperience(character.level + 1); TODO: reimplement

		characterState.applyResistAll();
		characterState.applyPercentageDamage();
		characterState.updateHealthAndMana();
		characterState.capValues();
		characterState.computeAverageDamage();
	}

	/**
	 * Used during character selection action
	 * Prepares the character state and fills it with items and computes values based on them
	 *
	 * @param character
	 * @param items
	 * @return
	 */
	public static void updateCharacterState(Character character, ArrayList<Item> items)
	{
		CharacterState characterState = getCharacterState(character);
		characterState.resetValues();

//		items.each {
//			updateCharacterStateWithItem(characterState, it, it.itemSlot);
//		}

		computeValuesForCharacterState(characterState, character);
		setCharacterState(character, characterState);
	}

	/**
	 * Used when an item is changed for a character
	 *
	 * @param character
	 * @param item
	 * @param itemSlot
	 * @return
	 */
	public static void updateCharacterStateForItem(Character character, Item item, ItemSlot itemSlot)
	{
		CharacterState characterState = ServerHelper.getCharacterState(character);
		characterState.putItem(itemSlot.toString(), item);
		characterState.resetValues();

//		characterState.items.each {
//			if (it.getValue() != null)
//			{
//				updateCharacterStateWithItem(characterState, it.getValue(), it.getValue().itemSlot);
//			}
//		}

		computeValuesForCharacterState(characterState, character);
		setCharacterState(character, characterState);
	}

	public static void updateCharacterStateWithItem(CharacterState characterState, Item item, ItemSlot itemSlot)
	{
		//TODO: i'm sorry but it has to be done that every time an item changes ->
		// we either recompute all or remove first the previous item and add stats from the new one
		characterState.putItem(itemSlot.toString(), item);
		switch (item.itemType)
		{
			case ACCESSORY:
				updateCharacterStateWithAccessory(characterState, (Accessory)item);
				break;
			case ARMOR:
				updateCharacterStateWithArmor(characterState, (Armor)item);
				break;
			case WEAPON:
				updateCharacterStateWithWeapon(characterState, (Weapon)item);
				break;
		}

		if (item.attributes != null && item.attributes.length > 0)
		{
			for (Attribute attribute : item.attributes)
			{
				updateCharacterStateWithAttribute(characterState, attribute);
			}
		}
	}

	public static void updateCharacterStateWithAccessory(CharacterState characterState, Accessory accessory)
	{

	}

	public static void updateCharacterStateWithArmor(CharacterState characterState, Armor armor)
	{
		characterState.armor += armor.armorValue;
	}

	public static void updateCharacterStateWithWeapon(CharacterState characterState, Weapon weapon)
	{
		switch (weapon.damageType)
		{
			case PHYSICAL:
				characterState.damageMinPhysical += weapon.minDamage;
				characterState.damageMaxPhysical += weapon.maxDamage;
				break;
			case FIRE:
				characterState.damageMinFire += weapon.minDamage;
				characterState.damageMaxFire += weapon.maxDamage;
				break;
			case COLD:
				characterState.damageMinCold += weapon.minDamage;
				characterState.damageMaxCold += weapon.maxDamage;
				break;
			case LIGHTNING:
				characterState.damageMinLightning += weapon.minDamage;
				characterState.damageMaxLightning += weapon.maxDamage;
				break;
			case POISON:
				characterState.damageMinPoison += weapon.minDamage;
				characterState.damageMaxPoison += weapon.maxDamage;
				break;
			case ARCANE:
				characterState.damageMinArcane += weapon.minDamage;
				characterState.damageMaxArcane += weapon.maxDamage;
				break;
		}
	}

	public static void updateCharacterStateWithAttribute(CharacterState characterState, Attribute attribute)
	{
		switch (attribute.type)
		{
			case PRIMARY_STRENGTH:
				characterState.statStrength += attribute.primaryValue;
				break;
			case PRIMARY_DEXTERITY:
				characterState.statDexterity += attribute.primaryValue;
				break;
			case PRIMARY_INTELLIGENCE:
				characterState.statIntelligence += attribute.primaryValue;
				break;
			case PRIMARY_VITALITY:
				characterState.statVitality += attribute.primaryValue;
				break;
			case PRIMARY_STRENGTH_AND_VITALITY:
				characterState.statStrength += attribute.primaryValue;
				characterState.statVitality += attribute.secondaryValue;
				break;
			case PRIMARY_DEXTERITY_AND_VITALITY:
				characterState.statDexterity += attribute.primaryValue;
				characterState.statVitality += attribute.secondaryValue;
				break;
			case PRIMARY_INTELLIGENCE_AND_VITALITY:
				characterState.statIntelligence += attribute.primaryValue;
				characterState.statVitality += attribute.secondaryValue;
				break;
			case CRITICAL_CHANCE:
				characterState.critChance += attribute.primaryValue;
				break;
			case CRITICAL_DAMAGE:
				characterState.critDamage += attribute.primaryValue;
				break;
			case DAMAGE_VALUE:
				characterState.damageMin += attribute.primaryValue;
				characterState.damageMax += attribute.secondaryValue;
				break;
			case DAMAGE_PHYSICAL_VALUE:
				characterState.damageMinPhysical += attribute.primaryValue;
				characterState.damageMaxPhysical += attribute.secondaryValue;
				break;
			case DAMAGE_FIRE_VALUE:
				characterState.damageMinFire += attribute.primaryValue;
				characterState.damageMaxFire += attribute.secondaryValue;
				break;
			case DAMAGE_COLD_VALUE:
				characterState.damageMinCold += attribute.primaryValue;
				characterState.damageMaxCold += attribute.secondaryValue;
				break;
			case DAMAGE_LIGHTNING_VALUE:
				characterState.damageMinLightning += attribute.primaryValue;
				characterState.damageMaxLightning += attribute.secondaryValue;
				break;
			case DAMAGE_POISON_VALUE:
				characterState.damageMinPoison += attribute.primaryValue;
				characterState.damageMaxPoison += attribute.secondaryValue;
				break;
			case DAMAGE_ARCANE_VALUE:
				characterState.damageMinArcane += attribute.primaryValue;
				characterState.damageMaxArcane += attribute.secondaryValue;
				break;
			case DAMAGE_PERCENTAGE:
				characterState.damagePercentage += attribute.primaryValue;
				break;
			case DAMAGE_PHYSICAL_PERCENTAGE:
				characterState.damagePercentagePhysical += attribute.primaryValue;
				break;
			case DAMAGE_FIRE_PERCENTAGE:
				characterState.damagePercentageFire += attribute.primaryValue;
				break;
			case DAMAGE_COLD_PERCENTAGE:
				characterState.damagePercentageCold += attribute.primaryValue;
				break;
			case DAMAGE_LIGHTNING_PERCENTAGE:
				characterState.damagePercentageLightning += attribute.primaryValue;
				break;
			case DAMAGE_POISON_PERCENTAGE:
				characterState.damagePercentagePoison += attribute.primaryValue;
				break;
			case DAMAGE_ARCANE_PERCENTAGE:
				characterState.damagePercentageArcane += attribute.primaryValue;
				break;
			case RESIST_FIRE:
				characterState.resistFire += attribute.primaryValue;
				break;
			case RESIST_COLD:
				characterState.resistCold += attribute.primaryValue;
				break;
			case RESIST_LIGHTNING:
				characterState.resistLightning += attribute.primaryValue;
				break;
			case RESIST_POISON:
				characterState.resistPoison += attribute.primaryValue;
				break;
			case RESIST_ARCANE:
				characterState.resistArcane += attribute.primaryValue;
				break;
			case RESIST_BLEED:
				characterState.resistBleed += attribute.primaryValue;
				break;
			case RESIST_PIERCING:
				characterState.resistPiercing += attribute.primaryValue;
				break;
			case RESIST_ALL:
				characterState.resistAll += attribute.primaryValue;
				break;
			case ARMOR:
				characterState.armor += attribute.primaryValue;
				break;
			case EVASION_BLOCK:
				characterState.evasionBlock += attribute.primaryValue;
				break;
			case EVASION_DODGE:
				characterState.evasionDodge += attribute.primaryValue;
				break;
			case EVASION_PARRY:
				characterState.evasionParry += attribute.primaryValue;
				break;
			case HEALTH_PERCENTAGE:
				characterState.healthPercentage += attribute.primaryValue;
				break;
			case MANA_PERCENTAGE:
				characterState.manaPercentage += attribute.primaryValue;
				break;
			case LIFE_HIT:
				characterState.lifeHit += attribute.primaryValue;
				break;
			case LIFE_LEECH:
				characterState.lifeLeech += attribute.primaryValue;
				break;
			case LIFE_REGEN:
				characterState.lifeRegen += attribute.primaryValue;
				break;
			case MANA_HIT:
				characterState.manaHit += attribute.primaryValue;
				break;
			case MANA_LEECH:
				characterState.manaLeech += attribute.primaryValue;
				break;
			case MANA_REGEN:
				characterState.manaRegen += attribute.primaryValue;
				break;
			case FIND_QUANTITY:
				characterState.findQuantity += attribute.primaryValue;
				break;
			case FIND_QUALITY:
				characterState.findQuality += attribute.primaryValue;
				break;
			case FIND_GOLD:
				characterState.findGold += attribute.primaryValue;
				break;
			case REDUCED_DAMAGE_MELEE:
				characterState.reducedDamageMelee += attribute.primaryValue;
				break;
			case REDUCED_DAMAGE_RANGE:
				characterState.reducedDamageRanged += attribute.primaryValue;
				break;
			case CHANCE_TO_STUN:
				characterState.chanceToStun += attribute.primaryValue;
				break;
			case CHANCE_TO_SAP:
				characterState.chanceToSap += attribute.primaryValue;
				break;
			case CHANCE_TO_CONFUSE:
				characterState.chanceToConfuse += attribute.primaryValue;
				break;
			case CHANCE_TO_BURN:
				characterState.chanceToBurn += attribute.primaryValue;
				break;
			case CHANCE_TO_CHILL:
				characterState.chanceToChill += attribute.primaryValue;
				break;
			case CHANCE_TO_SHOCK:
				characterState.chanceToShock += attribute.primaryValue;
				break;
			case CHANCE_TO_DEVASTATE:
				characterState.chanceToDevastate += attribute.primaryValue;
				break;
			case MOVEMENT:
				characterState.movement += attribute.primaryValue;
				break;
		/*
			// ACCURACY,

			//REDUCED_CONTROL_DURATION,
			//REDUCED_COOLDOWN,
			//REDUCED_MANA_COST,

			//EFFECT_CULL,
			//EFFECT_BLEED, // to stack or not to stack?

			//REFLECT_DAMAGE,
		*/
		}
	}
}
