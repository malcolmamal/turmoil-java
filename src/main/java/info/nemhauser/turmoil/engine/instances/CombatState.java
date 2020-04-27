package info.nemhauser.turmoil.engine.instances;

import info.nemhauser.turmoil.engine.domain.Monster;
import info.nemhauser.turmoil.engine.domain.Person;

public class CombatState
{
	public Person friend;
	public Monster enemy;

	public Integer turn = 1;

	//CombatRoundState ?
}
