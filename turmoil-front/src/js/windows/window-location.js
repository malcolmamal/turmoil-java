import jQuery from "jquery";
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/resizable";
import {Svg} from "../core/turmoil-svg";
import {Animations} from "../core/turmoil-animations";
import {Ajax} from "../core/turmoil-ajax";

export let WindowLocation = {
	ATTACK_TYPE_MELEE: "melee",
	ATTACK_TYPE_BOW: "bow",
	getPolygonForUnit: function (unit) {
		return jQuery('#' + jQuery(unit).data('previousPolygonId'));
	},
	actionOnPolygon: function (polygon, unit, callbacks) {
		if (typeof(polygon) == 'undefined' || polygon == null) {
			window.turmoil.logDebug('Wrong polygon parameter', arguments);

			return;
		}

		Ajax.exec({
			url: 'instance/instanceActionOnPosition/' + polygon.attr('id'),
			onSuccess: WindowLocation.finalizeActionsOnPolygon,
			onSuccessThis: callbacks,
			blockActions: true
		});
	},
	actionOnUnit: function (unitId, callbacks)
	{
		let unit = jQuery('#' + unitId);
		let polygon = jQuery(WindowLocation.getPolygonForUnit(unit));

		return WindowLocation.actionOnPolygon(polygon, unit, callbacks);
	},
	finalizeActionsOnPolygon: function (data, callbackFunctions) {
		WindowLocation.inactivatePolygons();

		data.actions.forEach(function (action, index, thisArray) {
			setTimeout(function() {
					WindowLocation.finalizeActionOnPolygon(action, callbackFunctions);
				},
				window.turmoil.settings.delayBetweenActions * index
			);

			if (Object.is(thisArray.length - 1, index)) {
				setTimeout(function() {
						WindowLocation.inactivateUnits();
						WindowLocation.setActivePolygons();
						WindowLocation.enableActions();
					},
					window.turmoil.settings.delayBetweenActions * index + window.turmoil.settings.delayBetweenActions / 2
				);
			}
		});
	},
	finalizeActionOnPolygon: function (data, callbackFunctions) {
		if (data != null && data.success === false) {
			window.turmoil.logErrors(data.message);
		}
		else if (data != null && data.success === true && typeof(data.polygonId) != 'undefined') {
			if (typeof(data.unit) !== 'undefined' && typeof(data.unit.polygonsInRange) !== 'undefined') {
				window.turmoil.instance.polygonsInRange = data.unit.polygonsInRange;
			}

			let polygon = jQuery('#' + data.polygonId);
			if (polygon.length > 0 && typeof(data.actionType) != 'undefined') {
				if (data.actionType === 'attack') {
					if (typeof(data.attackingUnit) == 'undefined') {
						window.turmoil.logErrors("Attack action failed");
					}
					WindowLocation.handleAttackPolygon(polygon, jQuery('#' + data.attackingUnit), data);
				}
				else if (data.actionType === 'move') {
					if (typeof(data.unitToMove) == 'undefined') {
						window.turmoil.logErrors("Move action failed");
					}
					WindowLocation.handleMoveToPolygon(polygon, jQuery('#' + data.unitToMove));
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
	handleMoveToPolygon: function (polygon, unit) {
		WindowLocation.inactivateUnits();

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
			console.log('OffsetContainer undefined');
			return;
		}

		if (typeof polygon == 'undefined') {
			console.log('Polygon undefined');
			return;
		}

		let offset = polygon.offset();
		if (typeof offset == 'undefined') {
			console.log('Offset undefined', polygon);
			return;
		}

		let width = polygon.width();
		let height = polygon.height();

		// TODO: here probably some math should be applied regarding the scale
		let centerX = offset.left + width / 2 - offsetContainer.left + 17;
		let centerY = offset.top + height / 2 - offsetContainer.top + 17;

		Animations.moveUnit(unit, polygon, centerX, centerY);

		unit.data('previousPolygonId', polygon.attr('id'));
		polygon.data('unit', unit.attr('id'));
	},
	handleAttackPolygon: function (polygon, unit, data) {
		//TODO: make sure that it is not possible to do actions when enemy is doing stuff
		WindowLocation.markUnitAsActive(unit);

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

		Animations.attackSwing(targetUnit.attr('id'));
	},
	markUnitAsActive: function (unit) {
		if (unit.hasClass('enemyUnit')) {
			WindowLocation.inactivateUnits();

			let polygon = jQuery('#' + unit.data('previousPolygonId'));
			Svg.replaceClass(polygon, 'instancePolygonEnemyActive', 'instancePolygonEnemy');
		}
	},
	inactivateUnits: function () {
		jQuery('.instancePolygonEnemyActive').each(function () {
			Svg.replaceClass(jQuery(this), 'instancePolygonEnemy', 'instancePolygonEnemyActive');
		});
	},
	setActivePolygons: function () {
		window.turmoil.instance.polygonsInRange.forEach(function (element) {
			let polygon = jQuery('#' + element);
			if (polygon.hasClass("instancePolygon")) {
				Svg.replaceClass(polygon, "instancePolygonInRange", "instancePolygon");
			}
		});
	},
	inactivatePolygons: function () {
		jQuery('.instancePolygonInRange').each(function () {
			Svg.replaceClass(jQuery(this), 'instancePolygon', 'instancePolygonInRange');
		});
	},
	enableActions() {
		window.turmoil.instance.isActive = true;
	},
	blockActions() {
		window.turmoil.instance.isActive = false;
	},
	areActionsAllowed() {
		return window.turmoil.instance.isActive;
	},
	setAttackType: function (item) {
		if (item.slot !== "slot_right_hand") {
			return;
		}

		let root = document.querySelector(':root');
		let rootStyles = getComputedStyle(root);

		if (item.itemSpecificType === "BOW") {
			root.style.setProperty('--cursor-current', rootStyles.getPropertyValue('--cursor-bow'));
			window.turmoil.instance.attackType = WindowLocation.ATTACK_TYPE_BOW;
		}
		else {
			root.style.setProperty('--cursor-current', rootStyles.getPropertyValue('--cursor-melee'));
			window.turmoil.instance.attackType = WindowLocation.ATTACK_TYPE_MELEE;
		}
	}
}
