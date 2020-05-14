package info.nemhauser.turmoil.controller;

import info.nemhauser.turmoil.engine.domain.Armor;
import info.nemhauser.turmoil.engine.enums.ItemRarity;
import info.nemhauser.turmoil.engine.templates.ArmorTemplate;
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

		ArmorTemplate template = new ArmorTemplate();
		template.isLegendary = true;
		template.armorValue = 135;
		template.rarity = ItemRarity.LEGENDARY;
		template.itemCode = "SWORD_OF_HATE";

		Armor armor = new Armor(template);
		model.addAttribute("item", armor);

		return "tooltip/armor";
	}
}
