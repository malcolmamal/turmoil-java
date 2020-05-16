package info.nemhauser.turmoil.controller;

import info.nemhauser.turmoil.TurmoilApplication;
import info.nemhauser.turmoil.config.Logger;
import info.nemhauser.turmoil.engine.domain.Item;
import info.nemhauser.turmoil.engine.generators.ItemGenerator;
import info.nemhauser.turmoil.response.ItemInStashResponse;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

@Controller
public class StashController
{
	private static final ArrayList<ItemInStashResponse> items = new ArrayList<>();

	@RequestMapping(value = "/initializeStash", produces = "application/json")
	public @ResponseBody
	JSONObject getItemsInStash()
	{
		if (items.size() != TurmoilApplication.getServerState().getItems().size())
		{
			items.clear();

			for (Item item : TurmoilApplication.getServerState().getItems().values())
			{
				ItemInStashResponse itemInStash = new ItemInStashResponse(item.getIdent(), item.getFileCode(), item.getFullImagePath(), item.getRarityClass());
				items.add(itemInStash);
			}
		}

		JSONArray array = new JSONArray();
		array.addAll(items);

		JSONObject object = new JSONObject();
		object.put("items", array);

		return object;
	}

	@RequestMapping(value = "/addToStash", produces = "application/json")
	public @ResponseBody
	JSONObject addToStash()
	{
		Logger.log("Started rolling item");

		TurmoilApplication.getServerState().addItem(ItemGenerator.rollItem(TurmoilApplication.getCharacter("fox")));

		Logger.log("Added item to stash");

		return null;
	}
}
