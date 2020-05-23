import jQuery from "jquery";
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/resizable";

import {resetZIndex} from './turmoil-windows';
import {stopAudioLoop, playAudio, playAudioLoop, randomInt} from './turmoil-general';
import {putItemToStash} from './turmoil-start';

window.turmoil.instance = {};
window.turmoil.instance.enemies = [
	//{"ident": "testEnemy", portrait: "male/male_portrait_055.png", position: "polygon-8-3"},
	//{ident: "testEnemy2", portrait: "male/male_portrait_054.png", position: "polygon-8-5"},
];

window.turmoil.equipment = {};
window.turmoil.equipment.items = [];

console.log("items at instance", window.turmoil.equipment.items);

window.turmoil.stash = {};
window.turmoil.stash.items = [
	// {"ident": "itemA", rarity: "white"},
	// {"ident": "itemB", rarity: "blue"},
	// {"ident": "itemC", rarity: "yellow"},
	// {"ident": "itemD", rarity: "orange"},
	// {"ident": "itemE", rarity: "green"},
	// {"ident": "itemF", rarity: "red"},
	// {"ident": "itemG", rarity: "purple"},
];

export function updateItemInSlot(slot, item)
{
	console.log("items before update", window.turmoil.equipment.items);

	console.log("updating item", item);

	let itemToPush = {};
	itemToPush.item = item;
	itemToPush.slot = slot;

	let removedItem = updateItem(slot, item.ident);
	if (removedItem.top)
	{
		itemToPush.top = removedItem.top;
		itemToPush.left = removedItem.left;
		itemToPush.iconItemSize = removedItem.iconItemSize;
	}

	if (removedItem.noChange)
	{
		console.log("we will not add to items since we did not remove and the existing one is already there");
		return;
	}

	window.turmoil.equipment.items.push(itemToPush);
}

export function removeItem(slot, ident)
{
	return removeOrUpdateItem(slot, ident, false);
}

function updateItem(slot, ident)
{
	return removeOrUpdateItem(slot, ident, true);
}

function removeOrUpdateItem(slot, ident, onlyUpdate)
{
	let index;

	for (index = window.turmoil.equipment.items.length; index-- > 0 && window.turmoil.equipment.items[index].slot !== slot;) {}
	if (index > -1) {
		let removedItem = window.turmoil.equipment.items[index];

		if (onlyUpdate && removedItem.ident === ident)
		{
			// do not remove actually, because it's the same
			console.log("do not remove item for ident/slot", ident, slot)

			return {noChange: true};
		}

		window.turmoil.equipment.items.splice(index, 1);

		console.log("removed item for slot", slot, removedItem);

		if (!onlyUpdate)
		{
			window.turmoil.equipment.items.push(restoreEmptySlot(removedItem, slot));
		}

		return removedItem;
	}

	console.log("did not find item to remove for slot/ident", slot, ident);

	return {};
}

function restoreEmptySlot(removedItem, slot)
{
	let emptySlot = {
		slot: slot, top: removedItem.top, left: removedItem, item: {}
	};

	if (typeof(removedItem.iconItemSize) !== 'undefined')
	{
		emptySlot.iconItemSize = removedItem.iconItemSize;
	}

	return emptySlot;
}

export function removeItemFromStash(ident)
{
	//TODO: unify both functions (this and removeItem)
	let index;

	for (index = window.turmoil.stash.items.length; index-- > 0 && window.turmoil.stash.items[index].ident !== ident;) {}
	if (index > -1) {
		let removedItem = window.turmoil.stash.items[index];
		window.turmoil.stash.items.splice(index, 1);

		console.log("removed item for ident from stash", ident, removedItem);

		return removedItem;
	}

	return {};
}

function svgAddClass(element, className)
{
	let newClasses = '';
	let hasClass = false;
	jQuery.each(element.attr('class').replace(/[\s]+/g, ' ').trim().split(' '), function( index, value ) {
		newClasses += ' ' + value;
		if (className === value)
		{
			hasClass = true;
		}
	});

	if (!hasClass)
	{
		newClasses += ' ' + className;
	}

	element.attr('class', jQuery.trim(newClasses));
}

function svgRemoveClass(element, className)
{
	let newClasses = '';
	jQuery.each(element.attr('class').replace(/[\s]+/g, ' ').trim().split(' '), function( index, value ) {
		if (className !== value)
		{
			newClasses += ' ' + value;
		}
	});
	element.attr('class', jQuery.trim(newClasses));
}

function svgHasClass(element, className)
{
	let hasClass = false;
	jQuery.each(element.attr('class').replace(/[\s]+/g, ' ').trim().split(' '), function( index, value ) {
		if (className === value)
		{
			hasClass = true;
			return false;
		}
	});
	return hasClass;
}

