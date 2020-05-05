import jQuery from "jquery";
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/resizable";

import {resetZIndex} from '../js/turmoil-windows';
import {stopAudioLoop, playAudio, playAudioLoop, randomInt} from '../js/turmoil-general';
import {putItemToStash} from '../js/turmoil-start';

function svgAddClass(element, className)
{
	var newClasses = '';
	var hasClass = false;
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
	var newClasses = '';
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
	var hasClass = false;
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

var initialPolygonMove = true;
var activeUnit = null;

function getPolygonForUnit(unit)
{
	return jQuery('#' + jQuery(unit).data('previousPolygonId'));
}

export function actionOnUnit(unit)
{
	jQuery(unit).hasClass('enemyUnit')
	{
		var polygon = jQuery(getPolygonForUnit(unit));
		var url = 'account/instanceAttack/' + polygon.attr('id');

		if (svgHasClass(polygon, 'instancePolygonEnemy'))
		{
			window.turmoil.ajax.exec({
				url: url,
				onSuccess: finalizeActionOnPolygon
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

	var url = 'account/';
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

function handleMoveToPolygon(polygon, unit)
{
	window.turmoil.log('Unit ' + unit.attr('id') + ' moves to ' + polygon.attr('id'));

	if (unit.data('previousPolygonId') != null)
	{
		var previousPolygon = jQuery('#' + unit.data('previousPolygonId'));

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

	var offsetContainer = jQuery('#instanceContainer').offset();
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

	var offset = polygon.offset();
	if (typeof offset == 'undefined')
	{
		console.log('offset undefined');
		return;
	}

	var width = polygon.width();
	var height = polygon.height();

	var centerX = offset.left + width / 2 - offsetContainer.left + 17;
	var centerY = offset.top + height / 2 - offsetContainer.top + 17;

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
	//jQuery('#testElement').css('left', centerX);
	//jQuery('#testElement').css('top', centerY);

	unit.data('previousPolygonId', polygon.attr('id'));
	polygon.data('unit', unit.attr('id'));
}

function finalizeActionOnPolygon(data)
{
	if (data != null && data.success === true && typeof(data.polygonId) != 'undefined')
	{
		var unit = activeUnit;

		var polygon = jQuery('#' + data.polygonId);
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
			handleMoveToPolygon(jQuery('#' + data.newEnemyPosition), jQuery('#testEnemy'));
		}

		if (typeof(data.stashedItemId) != 'undefined' && typeof(data.stashedItemContent) != 'undefined')
		{
			putItemToStash(data);
		}

		if (typeof(data.friendlyTurn) != 'undefined' && data.friendlyTurn === true)
		{
			setTimeout(function(){actionOnPolygon(null, jQuery('#testEnemy'));}, 350);
		}
	}
}

function handleAttackPolygon(polygon, unit, data)
{
	var targetUnit = jQuery('#' + polygon.data('unit'));

	var damageDealt = 0;
	if (typeof(data.damageDealt) != 'undefined')
	{
		var hitType = null;
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

	var effect = jQuery('#' + targetUnit.attr('id') + 'Effect');
	effect.addClass('attackSwing');
	playAudio('soundAttackMelee' + randomInt(3));

	setTimeout(function(){effect.removeClass('attackSwing');}, 500);
}

function animateToTop(id)
{
	var element = jQuery('#' + id);
	if (element.length > 0)
	{
		var direction = 1;
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
	var element = jQuery('#' + id);
	element.data('variable', 0);
	element.data('direction', randomInt(2));
	animateToTop(id);
	element.fadeTo(2000, 0.0, function () {
		element.remove();
	});
}

function addDamageIndicator(unit, value, type)
{
	var ident = 'indicator_' + new Date().getTime();
	var styleClass = 'damageIndicator';

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

	var damageIndicator = '<div id="' + ident + '" class="' + styleClass + '">' + value + '</div>';
	unit.prepend(damageIndicator);
	animateIndicator(ident);
}

jQuery(function() {
	handleMoveToPolygon(jQuery('#polygon-1-4'), jQuery('#testElement'));
	handleMoveToPolygon(jQuery('#polygon-8-3'), jQuery('#testEnemy'));

	jQuery(".instancePolygon").click(function() {
		var polygon = jQuery(this);
		actionOnPolygon(polygon);
	});

	jQuery(".flatSubMenu").mouseenter(function() {
		resetZIndex();
	});

	activeUnit = jQuery('#testElement');
});