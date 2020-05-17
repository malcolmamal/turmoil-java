package info.nemhauser.turmoil.controller;

import info.nemhauser.turmoil.TurmoilApplication;
import info.nemhauser.turmoil.config.Logger;
import info.nemhauser.turmoil.engine.domain.Armor;
import info.nemhauser.turmoil.engine.domain.Attribute;
import info.nemhauser.turmoil.engine.domain.Item;
import info.nemhauser.turmoil.engine.enums.ArmorType;
import info.nemhauser.turmoil.engine.enums.ItemRarity;
import info.nemhauser.turmoil.engine.enums.ItemType;
import info.nemhauser.turmoil.engine.generators.ItemAttributeGenerator;
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
	public String getTooltipAdvanced(@PathVariable String item, Model model) throws Exception
	{
//		ArmorTemplate template = new ArmorTemplate();
//		template.isLegendary = true;
//		template.armorValue = 135;
//		template.rarity = ItemRarity.LEGENDARY;
//		template.itemCode = "FROSTBURN";
//
//		Armor armor = new Armor(template);
//		armor.itemName = "Dupcia Anety";
//		armor.itemType = ItemType.ARMOR;
//		armor.armorType = ArmorType.CHEST;
//
//		armor.attributes = ItemAttributeGenerator.rollAttributes(armor).toArray(new Attribute[0]);
//		for (Attribute atr : armor.attributes)
//		{
//			Logger.log(atr.toString());
//		}

		//TODO: handle not found

		Item itemForTooltip = TurmoilApplication.getServerState().getItem(item);
		if (itemForTooltip == null)
		{
			itemForTooltip = TurmoilApplication.getCharacter("fox").slotRightHand;
			if (!itemForTooltip.getIdent().equals(item))
			{
				throw new Exception("Tried to find item in right hand but failed, for code:" + item
						+ ". Right hand item has code: " + itemForTooltip.getIdent());
			}
		}

		model.addAttribute("item", itemForTooltip);

		return "tooltip/armor";
	}
}
