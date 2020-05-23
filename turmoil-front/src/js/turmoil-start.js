import jQuery from "jquery";
import {playAudio, hideSpinnerWithDelay} from './turmoil-general';
import {hideAllTooltips} from './turmoil-tooltip';
import {bringToTheTop, initWindow} from './turmoil-windows';
import "jquery-ui/themes/base/all.css";

import soundAccessoryJewellery from "../media/audio/change_bling_004.wav";
import soundMediumArmor from "../media/audio/change_medium_002.wav";
import soundWeapon from "../media/audio/change_weapon_004.wav";

window.turmoil.sounds.soundAccessoryJewellery = soundAccessoryJewellery;
window.turmoil.sounds.soundMediumArmor = soundMediumArmor;
window.turmoil.sounds.soundWeapon = soundWeapon;

function switchWindow(windowType)
{
	hideAllTooltips();

	if (jQuery('#window_' + windowType + '_resizer').is(':hidden'))
	{
		jQuery('#window_' + windowType + '_resizer').show();
		bringToTheTop(windowType);
	}
	else
	{
		jQuery('#window_' + windowType + '_resizer').hide();
	}
}

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

jQuery(function () {

	let slots = [
		'slot_right_hand',
		'slot_left_hand',
		'slot_amulet',
		'slot_ring_one',
		'slot_ring_two',
		'slot_ring_three',
		'slot_ring_four',
		'slot_helm',
		'slot_chest',
		'slot_belt',
		'slot_pants',
		'slot_boots',
		'slot_pauldrons',
		'slot_gloves',
		'slot_bracers'
	];

	jQuery.each(slots, function (index, value) {
		jQuery('#' + value).draggable({
			revert: true,
			start: function (event, ui) {
				hideAllTooltips();
			},
			stop: function (event, ui) {
				hideAllTooltips();
			}
		});
	});

	jQuery.each(jQuery.find('.windowIcon'), function (index, value) {
		jQuery(value).draggable({
			revert: true
		});
	});

	window.windowSizes = [];

	window.windowSizes.consoleWidth = 600;
	window.windowSizes.consoleHeight = 160;
	initWindow('console', true);

	window.windowSizes.instanceWidth = 650;
	window.windowSizes.instanceHeight = 610;
	initWindow('instance', true);

	window.windowSizes.equipmentWidth = 800;
	window.windowSizes.equipmentHeight = 830;
	initWindow('equipment', true);

	window.windowSizes.stashWidth = 500;
	window.windowSizes.stashHeight = 700;
	initWindow('stash', true);

	window.windowSizes.statsWidth = 300;
	window.windowSizes.statsHeight = 700;
	initWindow('stats', true);

/*
	jQuery(document).bind('keydown', 'i', function () {
		switchWindow('equipment')
	});
	jQuery(document).bind('keydown', 'c', function () {
		switchWindow('stats')
	});
	jQuery(document).bind('keydown', 's', function () {
		switchWindow('stash')
	});
*/

	/**
	 * TODO: fix
	 *
	 * seems to react to any key...
	 */

	/*
	jQuery(document).bind('keydown', 'n', function () {
		switchWindow('instance')
	});

	jQuery(document).bind('keydown', 'o', function () {
		switchWindow('console')
	});
	 */

});