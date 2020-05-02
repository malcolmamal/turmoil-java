package info.nemhauser.turmoil.sandbox;

import groovy.util.ConfigObject;
import groovy.util.ConfigSlurper;
import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.enums.ItemRarity;
import info.nemhauser.turmoil.engine.helpers.InstanceHelper;
import info.nemhauser.turmoil.engine.helpers.ItemTemplatesHelper;
import info.nemhauser.turmoil.engine.helpers.ServerHelper;
import info.nemhauser.turmoil.engine.instances.CombatState;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.DefaultUndirectedGraph;

import java.net.MalformedURLException;
import java.net.URL;

public class Sandbox
{
	public static void main(String[] args)
	{
		System.out.println("yo");

		//ItemTemplatesHelper.parseCommonAccessories();

		//ItemRarity rarity = (ItemRarity) ServerHelper.getEnumValues().getProperRandomItemRarity();
		//System.out.println(rarity.toString());

		//*
		Character character = new Character();

		DefaultUndirectedGraph<String, DefaultEdge> graph = InstanceHelper.getInstanceGraph();
		CombatState cs = InstanceHelper.createCombatState(character);

		 //*/
	}
}
