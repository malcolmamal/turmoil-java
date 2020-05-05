import jQuery from "jquery";
import "jquery-ui/ui/widgets/tabs";

jQuery(function() {
	jQuery("#consoleTabs").tabs();

	console.log('tabs initialized');
});