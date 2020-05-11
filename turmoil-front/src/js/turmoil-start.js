import jQuery from "jquery";
import {playAudio, hideSpinnerWithDelay} from '../js/turmoil-general';
import {hideAllTooltips} from '../js/turmoil-tooltip';
import {bringToTheTop, initWindow} from '../js/turmoil-windows';
import "jquery-ui/themes/base/all.css";


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

function actionRightClickOnEquipment(itemId)
{
	hideAllTooltips();

	if (itemId > 0)
	{
		window.turmoil.ajax.exec({
			url: 'account/unequip/' + itemId,
			onSuccess: finalizeRightClickOnEquipment
		});
	}
}

function finalizeRightClickOnEquipment(data)
{
	if (data != null && data.success === true)
	{
		if (typeof(data.stashedItemId) !== 'undefined' && typeof(data.stashedItemContent) !== 'undefined')
		{
			if (typeof(data.stashedItemType) !== 'undefined')
			{
				switch (data.stashedItemType)
				{
					case 'ACCESSORY':
						playAudio('soundAccessoryJewellery');
						break;
					case 'ARMOR':
						playAudio('soundMediumArmor');
						break;
					case 'WEAPON':
						playAudio('soundWeapon');
						if (typeof(data.unequippedItemSlot) !== 'undefined')
						{
							jQuery('#' + data.unequippedItemSlot + '_effect').removeClass();
						}
						break;
				}
			}

			jQuery('#stashItemListContainer').append(data.stashedItemContent);
			if (typeof(data.unequippedItemSlot !== 'undefined') && typeof(data.unequippedItemContent) != 'undefined')
			{
				jQuery('#' + data.unequippedItemSlot).html(data.unequippedItemContent);
			}
			updateStatisticsWindow();
		}
	}
}

function actionRightClickOnStashedItem(itemId)
{
	hideAllTooltips();

	window.turmoil.ajax.exec({
		url: 'account/equip/' + itemId,
		onSuccess: finalizeRightClickOnStashedItem
	});
}

function finalizeRightClickOnStashedItem(data)
{
	if (data != null && data.success === true)
	{
		if (typeof(data.equippedItemId) != 'undefined' && typeof(data.equippedItemContent) != 'undefined' && typeof(data.equippedItemSlot) != 'undefined')
		{
			//TODO find proper position to put the item
			jQuery('#' + data.equippedItemSlot).html(data.equippedItemContent);

			if (data.equippedItemSlot === 'slot_right_hand' || data.equippedItemSlot === 'slot_left_hand')
			{
				jQuery('#' + data.equippedItemSlot + '_effect').removeClass();

				if (typeof(data.equippedWeaponDamageType) != 'undefined') {
					jQuery('#' + data.equippedItemSlot + '_effect').addClass('item-weapon-bg-' + data.equippedWeaponDamageType);
				}
			}

			if (typeof(data.equippedItemType) != 'undefined')
			{
				//TODO perhaps generate the proper resource name in groovy so enums could be used
				switch (data.equippedItemType)
				{
					case 'ACCESSORY':
						playAudio('soundAccessoryJewellery');
						break;
					case 'ARMOR':
						playAudio('soundMediumArmor');
						break;
					case 'WEAPON':
						playAudio('soundWeapon');
						break;
				}
			}

			updateStatisticsWindow();
		}

		if (typeof(data.equippedItemId) != 'undefined')
		{
			jQuery('#stash_item_' + data.equippedItemId).remove();
		}

		putItemToStash(data);
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

	switchWindow('instance');

});