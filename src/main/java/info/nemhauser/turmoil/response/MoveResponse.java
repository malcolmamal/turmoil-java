package info.nemhauser.turmoil.response;

public class MoveResponse
{
	private String actionType;
	private Boolean friendlyTurn;
	private Boolean success;
	private String polygonId;
	private String enemyId;

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
}
