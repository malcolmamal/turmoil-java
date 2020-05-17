package info.nemhauser.turmoil.controller;

import info.nemhauser.turmoil.TurmoilApplication;
import info.nemhauser.turmoil.engine.domain.CharacterState;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CharacterController
{
	@RequestMapping(value = "/character/state", produces = "application/json")
	public @ResponseBody
	CharacterState getItemsInStash()
	{
		return TurmoilApplication.getCharacterState();
	}
}
