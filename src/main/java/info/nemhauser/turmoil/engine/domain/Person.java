package info.nemhauser.turmoil.engine.domain;

import info.nemhauser.turmoil.engine.enums.Gender;

import java.util.Date;
import java.util.Random;

abstract public class Person
{
	public static final double healthBarValue = 60;

	private String ident;
	String name;
	String portrait;
	public Integer level = 1;
	Date dateCreated;
	Date lastUpdated;

	Integer strength = 1;
	Integer intelligence = 1;
	Integer dexterity = 1;
	Integer vitality = 1;

	public Integer health = 100;
	public Integer currentHealth = 100;

	Gender gender = Gender.UNKNOWN;

	public Person(String ident)
	{
		this.ident = ident;
		gender = (new Random().nextInt(2) == 0) ? gender = Gender.MALE : Gender.FEMALE;
		generatePortrait();
	}

	public String toString() {
		return name;
	}

	public String instancePosition;

	public String getIdent()
	{
		return ident;
	}

	public void setIdent(String ident)
	{
		this.ident = ident;
	}

	public String getPortrait()
	{
		return portrait;
	}

	private void generatePortrait()
	{
		portrait = gender.toString().toLowerCase() + "/" + gender.toString().toLowerCase()
				+ "_portrait_"
				+ String.format("%03d", (new Random().nextInt(56)+1))
				+ ".png";
	}

	public String getInstancePosition()
	{
		return instancePosition;
	}

	public Integer getCurrentHealth()
	{
		return currentHealth;
	}

	public double getHealthBarValue()
	{
		return Math.floor(currentHealth * healthBarValue / health);
	}
}
