import {hideAllTooltips} from "./turmoil-tooltip";
import {playAudio} from './turmoil-general';
import soundAccessoryJewellery from "../media/audio/change_bling_004.wav";
import soundMediumArmor from "../media/audio/change_medium_002.wav";
import soundWeapon from "../media/audio/change_weapon_004.wav";

window.turmoil.sounds.soundAccessoryJewellery = soundAccessoryJewellery;
window.turmoil.sounds.soundMediumArmor = soundMediumArmor;
window.turmoil.sounds.soundWeapon = soundWeapon;

export function actionRightClickOnEquipment(item, updateItems)
{
	hideAllTooltips();

	if (item.ident)
	{
		window.turmoil.ajax.exec({
			url: 'character/unequip/' + item.ident,
			onSuccess: finalizeRightClickOnEquipment,
			onSuccessThis: updateItems
		});
	}
}

function finalizeRightClickOnEquipment(data, callbackFunction)
{
	if (data != null && data.success === true)
	{
		if (typeof(data.itemForStash) !== 'undefined')
		{
			switch (data.itemForStash.type)
			{
				case 'ACCESSORY':
					playAudio('soundAccessoryJewellery');
					break;
				case 'ARMOR':
					playAudio('soundMediumArmor');
					break;
				case 'WEAPON':
					playAudio('soundWeapon');

					//TODO: gfx effects

					// if (typeof(data.unequippedItemSlot) !== 'undefined')
					// {
					// 	jQuery('#' + data.unequippedItemSlot + '_effect').removeClass();
					// }
					break;
			}

			if (typeof(callbackFunction) === 'function')
			{
				console.log('calling function from equipment!');
				callbackFunction(data.itemForStash);
			}
		}
	}
}

export function actionRightClickOnStashedItem(itemId, updateItems)
{
	hideAllTooltips();

	window.turmoil.ajax.exec({
		url: 'character/equip/' + itemId,
		onSuccess: finalizeRightClickOnStashedItem,
		onSuccessThis: updateItems
	});
}

function finalizeRightClickOnStashedItem(data, callbackFunction)
{
	if (data != null && data.success === true)
	{
		if (typeof(data.itemForEquipment) !== 'undefined')
		{
			switch (data.itemForEquipment.type)
			{
				case 'ACCESSORY':
					playAudio('soundAccessoryJewellery');
					break;
				case 'ARMOR':
					playAudio('soundMediumArmor');
					break;
				case 'WEAPON':
					playAudio('soundWeapon');

					//TODO: also handle effect for weapons

					// if (data.equippedItemSlot === 'slot_right_hand' || data.equippedItemSlot === 'slot_left_hand')
					// {
					// 	jQuery('#' + data.equippedItemSlot + '_effect').removeClass();
					//
					// 	if (typeof(data.equippedWeaponDamageType) != 'undefined') {
					// 		jQuery('#' + data.equippedItemSlot + '_effect').addClass('item-weapon-bg-' + data.equippedWeaponDamageType);
					// 	}
					// }

					break;
			}
		}

		if (typeof(callbackFunction) === 'function')
		{
			callbackFunction(data.itemForStash, data.itemForEquipment);
		}
	}
}