function svgPrintClasses(element)
{
	console.log(element.attr('class'));
}

function blink(element)
{
	jQuery(element).fadeTo(1000, 0.4, function() {
		jQuery(this).fadeTo(750, 0.9, function() {
			blink(this);
		});
	});
}

let initialPolygonMove = true;
let activeUnit = null;

function getPolygonForUnit(unit)
{
	return jQuery('#' + jQuery(unit).data('previousPolygonId'));
}

export function actionOnUnit(unitId, updateStash)
{
	let unit = jQuery('#' + unitId);

	if (jQuery(unit).hasClass('enemyUnit'))
	{
		let polygon = jQuery(getPolygonForUnit(unit));
		let url = 'instanceAttack/' + polygon.attr('id');

		if (svgHasClass(polygon, 'instancePolygonEnemy'))
		{
			window.turmoil.ajax.exec({
				url: url,
				onSuccess: finalizeActionOnPolygon,
				onSuccessThis: updateStash
			});
		}
	}
}

function actionOnPolygon(polygon, unit)
{
	if (typeof(unit) == 'undefined')
	{
		if (typeof(activeUnit) == 'undefined')
		{
			window.turmoil.logDebug('there is no active unit', arguments);
		}
		unit = activeUnit;
	}

	let url = '';
	if (unit.hasClass('enemyUnit'))
	{
		url += 'instanceActionEnemy/' + unit.attr('id');
	}
	else
	{
		if (typeof(polygon) == 'undefined' || polygon == null)
		{
			window.turmoil.logDebug('wrong polygon parameter', arguments);
			return;
		}

		if (svgHasClass(polygon, 'instancePolygon'))
		{
			url += 'instanceMove/' + polygon.attr('id');
		}
		else
		{
			window.turmoil.logDebug('not possible to move to polygon ' + polygon.attr('id'), arguments);
			return;
		}
	}

	window.turmoil.ajax.exec({
		url: url,
		onSuccess: finalizeActionOnPolygon
	});
}

export function handleMoveToPolygon(polygon, unit)
{
	window.turmoil.log('Unit ' + unit.attr('id') + ' moves to ' + polygon.attr('id'));

	if (unit.data('previousPolygonId') != null)
	{
		let previousPolygon = jQuery('#' + unit.data('previousPolygonId'));

		svgAddClass(previousPolygon, 'instancePolygon');
		if (unit.hasClass('enemyUnit'))
		{
			svgRemoveClass(previousPolygon, 'instancePolygonEnemy');
		}
		else
		{
			svgRemoveClass(previousPolygon, 'instancePolygonActive');
		}
		previousPolygon.data('unit', '');
	}

	let offsetContainer = jQuery('#instanceContainer').offset();
	if (typeof offsetContainer == 'undefined')
	{
		console.log('offsetContainer undefined');
		return;
	}

	if (typeof polygon == 'undefined')
	{
		console.log('polygon undefined');
		return;
	}

	let offset = polygon.offset();
	if (typeof offset == 'undefined')
	{
		console.log('offset undefined');
		return;
	}

	let width = polygon.width();
	let height = polygon.height();

	let centerX = offset.left + width / 2 - offsetContainer.left + 17;
	let centerY = offset.top + height / 2 - offsetContainer.top + 17;

	unit.stop().animate({
			left: centerX,
			top: centerY
		},
		250,
		function() {
			if (unit.hasClass('enemyUnit'))
			{
				svgAddClass(polygon, 'instancePolygonEnemy');
			}
			else
			{
				svgAddClass(polygon, 'instancePolygonActive');
				blink('#testElement');
			}
			svgRemoveClass(polygon, 'instancePolygon');
			stopAudioLoop('soundMoveLeather', unit.attr('id'));
		}
	);

	console.log('moving to: ', polygon.attr('id') );

	unit.data('previousPolygonId', polygon.attr('id'));
	polygon.data('unit', unit.attr('id'));
}

