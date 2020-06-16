package info.nemhauser.turmoil.sandbox;

import groovy.util.ConfigObject;
import groovy.util.ConfigSlurper;
import info.nemhauser.turmoil.TurmoilApplication;
import info.nemhauser.turmoil.config.Logger;
import info.nemhauser.turmoil.engine.domain.Armor;
import info.nemhauser.turmoil.engine.domain.Attribute;
import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.Item;
import info.nemhauser.turmoil.engine.enums.ArmorType;
import info.nemhauser.turmoil.engine.enums.ItemRarity;
import info.nemhauser.turmoil.engine.enums.ItemType;
import info.nemhauser.turmoil.engine.generators.ItemAttributeGenerator;
import info.nemhauser.turmoil.engine.generators.ItemGenerator;
import info.nemhauser.turmoil.engine.helpers.*;
import info.nemhauser.turmoil.engine.instances.CombatState;

import info.nemhauser.turmoil.engine.templates.ArmorTemplate;
import org.jgrapht.GraphPath;
import org.jgrapht.alg.shortestpath.DijkstraShortestPath;
import org.jgrapht.alg.shortestpath.KShortestSimplePaths;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.DefaultUndirectedGraph;
import org.jgrapht.graph.GraphWalk;
import org.json.simple.JSONObject;

import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class Sandbox
{
	public static void main(String[] args)
	{
		System.out.println("Sandbox started...");

		Character character = new Character("testElement");
		Item item = ItemGenerator.rollItem(character);

		System.out.println(item.toStringFull());

//		ArmorTemplate template = new ArmorTemplate();
//		template.isLegendary = true;
//		template.armorValue = 135;
//		template.rarity = ItemRarity.LEGENDARY;
//		template.itemCode = "SWORD_OF_HATE";
//
//		Armor armor = new Armor(template);
//		armor.itemName = "Dupcia Anety";
//		armor.itemType = ItemType.ARMOR;
//		armor.armorType = ArmorType.CHEST;
//
//		armor.attributes = ItemAttributeGenerator.rollAttributes(armor).toArray(new Attribute[0]);
//		Logger.log("size: " + armor.attributes.length);
//		for (Attribute atr : armor.attributes)
//		{
//			Logger.log(atr.toString());
//		}
	}
}
