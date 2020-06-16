package info.nemhauser.turmoil.controller;

import info.nemhauser.turmoil.TurmoilApplication;
import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.Item;
import info.nemhauser.turmoil.response.ItemInEquipmentResponse;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class EquipmentController
{
	@RequestMapping(value = "/equipment/initializeEquipment", produces = "application/json")
	public @ResponseBody
	JSONObject getItemsInEquipment()
	{
		JSONObject object = new JSONObject();

		object.put("items", getItemsInEquipment(TurmoilApplication.getActiveUnit()));

		return object;
	}

	public static JSONArray getItemsInEquipment(Character unit)
	{
		JSONArray array = new JSONArray();
		for (Item item : unit.getEquippedItems().values())
		{
			array.add(convertItemToItemInEquipmentResponse(item));
		}

		return array;
	}

	public static ItemInEquipmentResponse convertItemToItemInEquipmentResponse(Item item)
	{
		return new ItemInEquipmentResponse(item, item.getItemSlot());
	}
}
