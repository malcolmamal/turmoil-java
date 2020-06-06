import jQuery from "jquery";
import {Utils} from "./turmoil-utils";

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
	}
}
