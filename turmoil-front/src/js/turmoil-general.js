import jQuery from "jquery";
import "jquery-mousewheel";
import "malihu-custom-scrollbar-plugin";
import "malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css";

import {Windows} from "./turmoil-windows";
import {Layout} from "./turmoil-layout";
import {Utils} from "./turmoil-utils";

jQuery(function() {
	Layout.setLayout();
	Utils.addEvent(window, "resize", Layout.resizeEvent);

	/**
	 * TODO: maybe replace it with https://scotch.io/tutorials/implementing-smooth-scrolling-in-react
	 */
	let scrollableContainer = jQuery('.scrollableContainer');
	if (scrollableContainer.length) {
		if (jQuery.isFunction(jQuery().mCustomScrollbar)) {
			scrollableContainer.mCustomScrollbar({theme:'dark'});
		} else if (window.debug)
		{
			console.log('scrollableContainer found, but custom-scrollbar module is not active...')
		}
	}

	jQuery(".flatSubMenu").mouseenter(function() {
		Windows.resetZIndex();
	});

	jQuery.each(jQuery('.flatMenu').find('li'), function(index, value) {
		jQuery(value).click(function() {
			Layout.showSpinner();
		});
	});

	Windows.initWindow('console', true);
	Windows.initWindow('instance', true);
	Windows.initWindow('equipment', true);
	Windows.initWindow('stash', true);
	Windows.initWindow('stats', true);
	Windows.initWindow('location', true);

	// TODO: handle browser window resize
});

if (typeof jQuery !== 'undefined') {
	(function($) {
		$('#spinner').ajaxStart(function() {
			$(this).fadeIn();
		}).ajaxStop(function() {
			$(this).fadeOut();
		});
	})(jQuery);
}
