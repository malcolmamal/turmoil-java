package info.nemhauser.turmoil.engine.helpers;

import info.nemhauser.turmoil.TurmoilApplication;
import info.nemhauser.turmoil.engine.combat.effects.DamageDealt;
import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.CharacterState;
import info.nemhauser.turmoil.engine.enums.DamageMagnitude;
import info.nemhauser.turmoil.engine.enums.DamageType;

import java.util.Random;

public class CombatHelper
{
	public static DamageDealt computeDamageToDeal(Character character)
	{
		long damageToDeal;

		CharacterState characterState = TurmoilApplication.getCharacterState();

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

		return new DamageDealt(damageToDeal, DamageType.PHYSICAL, isCriticalHit ? DamageMagnitude.CRITICAL : DamageMagnitude.NORMAL);
	}
}
