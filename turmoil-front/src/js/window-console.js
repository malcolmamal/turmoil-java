import jQuery from "jquery";
import "jquery-ui/ui/widgets/tabs";

jQuery(function() {
	jQuery("#consoleTabs").tabs();

	if (window.debug) {
		console.log('Tabs initialized...');
	}
});
