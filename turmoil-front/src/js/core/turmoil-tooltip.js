import jQuery from "jquery";
import "jquery-ui/ui/widgets/tooltip";
import {Ajax} from "./turmoil-ajax";
import '../../stylesheets/turmoil-tooltip.css';

export let Tooltip = {
	emptyContent: "<div id='something-_ID_'>_CONTENT_</div>",
	tooltipClass: " tooltip itemTooltip",
	tooltipContents: {},

	hideAllTooltips: function () {
		jQuery('.ui-tooltip').hide();
	},
	prepareTooltip: function prepareTooltip(id, data) {
		Tooltip.tooltipContents[id] = Tooltip.emptyContent.replace('_CONTENT_', data).replace('_ID_', id);
		jQuery('#something-' + id).html(data);
	},
	isElementVisibleOrAlreadyGone: function isElementVisibleOrAlreadyGone(element) {
		if (jQuery(element).length === 0) {
			// element is already gone so no need to do anything
			return true;
		}

		let topView = jQuery(window).scrollTop();
		let bottomView = topView + jQuery(window).height();
		let topElement = jQuery(element).offset().top;
		let bottomElement = topElement + jQuery(element).height();

		return ((bottomElement <= bottomView) && (topElement >= topView));
	},
	reopenTooltipIfNotVisible: function reopenTooltipIfNotVisible(element, tooltipId) {
		if (!Tooltip.isElementVisibleOrAlreadyGone(tooltipId)) {
			element.tooltip().mouseout();
			setTimeout(function(){ element.tooltip().mouseover(); }, 10);
		}
	},
	handleItemTooltipContent: function handleItemTooltipContent(element) {
		let ident = element.attr('data-ident');
		let type = element.attr('data-tooltip-type');

		if (type === 'monster' && !window.pressedKeys.shift) {
			return;
		}

		let content = Tooltip.emptyContent.replace('_CONTENT_', '').replace('_ID_', ident);
		if (type !== 'monster' && Tooltip.tooltipContents[ident]) {
			// TODO: low priority but it would be nice to figure out if we actually need to fetch monster tooltip every time
			content = Tooltip.tooltipContents[ident]
		}
		else {
			// hide all the other existing tooltips
			Tooltip.hideAllTooltips();

			jQuery.ajax({
				type:'POST',
				crossDomain: true,
				url: Ajax.baseUrl + 'tooltip/' + type + "/" + ident,
				success: function(data, textStatus) {
					if (textStatus === 'success') {
						Tooltip.prepareTooltip(ident, data);

						// in case the tooltip will be partially outside the viewport, it has to be closed and opened again for jqueryui to reposition the tooltip
						setTimeout(function () {
							Tooltip.reopenTooltipIfNotVisible(element, '#something-' + ident);
						}, 10);
					}
					else if (window.debug) {
						console.log('Tooltip Ajax error', textStatus, ident, data);
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					jQuery('#error').html(XMLHttpRequest.responseText);

					if (window.debug) {
						console.log('Error in ajax call', errorThrown);
					}
				}
			});

			//content = tooltipContents[id];
		}

		return content;
	}
}

jQuery(function() {
	jQuery(document).tooltip({
		items:'.tooltip',
		hide: false,
		show: false,
		tooltipClass:'fancyTooltip',
		position: { my: "left+15 top", at: "right center" },
		content: function () {
			let content;
			if (jQuery(this).hasClass('itemTooltip')) {
				content = Tooltip.handleItemTooltipContent(jQuery(this));
			}
			else {
				content = jQuery(this).prop('title');
			}

			return content;
		},
		open: function(event, ui) {
			// closing current tooltip after 20 seconds
			setTimeout(function () {
				jQuery(ui.tooltip).hide();
			}, 20000 * 100);
		}
	});

	if (window.debug) {
		console.log('Tooltip initialized...');
	}
});
