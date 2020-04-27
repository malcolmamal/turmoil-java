package info.nemhauser.turmoil.engine.helpers;

import groovy.util.ConfigObject;
import groovy.util.ConfigSlurper;
import info.nemhauser.turmoil.engine.templates.AccessoryTemplate;
import info.nemhauser.turmoil.engine.templates.ArmorTemplate;
import info.nemhauser.turmoil.engine.templates.WeaponTemplate;

import java.io.InputStream;

public class ItemTemplatesHelper
{
	public static AccessoryTemplate[] parseCommonAccessories()
	{
		AccessoryTemplate[] accessoryTemplates = new AccessoryTemplate[]{};
		ConfigObject configObject = new ConfigSlurper().parse("properties/items-accessories.groovy");

//		configObject.accessories.each() {
//			def values = it.getValue();
//
//			AccessoryTemplate template = new AccessoryTemplate();
//			template.itemCode = it.getKey();
//			template.accessoryType = values.accessory_type;
//
//			accessoryTemplates.add(template);
//		}

		//log.info "Common Accessory Templates loaded (" + accessoryTemplates.size() + ")";
		return accessoryTemplates;
	}

	public static AccessoryTemplate[] parseLegendaryAccessories()
	{
		AccessoryTemplate[] accessoryTemplates = new AccessoryTemplate[]{};
		ConfigObject configObject = new ConfigSlurper().parse("properties/items-accessories.groovy");

//		configObject.legendaries.each() {
//			def values = it.getValue();
//
//			AccessoryTemplate template = new AccessoryTemplate();
//			template.itemCode = it.getKey();
//			template.accessoryType = values.accessory_type;
//			template.isLegendary = true;
//
//			accessoryTemplates.add(template);
//		}

		//log.info "Legendary Accessory Templates loaded (" + accessoryTemplates.size() + ")";
		return accessoryTemplates;
	}

	public static ArmorTemplate[] parseCommonArmors()
	{
		ArmorTemplate[] armorTemplates = new ArmorTemplate[]{};
		ConfigObject configObject = new ConfigSlurper().parse("properties/items-armors.groovy");

//		configObject.armors.each() {
//			def values = it.getValue();
//
//			ArmorTemplate template = new ArmorTemplate();
//			template.itemCode = it.getKey();
//			template.armorType = values.armor_type;
//
//			armorTemplates.add(template);
//		}

		//log.info "Common Armor Templates loaded (" + armorTemplates.size() + ")";
		return armorTemplates;
	}

	public static ArmorTemplate[] parseLegendaryArmors()
	{
		ArmorTemplate[] armorTemplates = new ArmorTemplate[]{};
		ConfigObject configObject = new ConfigSlurper().parse("properties/items-armors.groovy");

//		configObject.legendaries.each() {
//			def values = it.getValue();
//
//			ArmorTemplate template = new ArmorTemplate();
//			template.itemCode = it.getKey();
//			template.armorValue = values.armor_value;
//			template.armorType = values.armor_type;
//			template.isLegendary = true;
//
//			armorTemplates.add(template);
//		}

		//log.info "Legendary Armor Templates loaded (" + armorTemplates.size() + ")";
		return armorTemplates;
	}

	public static WeaponTemplate[] parseCommonWeapons()
	{
		WeaponTemplate[] weaponTemplates = new WeaponTemplate[]{};
		ConfigObject configObject = new ConfigSlurper().parse("properties/items-weapons.groovy");

//		configObject.weapons.each() {
//			def values = it.getValue();
//
//			WeaponTemplate template = new WeaponTemplate();
//			template.itemCode = it.getKey();
//			template.weaponType = values.weapon_type;
//
//			weaponTemplates.add(template);
//		}

		//log.info "Common Weapon Templates loaded (" + weaponTemplates.size() + ")"
		return weaponTemplates;
	}

	public static WeaponTemplate[] parseLegendaryWeapons()
	{
		WeaponTemplate[] weaponTemplates = new WeaponTemplate[]{};
		ConfigObject configObject = new ConfigSlurper().parse("properties/items-weapons.groovy");

//		configObject.legendaries.each() {
//			def values = it.getValue();
//
//			WeaponTemplate template = new WeaponTemplate();
//			template.itemCode = it.getKey();
//			template.minDamage = values.min_damage;
//			template.maxDamage = values.max_damage;
//			template.damageType = values.damage_type;
//			template.weaponType = values.weapon_type;
//			template.isLegendary = true;
//
//			weaponTemplates.add(template);
//		}

		//log.info "Legendary Weapon Templates loaded (" + weaponTemplates.size() + ")";
		return weaponTemplates;
	}

	public static String[] parseItemNames(Boolean isPrefix)
	{
		String[] tokens = new String[]{};
		String fileNameType = (isPrefix) ? "prefix" : "suffix";
//		InputStream file = ItemTemplatesHelper.getContext().getResource("properties/names-" + fileNameType + ".groovy").inputStream;
//
//		file.eachLine("utf8") {
//			tokens << it.trim();
//		}

		//log.info "Name tokens '" + fileNameType + "' loaded (" + tokens.size() + ")";

		return tokens;
	}

	public static void getContext()
	{
		//return Holders.getGrailsApplication().mainContext;
	}
}
