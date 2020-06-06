package info.nemhauser.turmoil.response;

import net.minidev.json.JSONObject;

import java.util.Map;

public class MoveResponse
{
	private final String actionType;
	private final Boolean friendlyTurn;
	private final Boolean success;
	private final String polygonId;
	private final String enemyId;

	public MoveResponse(String actionType, Boolean friendlyTurn, Boolean success, String polygonId, String enemyId)
	{
		this.actionType = actionType;
		this.friendlyTurn = friendlyTurn;
		this.success = success;
		this.polygonId = polygonId;
		this.enemyId = enemyId;
	}

	public String getActionType()
	{
		return actionType;
	}

	public Boolean getFriendlyTurn()
	{
		return friendlyTurn;
	}

	public Boolean getSuccess()
	{
		return success;
	}

	public String getPolygonId()
	{
		return polygonId;
	}

	public String getEnemyId()
	{
		return enemyId;
	}

	public JSONObject toJSONObject()
	{
		return new JSONObject(Map.of(
				"actionType", actionType,
				"friendlyTurn", friendlyTurn,
				"success", success,
				"polygonId", polygonId,
				"enemyId", enemyId
		));
	}
}
