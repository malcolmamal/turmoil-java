package info.nemhauser.turmoil.response;

import info.nemhauser.turmoil.engine.domain.Person;

public class EnemyUnitResponse
{
	private String ident;
	private String portrait;
	private String position;
	private int health;
	private double healthBar;

	public EnemyUnitResponse(Person monster)
	{
		this.ident = monster.getIdent();
		this.portrait = monster.getPortrait();
		this.position = monster.getInstancePosition();
		this.health = monster.getCurrentHealth();
		this.healthBar = monster.getHealthBarValue();
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

	public int getHealth()
	{
		return health;
	}

	public double getHealthBar()
	{
		return healthBar;
	}
}
