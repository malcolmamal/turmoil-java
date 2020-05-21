import jQuery from "jquery";
import {playAudio, hideSpinnerWithDelay} from '../js/turmoil-general';
import {hideAllTooltips} from '../js/turmoil-tooltip';
import {bringToTheTop, initWindow} from '../js/turmoil-windows';
import "jquery-ui/themes/base/all.css";
import {removeItem, removeItemFromStash, updateItemInSlot} from "./window-instance";

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

function updateStatisticsWindow()
{
	window.turmoil.ajax.exec({
		url: 'account/updateStatisticsWindow/',
		onSuccess: finalizeUpdateStatisticsWindow
	});
}

function finalizeUpdateStatisticsWindow(content)
{
	jQuery('#statsContent').html(content);
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
	console.log("finalize right click on equipment", data);

	if (data != null && data.success === true)
	{
		if (typeof(data.itemForStash) !== 'undefined')
		{
			console.log("removing from equipment");
			removeItem(data.itemForStash.slot, data.itemForStash.ident);

			console.log("adding to stash");
			window.turmoil.stash.items.push({"ident": data.itemForStash.ident, rarity: data.itemForStash.rarity, filePath: data.itemForStash.filePath, fileCode: data.itemForStash.fileCode});

			console.log("want to play a sound for", data.itemForStash.type);
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
		}

		if (typeof(callbackFunction) === 'function')
		{
			console.log('calling function from equipment!');
			callbackFunction();
		}

		// jQuery('#stashItemListContainer').append(data.stashedItemContent);
		// if (typeof(data.unequippedItemSlot !== 'undefined') && typeof(data.unequippedItemContent) != 'undefined')
		// {
		// 	jQuery('#' + data.unequippedItemSlot).html(data.unequippedItemContent);
		// }
		//TODO: handle stats window (was done in more places)
		//updateStatisticsWindow();
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
	console.log("finalize right click on stash", data);

	if (data != null && data.success === true)
	{
			if (typeof(data.itemForStash) !== 'undefined')
			{
				console.log("adding to stash");
				removeItem(data.itemForStash.slot, data.itemForStash.ident);
				window.turmoil.stash.items.push({"ident": data.itemForStash.ident, rarity: data.itemForStash.rarity, filePath: data.itemForStash.filePath, fileCode: data.itemForStash.fileCode});
			}

			if (typeof(data.itemForEquipment) !== 'undefined')
			{
				console.log("removing from stash");
				removeItemFromStash(data.itemForEquipment.ident);
				console.log("adding to equipment");
				updateItemInSlot(data.itemForEquipment.slot, data.itemForEquipment);

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
				console.log('calling function from stash!');
				callbackFunction();
			}

			//TODO: handle updating of statistic window
			//updateStatisticsWindow();

		//TODO: cleanup

		//putItemToStash(data);
	}
}

export function putItemToStash(data)
{
	if (typeof(data.stashedItemId) != 'undefined' && typeof(data.stashedItemContent) != 'undefined')
	{
		jQuery('#stashItemListContainer').append(data.stashedItemContent);
		hideSpinnerWithDelay();
	}
}

jQuery(function () {

	var slots = [
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

	/*
	  init for instance window
	*/

	//switchWindow('instance');

});