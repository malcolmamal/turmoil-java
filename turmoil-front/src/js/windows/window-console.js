import jQuery from "jquery";
import "jquery-ui/ui/widgets/tabs";
import "jquery-mousewheel";
import "malihu-custom-scrollbar-plugin";
import "malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css";

jQuery(function() {
	jQuery("#consoleTabs").tabs();

	if (window.debug) {
		console.log('Tabs initialized...');
	}
});
