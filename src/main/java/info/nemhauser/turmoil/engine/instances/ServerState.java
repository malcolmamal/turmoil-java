package info.nemhauser.turmoil.engine.instances;

import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.Item;

import java.util.HashMap;

public class ServerState
{
	private HashMap<String, Character> characters = new HashMap<>();
	private static final HashMap<String, Item> items = new HashMap<>();

	public HashMap<String, Character> getCharacters()
	{
		return characters;
	}

	public HashMap<String, Item> getItems()
	{
		return items;
	}

	public void addItem(Item item)
	{
		items.put(item.getIdent(), item);
	}

	public Item getItem(String key)
	{
		if (!items.containsKey(key))
		{
			return null;
		}

		return items.get(key);
	}
}
