package info.nemhauser.turmoil;

import info.nemhauser.turmoil.config.Logger;
import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.helpers.InstanceHelper;
import info.nemhauser.turmoil.engine.instances.CombatState;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TurmoilApplication
{
	private static CombatState combatState;
	private static Character character;

	public static void main(String[] args)
	{
		SpringApplication.run(TurmoilApplication.class, args);

		Logger.log("-> Initializing Character and Combat State...");

		initializeState();

		Logger.log("-> Initialed Character and Combat State!");
	}

	private static void initializeState()
	{
		character = new Character();
		combatState = InstanceHelper.getCombatState(character);

		combatState.friend.instancePosition = "polygon-1-4";
		combatState.enemy.instancePosition = "polygon-8-3";
	}

	public static CombatState getCombatState()
	{
		return combatState;
	}

	public static Character getCharacter()
	{
		return character;
	}
}
