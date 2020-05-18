package info.nemhauser.turmoil.controller;

import info.nemhauser.turmoil.TurmoilApplication;
import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.CharacterState;
import info.nemhauser.turmoil.engine.domain.Weapon;
import info.nemhauser.turmoil.response.ItemInEquipmentResponse;
import info.nemhauser.turmoil.response.ItemInStashResponse;
import net.minidev.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CharacterController
{
	private final static String slot = "slot_right_hand";

	@RequestMapping(value = "/character/state", produces = "application/json")
	public @ResponseBody
	CharacterState getItemsInStash()
	{
		return TurmoilApplication.getCharacterState();
	}

	@RequestMapping(value = "/character/unequip/{itemKey}", produces = "application/json")
	public @ResponseBody
	JSONObject unequipItem(@PathVariable String itemKey)
	{
		//TODO: item should know on which slot it is, front should not dictate it
		JSONObject object = new JSONObject();
		Character character = TurmoilApplication.getCharacter("fox");

		object.put("itemForStash", new ItemInEquipmentResponse(character.slotRightHand, slot));
		TurmoilApplication.getServerState().addItem(character.slotRightHand);

		character.slotRightHand = null;

		object.put("success", true);

		return object;
	}

	@RequestMapping(value = "/character/equip/{itemKey}", produces = "application/json")
	public @ResponseBody
	JSONObject equipItem(@PathVariable String itemKey)
	{
		JSONObject object = new JSONObject();

		Weapon item = (Weapon) TurmoilApplication.getServerState().getItems().get(itemKey);
		Character character = TurmoilApplication.getCharacter("fox");
		if (character.slotRightHand != null)
		{
			object.put("itemForStash", new ItemInStashResponse(character.slotRightHand));
			TurmoilApplication.getServerState().addItem(character.slotRightHand);
		}

		TurmoilApplication.getServerState().removeItem(item);
		character.slotRightHand = item;
		object.put("itemForEquipment", new ItemInEquipmentResponse(character.slotRightHand, slot));

		object.put("success", true);

		return object;
	}
}
