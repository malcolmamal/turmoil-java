package info.nemhauser.turmoil.engine.helpers;

import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.CharacterState;

import java.util.Random;

class CombatHelper
{
	public static long computeDamageToDeal(Character character)
	{
		long damageToDeal;

		CharacterState characterState = ServerHelper.getCharacterState(character);

		boolean isCriticalHit = false;
		if (characterState.critChance > 0 && Math.round(100 * new Random().nextDouble()) <= characterState.critChance)
		{
			isCriticalHit = true;
			double damageMinCrit = characterState.damageMin * characterState.critDamage / 100;
			double damageMaxCrit = characterState.damageMax * characterState.critDamage / 100;

			damageToDeal = Math.round(damageMinCrit + (damageMaxCrit - damageMinCrit) * new Random().nextDouble());
		}
		else
		{
			damageToDeal = Math.round(characterState.damageMin + (characterState.damageMax - characterState.damageMin) * new Random().nextDouble());
		}

		return damageToDeal;
		//resultMap << [isCriticalHit: isCriticalHit];
	}
}
