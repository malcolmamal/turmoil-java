import jQuery from "jquery";
import "jquery-ui/ui/widgets/sortable";

export function initializeStash()
{
	let stash = jQuery("#stashItemListContainer");
	stash.sortable({
		//forceHelperSize: true,
		containment: "#stashItemContainer",
		//grid: [ 6, 3 ],
		distance: 45,
		items: "> li",
		update: function(event, ui) {
			let resultOrder = jQuery(this).sortable('toArray').toString();
			console.log(resultOrder);
		}
	});

	stash.disableSelection();

	if (window.debug) {
		console.log('Stash initialized...');
	}
}