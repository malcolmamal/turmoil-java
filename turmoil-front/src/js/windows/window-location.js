import jQuery from "jquery";
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/resizable";
import {Sound} from '../core/turmoil-sound';
import {Svg} from "../core/turmoil-svg";
import {Animations} from "../core/turmoil-animations";
import {Ajax} from "../core/turmoil-ajax";
import {Utils} from "../core/turmoil-utils";

export let WindowLocation = {
	getPolygonForUnit: function (unit) {
		return jQuery('#' + jQuery(unit).data('previousPolygonId'));
	},
	actionOnPolygon: function (polygon, unit, callbacks) {
		if (typeof(polygon) == 'undefined' || polygon == null) {
			window.turmoil.logDebug('wrong polygon parameter', arguments);

			return;
		}

		Ajax.exec({
			url: 'instance/instanceActionOnPosition/' + polygon.attr('id'),
			onSuccess: WindowLocation.finalizeActionsOnPolygon,
			onSuccessThis: callbacks
		});
	},
	actionOnUnit: function (unitId, callbacks)
	{
		let unit = jQuery('#' + unitId);
		let polygon = jQuery(WindowLocation.getPolygonForUnit(unit));

		return WindowLocation.actionOnPolygon(polygon, unit, callbacks);
	},
	handleMoveToPolygon: function (polygon, unit) {
		Sound.playAudioLoop('soundMoveLeather', unit.attr('id'));

		if (unit.data('previousPolygonId') != null) {
			let previousPolygon = jQuery('#' + unit.data('previousPolygonId'));

			Svg.addClass(previousPolygon, 'instancePolygon');
			if (unit.hasClass('enemyUnit')) {
				Svg.removeClass(previousPolygon, 'instancePolygonEnemy');
			}
			else {
				Svg.removeClass(previousPolygon, 'instancePolygonActive');
			}
			previousPolygon.data('unit', '');
		}

		let offsetContainer = jQuery('#locationContainer').offset();
		if (typeof offsetContainer == 'undefined') {
			console.log('offsetContainer undefined');
			return;
		}

		if (typeof polygon == 'undefined') {
			console.log('polygon undefined');
			return;
		}

		let offset = polygon.offset();
		if (typeof offset == 'undefined') {
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
				if (unit.hasClass('enemyUnit')) {
					Svg.addClass(polygon, 'instancePolygonEnemy');
				}
				else {
					Svg.addClass(polygon, 'instancePolygonActive');
				}
				Svg.removeClass(polygon, 'instancePolygon');
				Sound.stopAudioLoop('soundMoveLeather', unit.attr('id'));

				if (window.turmoil.activeUnit.attr('id') === unit.attr('id'))
				{
					Animations.blink('#' + unit.attr('id'));
				}
			}
		);

		unit.data('previousPolygonId', polygon.attr('id'));
		polygon.data('unit', unit.attr('id'));
	},
	finalizeActionsOnPolygon: function (data, callbackFunctions) {
		data.actions.forEach(function (action, index) {
			setTimeout(function() {
				WindowLocation.finalizeActionOnPolygon(action, callbackFunctions);
			}, 400 * index
			);
		});
	},
	finalizeActionOnPolygon: function (data, callbackFunctions) {
		if (data != null && data.success === true && typeof(data.polygonId) != 'undefined') {
			let unit = window.turmoil.activeUnit;

			let polygon = jQuery('#' + data.polygonId);
			if (polygon.length > 0 && typeof(data.actionType) != 'undefined') {
				if (data.actionType === 'attack') {
					if (typeof(data.attackingUnit) != 'undefined') {
						unit = jQuery('#' + data.attackingUnit);
					}
					WindowLocation.handleAttackPolygon(polygon, unit, data);
				}
				else if (data.actionType === 'move') {
					if (typeof(data.unitToMove) != 'undefined') {
						unit = jQuery('#' + data.unitToMove);
					}
					WindowLocation.handleMoveToPolygon(polygon, unit);
				}
			}

			if (typeof(data.unitToAdd) != 'undefined') {
				if (typeof(callbackFunctions) !== 'undefined' && typeof(callbackFunctions.removeEnemyUnit) === 'function') {
					callbackFunctions.removeEnemyUnit(data.unitToRemove);
					Svg.removeClass(polygon, 'instancePolygonEnemy');
					Svg.addClass(polygon, 'instancePolygon');
				}

				if (typeof(callbackFunctions) !== 'undefined' && typeof(callbackFunctions.addEnemyUnit) === 'function') {
					callbackFunctions.addEnemyUnit(data.unitToAdd);

					WindowLocation.handleMoveToPolygon(jQuery('#' + data.unitToAdd.position), jQuery('#' + data.unitToAdd.ident));
				}
			}

			if (typeof(data.itemForStash) != 'undefined') {
				if (typeof(callbackFunctions) !== 'undefined' && typeof(callbackFunctions.updateItems) === 'function') {
					callbackFunctions.updateItems(data.itemForStash);
				}
			}
		}
	},
	handleAttackPolygon: function (polygon, unit, data) {
		//TODO: make sure that it is not possible to do actions when enemy is doing stuff

		let targetUnit = jQuery('#' + polygon.data('unit'));

		let damageDealt = 0;
		if (typeof(data.damageDealt) != 'undefined') {
			let hitType = null;
			if (typeof(data.type) != 'undefined') {
				hitType = data.type;
			}

			damageDealt = data.damageDealt;
			Animations.addDamageIndicator(targetUnit, damageDealt, hitType)
		}
		window.turmoil.logCombat('Unit ' + unit.attr('id') + ' attacks unit ' + polygon.data('unit') + ' on ' + polygon.attr('id') + ' dealing ' + damageDealt + ' damage');

		if (typeof(data.healthBar) != 'undefined') {
			jQuery('#' + polygon.data('unit') + 'Health').css('width', data.healthBar);
		}

		let effect = jQuery('#' + targetUnit.attr('id') + 'Effect');
		effect.addClass('attackSwing');
		Sound.playAudio('soundAttackMelee' + Utils.randomInt(3));

		setTimeout(function() {
				effect.removeClass('attackSwing');
			},
			500
		);
	}
}
