package info.nemhauser.turmoil.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class TooltipController
{
	@RequestMapping("/tooltipTest")
	public String getTooltip(@RequestParam(value = "id") String id, Model model) {

		model.addAttribute("myId", id);
		model.addAttribute("yourId", "Aneta");

		return "index";
	}

	@RequestMapping("/tooltip/{item}")
	public String getTooltipAdvanced(@PathVariable String item, Model model) {

		return "tooltip/armor";
	}
}
