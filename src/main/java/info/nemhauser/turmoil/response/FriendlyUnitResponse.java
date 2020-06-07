package info.nemhauser.turmoil.response;

import info.nemhauser.turmoil.engine.domain.Person;

import java.util.Set;

public class FriendlyUnitResponse extends EnemyUnitResponse
{
	private Set<String> polygonsInRange;

	public FriendlyUnitResponse(Person person, Set<String> polygonsInRange)
	{
		super(person);
		this.polygonsInRange = polygonsInRange;
	}

	public String[] getPolygonsInRange()
	{
		return polygonsInRange.toArray(new String[0]);
	}
}