function finalizeActionOnPolygon(data, callbackFunction)
{
	if (data != null && data.success === true && typeof(data.polygonId) != 'undefined')
	{
		let unit = activeUnit;

		let polygon = jQuery('#' + data.polygonId);
		if (polygon.length > 0 && typeof(data.actionType) != 'undefined')
		{
			if (data.actionType === 'attack')
			{
				if (typeof(data.attackingUnit) != 'undefined')
				{
					unit = jQuery('#' + data.attackingUnit);
				}
				handleAttackPolygon(polygon, unit, data);
			}
			else if (data.actionType === 'move')
			{
				if (typeof(data.unitToMove) != 'undefined')
				{
					unit = jQuery('#' + data.unitToMove);
				}
				handleMoveToPolygon(polygon, unit);
				playAudioLoop('soundMoveLeather', unit.attr('id'));
			}
		}

		if (typeof(data.newEnemyPosition) != 'undefined')
		{
			if (typeof(data.healthBar) != 'undefined')
			{
				jQuery('#' + polygon.data('unit') + 'Health').css('width', data.healthBar);
			}
			handleMoveToPolygon(jQuery('#' + data.newEnemyPosition), jQuery('#testEnemy'));
		}

		if (typeof(data.stashedItemId) != 'undefined')
		{
			console.log("stashedItemId looks good", data);
			window.turmoil.stash.items.push({"ident": data.stashedItemId, rarity: data.rarity, filePath: data.filePath, fileCode: data.fileCode});

			//TODO: handle windows position save, maybe as props

			if (typeof(callbackFunction) === 'function')
			{
				console.log('calling function!');
				callbackFunction();
			}
		}

		//TODO: i think it's not used anymore, but take a look at spinner action
		if (typeof(data.stashedItemId) != 'undefined' && typeof(data.stashedItemContent) != 'undefined')
		{
			putItemToStash(data);
		}

		if (typeof(data.friendlyTurn) != 'undefined' && data.friendlyTurn === true)
		{
			//TODO: what is the meaning of this?
			setTimeout(function(){actionOnPolygon(null, jQuery('#testEnemy'));}, 350);
		}
	}
}

function handleAttackPolygon(polygon, unit, data)
{
	//TODO: make sure that it is not possible to do actions when enemy is doing stuff

	let targetUnit = jQuery('#' + polygon.data('unit'));

	let damageDealt = 0;
	if (typeof(data.damageDealt) != 'undefined')
	{
		let hitType = null;
		if (typeof(data.type) != 'undefined')
		{
			hitType = data.type;
		}

		damageDealt = data.damageDealt;
		addDamageIndicator(targetUnit, damageDealt, hitType)
	}
	window.turmoil.logCombat('Unit ' + unit.attr('id') + ' attacks unit ' + polygon.data('unit') + ' on ' + polygon.attr('id') + ' dealing ' + damageDealt + ' damage');

	if (typeof(data.healthBar) != 'undefined')
	{
		jQuery('#' + polygon.data('unit') + 'Health').css('width', data.healthBar);
	}

	let effect = jQuery('#' + targetUnit.attr('id') + 'Effect');
	effect.addClass('attackSwing');
	playAudio('soundAttackMelee' + randomInt(3));

	setTimeout(function(){effect.removeClass('attackSwing');}, 500);
}

function animateToTop(id)
{
	let element = jQuery('#' + id);
	if (element.length > 0)
	{
		let direction = 1;
		if (element.data('direction') === 2)
		{
			direction = -1;
		}
		element.css('top', '-=2px');
		if (direction !== 0)
		{
			element.css('left', '-=' + element.data('variable') + 'px');
			if (element.data('variable') > 5)
			{
				element.data('variable', element.data('variable') + 0.05 * direction);
			}
			else
			{
				element.data('variable', element.data('variable') + 0.1 * direction);
			}
		}
		setTimeout(function(){animateToTop(id);}, 25);
	}
}

function animateIndicator(id)
{
	let element = jQuery('#' + id);
	element.data('variable', 0);
	element.data('direction', randomInt(2));
	animateToTop(id);
	element.fadeTo(2000, 0.0, function () {
		element.remove();
	});
}

function addDamageIndicator(unit, value, type)
{
	let ident = 'indicator_' + new Date().getTime();
	let styleClass = 'damageIndicator';

	if (typeof(type) != 'undefined')
	{
		styleClass += ' ';
		switch (type)
		{
			case 'critical':
			{
				styleClass += 'damageIndicatorCritical';
				break;
			}
			case 'devastate':
			{
				styleClass += 'damageIndicatorDevastate';
				break;
			}
			case 'healing':
			{
				styleClass += 'damageIndicatorHealing';
				break;
			}
		}
	}

	let damageIndicator = '<div id="' + ident + '" class="' + styleClass + '">' + value + '</div>';
	unit.prepend(damageIndicator);
	animateIndicator(ident);
}

jQuery(function() {

	jQuery(".instancePolygon").click(function() {
		let polygon = jQuery(this);
		actionOnPolygon(polygon);
	});

	jQuery(".flatSubMenu").mouseenter(function() {
		resetZIndex();
	});

	activeUnit = jQuery('#testElement');
});