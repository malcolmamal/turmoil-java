package info.nemhauser.turmoil.controller;

import info.nemhauser.turmoil.TurmoilApplication;
import info.nemhauser.turmoil.config.Logger;
import info.nemhauser.turmoil.engine.combat.effects.DamageDealt;
import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.Item;
import info.nemhauser.turmoil.engine.domain.Monster;
import info.nemhauser.turmoil.engine.helpers.CharacterStateHelper;
import info.nemhauser.turmoil.engine.helpers.CombatHelper;
import info.nemhauser.turmoil.engine.helpers.ExperienceHelper;
import info.nemhauser.turmoil.engine.helpers.InstanceHelper;
import info.nemhauser.turmoil.engine.instances.CombatState;
import info.nemhauser.turmoil.engine.world.map.graph.Instance;
import info.nemhauser.turmoil.engine.world.map.graph.Pathing;
import info.nemhauser.turmoil.response.EnemyUnitResponse;
import info.nemhauser.turmoil.response.FriendlyUnitResponse;
import info.nemhauser.turmoil.response.ItemInStashResponse;
import info.nemhauser.turmoil.response.MoveResponse;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
class InstanceController {

	@RequestMapping(value = "/instance/initializeEnemyUnits", produces = "application/json")
	public @ResponseBody
	JSONObject instanceInitializeEnemyUnits()
	{
		JSONArray array = new JSONArray();

		for (Monster monster : TurmoilApplication.getCombatState().getEnemies().values())
		{
			array.add(new EnemyUnitResponse(monster));
		}

		JSONObject object = new JSONObject();
		object.put("enemyUnits", array);

		return object;
	}

	@RequestMapping(value = "/instance/initializeFriendlyUnits", produces = "application/json")
	public @ResponseBody
	JSONObject instanceInitializeFriendlyUnits()
	{
		//TODO: maybe join with enemy?

		JSONArray array = new JSONArray();

		array.add(new FriendlyUnitResponse(TurmoilApplication.getCombatState().friend));

		JSONObject object = new JSONObject();
		object.put("friendlyUnits", array);

		return object;
	}

	@RequestMapping(value = "/instance/instanceAddEnemy", produces = "application/json")
	public @ResponseBody
	JSONObject instanceAddEnemy()
	{
		JSONArray array = new JSONArray();

		TurmoilApplication.getCombatState().addEnemy(InstanceHelper.createMonster(TurmoilApplication.getCharacter("fox")));
		for (Monster monster : TurmoilApplication.getCombatState().getEnemies().values())
		{
			array.add(new EnemyUnitResponse(monster));
		}

		JSONObject object = new JSONObject();
		object.put("enemyUnits", array);

		return object;
	}

	@RequestMapping(value = "/instanceMove/{position}", produces = "application/json")
	public @ResponseBody
	MoveResponse instanceMove(@PathVariable String position)
	{
		return moveToPosition(position);
	}

	@RequestMapping(value = "/instanceAttack/{position}", produces = "application/json")
	public @ResponseBody
	JSONObject instanceAttack(@PathVariable String position)
	{
		return attackEnemyOnPosition(position);
	}

	@RequestMapping(value = "/instanceActionEnemy/{enemy}", produces = "application/json")
	public @ResponseBody
	JSONObject instanceActionEnemy(@PathVariable String enemy)
	{
		return actionEnemy(enemy);
	}

	@RequestMapping(value = "/instance/instanceActionOnPosition/{position}", produces = "application/json")
	public @ResponseBody
	JSONObject instanceActionOnPosition(@PathVariable String position)
	{
		CombatState cs = TurmoilApplication.getCombatState();

		JSONArray array = new JSONArray();

		// our action

		if (cs.getEnemiesOnPositions().containsKey(position))
		{
			// attack
			array.add(attackEnemyOnPosition(position));
		}
		else
		{
			// move
			array.add(moveToPosition(position).toJSONObject());
		}

		// enemy action

		array.add(actionEnemy(cs.enemy.getIdent()));

		JSONObject object = new JSONObject();
		object.put("actions", array);

		return object;
	}

	private JSONObject attackEnemyOnPosition(String position)
	{
		Logger.log("Attacking unit at " + position);
		Character character = TurmoilApplication.getCharacter("fox");

		if (position != null)
		{
			CombatState cs = TurmoilApplication.getCombatState();

			DamageDealt damageDealt = CombatHelper.computeDamageToDeal(character);
			cs.enemy.currentHealth -= (int)damageDealt.getValue();

			JSONObject object = new JSONObject(Map.of(
					"success", true,
					"friendlyTurn", true,
					"actionType", "attack",
					"type", damageDealt.isCritical() ? "critical" : "",
					"polygonId", position,
					"damageDealt", damageDealt.getValue(),
					"healthBar", cs.enemy.getHealthBarValue(),
					"enemyId", cs.enemy.getIdent()
			));

			if (cs.enemy.currentHealth < 0)
			{
				object.put("unitToRemove", new EnemyUnitResponse(cs.enemy));

				Item item = cs.enemy.lootBag.get("loot");
				if (item != null)
				{
					TurmoilApplication.getServerState().addItem(item);
					object.put("itemForStash", new ItemInStashResponse(item));
				}

				cs.addEnemy(InstanceHelper.createMonster(TurmoilApplication.getCharacter("fox")));

				object.put("unitToAdd", new EnemyUnitResponse(cs.enemy));
				object.put("healthBar", cs.enemy.getHealthBarValue());

				//TODO: handle it properly
				character.experience += 10;
				//				if (character.experience >= ExperienceHelper.getRequiredExperience(character.level+1))
				//				{
				//					character.level++;
				//					character.experience = ExperienceHelper.getRequiredExperience(character.level) - character.experience;
				//				}
				CharacterStateHelper.computeValuesForCharacterState(character);
			}

			return object;
		}
		return new JSONObject();
	}

	private MoveResponse moveToPosition(String position)
	{
		Logger.log("Moving character to " + position);

		CombatState cs = TurmoilApplication.getCombatState();
		cs.friend.instancePosition = position;

		return new MoveResponse("move", true, true, position, cs.enemy.getIdent());
	}

	private JSONObject actionEnemy(String enemy)
	{
		Logger.log("!!!!!! doing stuff for " + enemy);

		CombatState cs = TurmoilApplication.getCombatState();

		String enemyPosition = cs.enemy.instancePosition.substring(8);
		String characterPosition = cs.friend.instancePosition.substring(8);

		Pathing pathing = new Pathing(cs.getInstanceGraph(), enemyPosition, characterPosition);

		String moveTo = "polygon-" + pathing.getNextPosition();

		Logger.log("Move distance: " + pathing.getDistance());
		Logger.log("enemy will move to: " + moveTo);

		if (moveTo.equals(cs.friend.instancePosition))
		{
			Logger.log("Enemy should attack!");

			cs.friend.currentHealth -= 5;

			return new JSONObject(Map.of(
					"success", true,
					"polygonId", moveTo,
					"actionType", "attack",
					"damageDealt", 5,
					"healthBar", cs.friend.getHealthBarValue(),
					"attackingUnit", enemy
			));
		}

		cs.enemy.instancePosition = moveTo;

		return new JSONObject(Map.of(
				"success", true,
				"polygonId", moveTo,
				"actionType", "move",
				"unitToMove", enemy
		));
	}
}
