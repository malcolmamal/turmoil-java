package info.nemhauser.turmoil.controller;

import info.nemhauser.turmoil.TurmoilApplication;
import info.nemhauser.turmoil.config.Logger;
import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.Item;
import info.nemhauser.turmoil.engine.helpers.CharacterStateHelper;
import info.nemhauser.turmoil.engine.helpers.CombatHelper;
import info.nemhauser.turmoil.engine.helpers.ExperienceHelper;
import info.nemhauser.turmoil.engine.helpers.InstanceHelper;
import info.nemhauser.turmoil.engine.instances.CombatState;
import info.nemhauser.turmoil.engine.world.map.graph.Instance;
import info.nemhauser.turmoil.engine.world.map.graph.Pathing;
import info.nemhauser.turmoil.response.EnemyUnitResponse;
import info.nemhauser.turmoil.response.MoveResponse;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;


@RestController
class InstanceController {

	private static final ArrayList<EnemyUnitResponse> enemyUnits = new ArrayList<>();
	private static int iterator = 0;
	private static int portrait = 10;

	@RequestMapping(value = "/initializeUnits", produces = "application/json")
	public @ResponseBody
	JSONObject instanceInitializeUnits()
	{
		if (enemyUnits.size() == 0)
		{
			EnemyUnitResponse enemy = new EnemyUnitResponse("testEnemy", "male/male_portrait_055.png", "polygon-8-3");
			EnemyUnitResponse enemy2 = new EnemyUnitResponse("testEnemy2", "male/male_portrait_054.png", "polygon-8-5");
			EnemyUnitResponse enemy3 = new EnemyUnitResponse("testEnemy3", "male/male_portrait_053.png", "polygon-8-1");

			enemyUnits.add(enemy);
			enemyUnits.add(enemy2);
			enemyUnits.add(enemy3);

			iterator = 4;
		}

		JSONArray array = new JSONArray();
		array.addAll(enemyUnits);

		JSONObject object = new JSONObject();
		object.put("enemyUnits", array);

		return object;
	}

	@RequestMapping(value = "/instanceAddEnemy", produces = "application/json")
	public @ResponseBody
	JSONObject instanceAddEnemy()
	{
		iterator++;
		portrait++;
		EnemyUnitResponse enemy = new EnemyUnitResponse(
				"testEnemy" + iterator,
				"male/male_portrait_0" + portrait + ".png",
				"polygon-" + (int)(Math.floor(Math.random() * 7) + 1) + "-" + (int)(Math.floor(Math.random() * 5) + 1));

		enemyUnits.add(enemy);

		JSONArray array = new JSONArray();
		array.addAll(enemyUnits);

		JSONObject object = new JSONObject();
		object.put("enemyUnits", array);

		return object;
	}

	@RequestMapping(value = "/instanceMove/{position}", produces = "application/json")
	public @ResponseBody
	MoveResponse instanceMove(@PathVariable String position) {
		Logger.log("Moving character to " + position);

		CombatState cs = TurmoilApplication.getCombatState();
		cs.friend.instancePosition = position;

		return new MoveResponse("move", true, true, position);
	}

	@RequestMapping(value = "/instanceAttack/{position}", produces = "application/json")
	public @ResponseBody
	JSONObject instanceAttack(@PathVariable String position)
	{
		Logger.log("Attacking unit at " + position);
		// todo
		double healthBarValue = 60;

		if (position != null)// && character != null)
		{
			CombatState cs = TurmoilApplication.getCombatState();

			long computedAttack = 6; //CombatHelper.computeDamageToDeal(character);
			int damageDealt = (int)computedAttack;//computedAttack['damageToDeal'];
			cs.enemy.currentHealth -= damageDealt;

			if (cs.enemy.currentHealth < 0)
			{
				Item item = cs.enemy.lootBag.get("loot");
				if (item != null)
				{
					//itemService.saveItem(item, character);

					//json.put("stashedItemId", item.toStringFull());


					//todo
					//json.put( << [stashedItemContent: g.render(contextPath: "../character/", template: "item_slot_stash", model: [item: item])];
				}

				//cs.enemy = InstanceHelper.createMonster(character);
				//json.put("newEnemyPosition", cs.enemy.instancePosition);

				//TODO: handle it properly
//				character.experience += 10;
//				if (character.experience >= ExperienceHelper.getRequiredExperience(character.level+1))
//				{
//					character.level++;
//					character.experience = ExperienceHelper.getRequiredExperience(character.level) - character.experience;
//				}
//				CharacterStateHelper.computeValuesForCharacterState(character);
			}

			//if (computedAttack['isCriticalHit'])
			{
				//json.put("type", "critical");
			}

			return new JSONObject(Map.of(
					"success", true,
					"friendlyTurn", true,
					"actionType", "attack",
					"polygonId", position,
					"damageDealt", damageDealt,
					"healthBar", Math.floor(cs.enemy.currentHealth * healthBarValue / cs.enemy.health)
			));
		}
		return new JSONObject();
	}

	@RequestMapping(value = "/instanceActionEnemy/{enemy}", produces = "application/json")
	public @ResponseBody
	JSONObject instanceActionEnemy(@PathVariable String enemy) {

		//TODO
		double healthBarValue = 60;

		Logger.log("!!!!!! doing stuff for " + enemy);

		CombatState cs = TurmoilApplication.getCombatState();

		String enemyPosition = cs.enemy.instancePosition.substring(8);
		String characterPosition = cs.friend.instancePosition.substring(8);

		Pathing pathing = new Pathing(Instance.getInstanceGraph(), enemyPosition, characterPosition);

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
					"healthBar", Math.floor(cs.friend.currentHealth * healthBarValue / cs.friend.health),
					"attackingUnit", enemy
			));
		}

		cs.enemy.instancePosition = moveTo;

		return new JSONObject(Map.of(
				"success", true,
				"polygonId", moveTo,
				"actionType", "move",
				"unitToMove", enemy,
				"path", "polygon-5-2"
		));
	}
}