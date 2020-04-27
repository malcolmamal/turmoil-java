package info.nemhauser.turmoil.engine.helpers;

import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.CharacterState;
import info.nemhauser.turmoil.engine.enums.Gender;
import info.nemhauser.turmoil.engine.instances.CombatState;
import info.nemhauser.turmoil.engine.instances.EnumValues;
import info.nemhauser.turmoil.engine.instances.ItemTemplates;

import java.util.HashMap;

public class ServerHelper
{
	public static Integer maxLevel = 1000;

	public static EnumValues getEnumValues()
	{
		return null;
	}

	public static ItemTemplates getItemTemplates()
	{
		return null;
	}

	public static CharacterState getCharacterState(Character character)
	{
		if (getCharacterStates().containsKey(character.toString()))
		{
			return getCharacterStates().get(character.toString());
		}
		return null;
	}

	public static CharacterState setCharacterState(Character character, CharacterState characterState)
	{
		getCharacterStates().put(character.toString(), characterState);

		return null;
	}

	private static HashMap<String, CharacterState> getCharacterStates()
	{
		return null;
	}

	public static CombatState getCombatState(Character character)
	{
		if (getCombatStates().containsKey(character.toString()))
		{
			return getCombatStates().get(character.toString());
		}
		return null;
	}

	public static void setCombatState(Character character, CombatState combatState)
	{
		getCombatStates().put(character.toString(), combatState);
	}

	private static HashMap<String, CombatState> getCombatStates()
	{
		return null;
	}

	public static String[] getPortraits(Gender gender)
	{
		if (gender == Gender.FEMALE)
		{
			return null;
		}
		return null;
	}

	private static HashMap<String, String> getWindowsSettings()
	{
		return null;
	}

	public static String getCharacterWindowsSettings(Character character)
	{
		if (getWindowsSettings().containsKey(character.toString()))
		{
			return getWindowsSettings().get(character.toString());
		}
		return null;
	}

	public static void setCharacterWindowsSettings(Character character, String windowsSettings)
	{
		getWindowsSettings().put(character.toString(), windowsSettings);
	}

	public static HashMap<Integer, Integer> getExperiencePerLevelChart()
	{
		/*
		if (ServletContextHolder.getServletContext().experienceChart == null)
		{
			long experience = 100;
			ServletContextHolder.getServletContext().experienceChart = new HashMap<Integer, Integer>();
			for (int i in 1..(maxLevel-1))
			{
				experience = Math.round(Math.floor((experience + 300 * Math.log10(i)) / 10) * 10);
				if (experience > 10000)
				{
					experience = Math.round(Math.floor((experience / 100)) * 100);
				}
				ServletContextHolder.getServletContext().experienceChart.put(i+1, experience);
			}
		}

		 */
		return null;
	}
}
