package info.nemhauser.turmoil.engine.domain;

import info.nemhauser.turmoil.engine.enums.Gender;

import java.util.Date;

abstract public class Person
{
	String name;
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

	public String toString() {
		return name;
	}

	public String instancePosition;
}
