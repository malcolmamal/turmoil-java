package info.nemhauser.turmoil.controller;

import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.response.MoveResponse;
import info.nemhauser.turmoil.sandbox.Sandbox;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;



@RestController
class InstanceController {

	private String currentPosition;
	private String previousPosition;

	@RequestMapping(value = "/instanceMove/{position}", produces = "application/json")
	public @ResponseBody
	MoveResponse instanceMove(@PathVariable String position) {
		//, final HttpServletResponse response
		//@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
		System.out.println("!!!!!! doing stuff for " + position);

		if (currentPosition != null)
		{
			previousPosition = currentPosition;
		}
		currentPosition = position;

		return new MoveResponse("move", true, true, position);

		//response.setHeader("X-Content-Type-Options", "");
		//response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//@CrossOrigin(origins = "http://localhost:3000")
		//return "{\"actionType\":\"move\",\"friendlyTurn\":true,\"success\":true,\"polygonId\":\"polygon-3-3\"}";
		//System.out.println("Position was: " + position);
		//Character character = new Character();
		//return Sandbox.instanceMove(character, position);
	}

	@RequestMapping(value = "/instanceActionEnemy/{enemy}", produces = "application/json")
	public @ResponseBody
	JSONObject instanceActionEnemy(@PathVariable String enemy) {

		System.out.println("!!!!!! doing stuff for " + enemy);

		JSONObject json = new JSONObject();

		json.put("success", true);
		json.put("polygonId", (previousPosition == null) ? "polygon-5-2" : previousPosition);
		json.put("actionType", "move");
		json.put("unitToMove", enemy);
		json.put("path", "polygon-5-2");

		return json;

		//			json.put("polygonId", newPolygon);
		//			if (path.first().getEdgeList().size() == 1)
		//			{
		//				cs.friend.currentHealth -= 5;
		//
		//				json.put("actionType", "attack");
		//				json.put("attackingUnit", position);
		//				json.put("damageDealt", 5);
		//				json.put("healthBar", Math.floor(cs.friend.currentHealth * healthBarValue / cs.friend.health));
		//			}
		//			else
		//			{
		//				cs.enemy.instancePosition = newPolygon;
		//
//						json.put("actionType", "move");
//						json.put("unitToMove", enemy);
//						json.put("path", path);
		//			}


		//return new MoveResponse("move", true, true, position);

	}
}