package info.nemhauser.turmoil.response;

import net.minidev.json.JSONObject;

import java.util.Map;

public class MoveResponse
{
	private final String actionType;
	private final Boolean friendlyTurn;
	private final Boolean success;
	private final String polygonId;

	public MoveResponse(String actionType, Boolean friendlyTurn, Boolean success, String polygonId)
	{
		this.actionType = actionType;
		this.friendlyTurn = friendlyTurn;
		this.success = success;
		this.polygonId = polygonId;
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

	public JSONObject toJSONObject()
	{
		return new JSONObject(Map.of(
				"actionType", actionType,
				"friendlyTurn", friendlyTurn,
				"success", success,
				"polygonId", polygonId
		));
	}
}
