import jQuery from "jquery";
import {randomInt} from "./turmoil-general";

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

export function animateIndicator(id)
{
	let element = jQuery('#' + id);
	element.data('variable', 0);
	element.data('direction', randomInt(2));
	animateToTop(id);
	element.fadeTo(2000, 0.0, function () {
		element.remove();
	});
}

export function blink(element)
{
	jQuery(element).fadeTo(1000, 0.4, function() {
		jQuery(this).fadeTo(750, 0.9, function() {
			blink(this);
		});
	});
}
