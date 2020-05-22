package info.nemhauser.turmoil;

import info.nemhauser.turmoil.config.Logger;
import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.CharacterState;
import info.nemhauser.turmoil.engine.domain.Item;
import info.nemhauser.turmoil.engine.domain.Weapon;
import info.nemhauser.turmoil.engine.enums.ItemRarity;
import info.nemhauser.turmoil.engine.enums.ItemSlot;
import info.nemhauser.turmoil.engine.enums.ItemType;
import info.nemhauser.turmoil.engine.exceptions.CouldNotEquipException;
import info.nemhauser.turmoil.engine.generators.ItemGenerator;
import info.nemhauser.turmoil.engine.helpers.CharacterStateHelper;
import info.nemhauser.turmoil.engine.helpers.InstanceHelper;
import info.nemhauser.turmoil.engine.instances.CombatState;
import info.nemhauser.turmoil.engine.instances.ServerState;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TurmoilApplication
{
	private static CombatState combatState;
	private static Character character; //TODO: remove it
	private static CharacterState characterState;

	private static ServerState serverState;

	public static void main(String[] args)
	{
		SpringApplication.run(TurmoilApplication.class, args);

		Logger.log("-> Initializing Character and Combat State...");

		initializeState();

		Logger.log("-> Initialized Character and Combat State!");
	}

	private static void initializeState()
	{
		serverState = new ServerState();
		serverState.getItemTemplates().initialize();

		character = new Character();
		character.setName("Fox Nemhauser");
		serverState.getCharacters().put("fox", character);

		characterState = new CharacterState();
		characterState.resetValues();
		character.setCharacterState(characterState);

		try
		{
			character.equip(ItemGenerator.rollItemOfRarityAndType(character, ItemRarity.LEGENDARY, ItemType.WEAPON));
		}
		catch (CouldNotEquipException e)
		{
			e.printStackTrace();
		}

		//		items.each {
		//			updateCharacterStateWithItem(characterState, it, it.itemSlot);
		//		}

		serverState.addItem(ItemGenerator.rollItem(character));
		serverState.addItem(ItemGenerator.rollItem(character));
		serverState.addItem(ItemGenerator.rollItem(character));
		serverState.addItem(ItemGenerator.rollItem(character));
		serverState.addItem(ItemGenerator.rollItem(character));
		serverState.addItem(ItemGenerator.rollItem(character));

		combatState = InstanceHelper.getCombatState(character);

		combatState.friend.instancePosition = "polygon-1-4";
		combatState.enemy.instancePosition = "polygon-8-3";
	}

	public static CombatState getCombatState()
	{
		return combatState;
	}

	public static Character getCharacter(String key)
	{
		return serverState.getCharacters().get(key);
	}

	public static CharacterState getCharacterState()
	{
		return characterState;
	}

	public static ServerState getServerState()
	{
		return serverState;
	}
}

/*
 * TODO:
 *  1. at some point make sure that initial actions are loaded in one go
 *  2. tooltips on equipment after reload don't show
 */