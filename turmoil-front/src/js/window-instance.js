import jQuery from "jquery";
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/resizable";

import {stopAudioLoop, playAudio, playAudioLoop, randomInt} from './turmoil-general';
import {svgAddClass, svgHasClass, svgRemoveClass} from "./turmoil-svg";
import {animateIndicator, blink} from "./turmoil-animations";

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
		if (typeof(window.turmoil.activeUnit) == 'undefined')
		{
			window.turmoil.logDebug('there is no active unit', arguments);
		}
		unit = window.turmoil.activeUnit;
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
	//TODO: check if he has to move

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

	let offsetContainer = jQuery('#locationContainer').offset();
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
		console.log('offset undefined', polygon);
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

				//TODO: blink the active unit!
				blink('#testElement');
			}
			svgRemoveClass(polygon, 'instancePolygon');
			stopAudioLoop('soundMoveLeather', unit.attr('id'));
		}
	);

	unit.data('previousPolygonId', polygon.attr('id'));
	polygon.data('unit', unit.attr('id'));
}

function finalizeActionOnPolygon(data, callbackFunction)
{
	if (data != null && data.success === true && typeof(data.polygonId) != 'undefined')
	{
		let unit = window.turmoil.activeUnit;

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
			//TODO: dont hardcode enemy
			handleMoveToPolygon(jQuery('#' + data.newEnemyPosition), jQuery('#testEnemy1'));
		}

		if (typeof(data.itemForStash) != 'undefined')
		{
			if (typeof(callbackFunction) === 'function')
			{
				callbackFunction(data.itemForStash);
			}
		}

		if (typeof(data.friendlyTurn) != 'undefined' && data.friendlyTurn === true)
		{
			setTimeout(function(){actionOnPolygon(null, jQuery('#' + data.enemyId));}, 400);
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

	jQuery('#window_instance').disableSelection();

	if (window.debug) {
		console.log('Instance initialized...');
	}
});
