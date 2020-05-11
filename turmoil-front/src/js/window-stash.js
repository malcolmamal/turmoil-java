import jQuery from "jquery";
import "jquery-ui/ui/widgets/sortable";

export function initializeStash()
{
	jQuery("#stashItemListContainer").sortable({
		//forceHelperSize: true,
		containment: "#stashItemContainer",
		//grid: [ 6, 3 ],
		distance: 45,
		items: "> li",
		update: function(event, ui) {
			var resultOrder = jQuery(this).sortable('toArray').toString();
			console.log(resultOrder);
		}
	});

	jQuery("#stashItemListContainer").disableSelection();
}