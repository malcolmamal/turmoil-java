package info.nemhauser.turmoil.response;

import info.nemhauser.turmoil.engine.domain.Person;

import java.util.Set;

public class FriendlyUnitResponse extends EnemyUnitResponse
{
	private Set<String> polygonsInRange;
	private String gender;
	private Boolean isActiveUnit;

	public FriendlyUnitResponse(Person person, Boolean isActiveUnit, Set<String> polygonsInRange)
	{
		super(person);
		this.gender = person.getGender().toString().toLowerCase();
		this.polygonsInRange = polygonsInRange;
		this.isActiveUnit = isActiveUnit;
	}

	public String[] getPolygonsInRange()
	{
		return polygonsInRange.toArray(new String[0]);
	}

	public String getGender()
	{
		return gender;
	}

	public Boolean getActiveUnit()
	{
		return isActiveUnit;
	}
}
