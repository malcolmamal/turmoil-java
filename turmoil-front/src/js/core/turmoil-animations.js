import jQuery from "jquery";
import {Utils} from "./turmoil-utils";
import {Sound} from "./turmoil-sound";
import {Svg} from "./turmoil-svg";
import {WindowLocation} from "../windows/window-location";

export let Animations = {
	animateToTop: function (id) {
		let element = jQuery('#' + id);
		if (element.length > 0) {
			let direction = 1;
			if (element.data('direction') === 2) {
				direction = -1;
			}
			element.css('top', '-=2px');
			if (direction !== 0) {
				element.css('left', '-=' + element.data('variable') + 'px');
				if (element.data('variable') > 5) {
					element.data('variable', element.data('variable') + 0.05 * direction);
				}
				else {
					element.data('variable', element.data('variable') + 0.1 * direction);
				}
			}
			setTimeout(function() {
					Animations.animateToTop(id);
				},
				25
			);
		}
	},
	animateIndicator: function (id) {
		let element = jQuery('#' + id);
		element.data('variable', 0);
		element.data('direction', Utils.randomInt(2));
		this.animateToTop(id);
		element.fadeTo(2000, 0.0, function () {
			element.remove();
		});
	},
	blink: function (element) {
		jQuery(element).fadeTo(1000, 0.4, function() {
			jQuery(this).fadeTo(750, 0.9, function() {
				Animations.blink(this);
			});
		});
	},
	addDamageIndicator: function (unit, value, type) {
		let ident = 'indicator_' + new Date().getTime();
		let styleClass = 'damageIndicator';

		if (typeof(type) != 'undefined') {
			styleClass += ' ';
			switch (type) {
				case 'critical': {
					styleClass += 'damageIndicatorCritical';
					break;
				}
				case 'devastate': {
					styleClass += 'damageIndicatorDevastate';
					break;
				}
				case 'healing': {
					styleClass += 'damageIndicatorHealing';
					break;
				}
			}
		}

		let damageIndicator = '<div id="' + ident + '" class="' + styleClass + '">' + value + '</div>';
		unit.prepend(damageIndicator);
		Animations.animateIndicator(ident);
	},
	attackSwing: function (unitId) {
		let effect = jQuery('#' + unitId + 'Effect');

		//TODO: check attack type per attacking unit
		let targetUnit = jQuery('#' + unitId);

		if (window.turmoil.instance.attackType === WindowLocation.ATTACK_TYPE_BOW && targetUnit.hasClass('enemyUnit')) {
			effect.addClass('attackArrow');
			Sound.playAudio('soundAttackBow' + Utils.randomInt(3));

			setTimeout(function() {
					effect.removeClass('attackArrow');
				},
				500
			);
		}
		else {
			effect.addClass('attackSwing');
			Sound.playAudio('soundAttackMelee' + Utils.randomInt(3));

			setTimeout(function() {
					effect.removeClass('attackSwing');
				},
				500
			);
		}
	},
	moveUnit: function (unit, polygon, positionX, positionY) {
		Sound.playAudioLoop('soundMoveLeather', unit.attr('id'));

		unit.stop().animate({
				left: positionX,
				top: positionY
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

				if (window.turmoil.instance.activeUnit === unit.attr('id')) {
					Animations.blink('#' + unit.attr('id'));
				}
			}
		);
	}
}
