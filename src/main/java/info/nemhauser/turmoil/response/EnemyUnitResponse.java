package info.nemhauser.turmoil.response;

public class EnemyUnitResponse
{
	private String ident;
	private String portrait;
	private String position;

	public EnemyUnitResponse(String ident, String portrait, String position)
	{
		this.ident = ident;
		this.portrait = portrait;
		this.position = position;
	}

	public String getIdent()
	{
		return ident;
	}

	public String getPortrait()
	{
		return portrait;
	}

	public String getPosition()
	{
		return position;
	}
}
