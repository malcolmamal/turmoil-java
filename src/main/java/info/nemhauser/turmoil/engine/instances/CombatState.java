package info.nemhauser.turmoil.engine.instances;

import info.nemhauser.turmoil.engine.domain.Monster;
import info.nemhauser.turmoil.engine.domain.Person;

import java.util.LinkedHashMap;

public class CombatState
{
	public Person friend;
	public Monster enemy;

	private final LinkedHashMap<String, Monster> enemies = new LinkedHashMap<>();

	public Integer turn = 1;

	//CombatRoundState ?


	public LinkedHashMap<String, Monster> getEnemies()
	{
		return enemies;
	}

	public Monster getEnemy(String key)
	{
		return enemies.get(key);
	}

	public void addEnemy(Monster monster)
	{
		enemies.put(monster.getIdent(), monster);

		enemy = monster;
	}
}
