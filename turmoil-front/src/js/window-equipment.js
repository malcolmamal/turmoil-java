import jQuery from "jquery";
import {hideAllTooltips} from "./turmoil-tooltip";

jQuery(function () {
	let slots = [
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
});