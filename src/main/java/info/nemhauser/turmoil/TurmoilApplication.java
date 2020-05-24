package info.nemhauser.turmoil;

import info.nemhauser.turmoil.config.Logger;
import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.CharacterState;
import info.nemhauser.turmoil.engine.enums.ItemRarity;
import info.nemhauser.turmoil.engine.enums.ItemType;
import info.nemhauser.turmoil.engine.exceptions.CouldNotEquipException;
import info.nemhauser.turmoil.engine.generators.ItemGenerator;
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

		character = new Character("testElement");
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

		serverState.addItem(ItemGenerator.rollItem(character));
		serverState.addItem(ItemGenerator.rollItem(character));
		serverState.addItem(ItemGenerator.rollItem(character));
		serverState.addItem(ItemGenerator.rollItem(character));
		serverState.addItem(ItemGenerator.rollItem(character));
		serverState.addItem(ItemGenerator.rollItem(character));

		combatState = InstanceHelper.getCombatState(character);
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
 *  2. seems like items can now roll with HEALING damage type :-)
 *  3. spear in second hand, equipping and unequipping two handed mace duplicates visually the spear in stash, seems like equipping it does not unequip left hand -> fixed on backend, need to check front
 *  4. when we have a Staff equipped, we can equip a one hand weapons (wand)
 *  5. inventory, open stashes
 *  6. graph is working wonky, enemy move 2 fields sometimes, looks like some mismatch on backend (wrong element from pair taken?)
 *
 */