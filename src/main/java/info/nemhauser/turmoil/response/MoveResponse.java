package info.nemhauser.turmoil.response;

public class MoveResponse
{
	private String actionType;
	private Boolean friendlyTurn;
	private Boolean success;
	private String polygonId;

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
}
