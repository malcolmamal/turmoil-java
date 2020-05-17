package info.nemhauser.turmoil.controller;

import info.nemhauser.turmoil.TurmoilApplication;
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
	@RequestMapping(value = "/initializeEquipment", produces = "application/json")
	public @ResponseBody
	JSONObject getItemsInEquipment()
	{
		JSONArray array = new JSONArray();
		array.add(convertItemToItemInEquipmentResponse(TurmoilApplication.getCharacter("fox").slotRightHand));

		JSONObject object = new JSONObject();
		object.put("items", array);

		return object;
	}

	public static ItemInEquipmentResponse convertItemToItemInEquipmentResponse(Item item)
	{
		return new ItemInEquipmentResponse(item.getIdent(), item.getFileCode(), item.getFullImagePath(), item.getRarityClass(), "slot_right_hand");
	}
}
