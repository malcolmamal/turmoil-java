import {Tooltip} from "./core/turmoil-tooltip";
import {Sound} from './core/turmoil-sound';
import {Ajax} from "./core/turmoil-ajax";

export function actionRightClickOnEquipment(item, updateItems)
{
	Tooltip.hideAllTooltips();

	if (item.ident) {
		Ajax.exec({
			url: 'character/unequip/' + item.ident,
			onSuccess: finalizeRightClickOnEquipment,
			onSuccessThis: updateItems
		});
	}
}

function finalizeRightClickOnEquipment(data, callbackFunction)
{
	if (data != null && data.success === true) {
		if (typeof(data.itemForStash) !== 'undefined') {
			switch (data.itemForStash.type) {
				case 'ACCESSORY':
					Sound.playAudio('soundAccessoryJewellery');
					break;
				case 'ARMOR':
					Sound.playAudio('soundMediumArmor');
					break;
				case 'WEAPON':
					Sound.playAudio('soundWeapon');

					//TODO: gfx effects

					// if (typeof(data.unequippedItemSlot) !== 'undefined')
					// {
					// 	jQuery('#' + data.unequippedItemSlot + '_effect').removeClass();
					// }
					break;
			}

			if (typeof(callbackFunction) === 'function') {
				console.log('calling function from equipment!');
				callbackFunction(data.itemForStash);
			}
		}
	}
}

export function actionRightClickOnStashedItem(itemId, updateItems)
{
	Tooltip.hideAllTooltips();

	Ajax.exec({
		url: 'character/equip/' + itemId,
		onSuccess: finalizeRightClickOnStashedItem,
		onSuccessThis: updateItems
	});
}

function finalizeRightClickOnStashedItem(data, callbackFunction)
{
	if (data != null && data.success === true) {
		if (typeof(data.itemForEquipment) !== 'undefined') {
			switch (data.itemForEquipment.type) {
				case 'ACCESSORY':
					Sound.playAudio('soundAccessoryJewellery');
					break;
				case 'ARMOR':
					Sound.playAudio('soundMediumArmor');
					break;
				case 'WEAPON':
					Sound.playAudio('soundWeapon');
					break;
			}
		}

		if (typeof(callbackFunction) === 'function')
		{
			callbackFunction(data.itemForStash, data.itemForEquipment);
		}
	}
}
