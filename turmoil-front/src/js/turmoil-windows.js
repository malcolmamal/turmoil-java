import jQuery from "jquery";
import {Tooltip} from "./turmoil-tooltip"
import {Layout} from "./turmoil-layout";

export let Windows = {
	windowSizes: {
		consoleWidth: 600,
		consoleHeight: 260,
		instanceWidth: 650,
		instanceHeight: 610,
		equipmentWidth: 800,
		equipmentHeight: 830,
		stashWidth: 500,
		stashHeight: 700,
		statsWidth: 300,
		statsHeight: 700,
		locationWidth: 850,
		locationHeight: 810
	},
	initWindow: function (windowType, isScalable) {
		let isVisible = false;
		let scale; // TODO
		let verticalPos;
		let horizontalPos;

		if (typeof(window.turmoil.windowSettings[windowType]) == 'undefined') {
			window.turmoil.windowSettings[windowType] = {};
		}
		else {
			verticalPos = window.turmoil.windowSettings[windowType].top;
			horizontalPos = window.turmoil.windowSettings[windowType].left;
			isVisible = window.turmoil.windowSettings[windowType].visible;
		}

		let windowResizer = jQuery("#window_" + windowType + "_resizer");
		windowResizer.draggable({
			handle: "#handle_" + windowType + "_container",
			containment: ".turmoilBody",
			stack: ".windowResizer",
			snap: ".windowResizer",
			snapMode: "outer",
			start: function() {
				Tooltip.hideAllTooltips();
			},
			stop: function() {
				Tooltip.hideAllTooltips();

				window.turmoil.windowSettings[windowType].left = windowResizer.css('left');
				window.turmoil.windowSettings[windowType].top = windowResizer.css('top');
				Windows.saveWindowsPositions();
			}
		});

		windowResizer.resizable({
			aspectRatio: true,
			helper: "ui-resizable-helper",
			start: function() {
				Tooltip.hideAllTooltips();
			},
			stop: function() {
				Tooltip.hideAllTooltips();

				let keyWidth = windowType + 'Width';
				if (isScalable && Windows.windowSizes[keyWidth] !== 0) {
					let scale = jQuery("#window_" + windowType + "_resizer").width() / Windows.windowSizes[keyWidth];
					Windows.setWindowScale(scale, windowType);

					// var positionFix = (jQuery("#window_" + windowType + "_resizer").width() - Windows.windowSizes[keyWidth]) / 2;
					// console.log('positionFix', positionFix);
					// jQuery("#window_" + windowType + "_wrapper").css('top', positionFix + 'px');

					// fixing the horizontal alignment
					Windows.fixHorizontalAlignment('window_' + windowType + '_resizer', 'window_' + windowType + '_wrapper');

					// TODO: save changes with ajax

					window.turmoil.windowSettings[windowType].scale = scale;
					Windows.saveWindowsPositions();
				}
			}
		});

		if (typeof(isVisible) != 'undefined' && isVisible) {
			if (typeof(verticalPos) == 'undefined' || typeof(horizontalPos) == 'undefined') {
				Windows.resizeToDefault(windowType, true)
			}
			else {
				windowResizer.css('left', window.turmoil.windowSettings[windowType].left);
				windowResizer.css('top', window.turmoil.windowSettings[windowType].top);
				Windows.actionShow(windowType);
			}
		}
		else {
			Windows.actionClose(windowType);
		}

		// TODO: check if it is not out of bounds
		windowResizer.css('top', verticalPos + 'px');
		windowResizer.css('left', horizontalPos + 'px');
	},
	setWindowScale: function (scale, windowType) {
		let windowWrapper = jQuery("#window_" + windowType + "_wrapper");
		windowWrapper.css('transform', 'scale(' + scale +')');
		windowWrapper.css('-webkit-transform', 'scale(' + scale +')');
		windowWrapper.css('-moz-transform', 'scale(' + scale +')');
		windowWrapper.css('-o-transform', 'scale(' + scale +')');
	},
	fixHorizontalAlignment:	function (parentId, childId) {
		// fixing the horizontal alignment

		let parent = jQuery("#" + parentId);
		let child = jQuery("#" + childId);

		child.css('left', '0px');

		let properLeftPosition = parent.get(0).getBoundingClientRect().left;
		let wrongLeftPosition = child.get(0).getBoundingClientRect().left;
		let newPosition = Math.round(properLeftPosition - wrongLeftPosition);

		child.css('left', newPosition + 'px');
	},
	resizeToDefault: function (windowType, setToCenter) {
		// TODO: check if it is necessary (and possible) to move the window higher (so it would not go over the footer)

		Windows.actionMaximize(windowType, setToCenter);

		jQuery("#window_" + windowType + "_minimizer").show();

		let keyWidth = windowType + 'Width';
		let keyHeight = windowType + 'Height';
		let fullHeight = Math.round(Windows.windowSizes[keyHeight] + 40);

		let windowResizer = jQuery("#window_" + windowType + "_resizer");
		windowResizer.css('width', Windows.windowSizes[keyWidth] + 'px');
		windowResizer.css('height', fullHeight + 'px');

		let scale = 1;
		Windows.setWindowScale(scale, windowType);
		window.turmoil.windowSettings[windowType].scale = scale;

		// fixing the horizontal alignment
		Windows.fixHorizontalAlignment('window_' + windowType + '_resizer', 'window_' + windowType + '_wrapper');

		return false;
	},
	actionClose: function (windowType) {
		Tooltip.hideAllTooltips();

		jQuery('#window_' + windowType + '_resizer').hide();
		window.turmoil.windowSettings[windowType].visible = false;

		Windows.saveWindowsPositions();
	},
	actionShow: function (windowType) {
		Tooltip.hideAllTooltips();
		Windows.bringToTheTop(windowType);

		jQuery('#window_' + windowType + '_resizer').show();
		window.turmoil.windowSettings[windowType].visible = true;

		Windows.saveWindowsPositions();
	},
	actionMaximize: function (windowType, setToCenter) {
		// TODO: check if it is necessary (and possible) to move the window higher (so it would not go over the footer)

		Windows.actionShow(windowType);

		let windowContentWrapper = jQuery('#window_' + windowType + '_content_wrapper');
		let windowContainer = jQuery('#handle_' + windowType + '_container');

		windowContentWrapper.show();
		jQuery('#' + windowType + 'ButtonMaximize').hide();
		jQuery('#' + windowType + 'ButtonMinimize').show();

		let handleHeight = windowContainer.get(0).getBoundingClientRect().bottom - windowContainer.get(0).getBoundingClientRect().top;
		let contentHeight = windowContentWrapper.get(0).getBoundingClientRect().bottom - windowContentWrapper.get(0).getBoundingClientRect().top;
		let totalHeight = Math.round(handleHeight + contentHeight);

		let windowResizer = jQuery('#window_' + windowType + '_resizer');
		windowResizer.height(totalHeight);

		if (typeof(setToCenter) != 'undefined' && setToCenter === true) {
			Layout.centerContentVertically(windowResizer);
			Layout.centerContentHorizontally(windowResizer);

			window.turmoil.windowSettings[windowType].left = windowResizer.css('left');
			window.turmoil.windowSettings[windowType].top = windowResizer.css('top');
		}
	},
	actionMinimize: function (windowType) {
		Tooltip.hideAllTooltips();

		jQuery('#window_' + windowType + '_content_wrapper').hide();
		jQuery('#' + windowType + 'ButtonMaximize').show();
		jQuery('#' + windowType + 'ButtonMinimize').hide();

		let handleContainer = jQuery('#handle_' + windowType + '_container');
		let handleHeight = handleContainer.get(0).getBoundingClientRect().bottom - handleContainer.get(0).getBoundingClientRect().top;
		jQuery('#window_' + windowType + '_resizer').height(Math.round(handleHeight));
	},
	switchShowClose: function (windowType, setToCenter) {
		if (jQuery('#window_' + windowType + '_content_wrapper').is(":visible")) {
			Windows.actionClose(windowType);
		}
		else {
			if (typeof(window.turmoil.windowSettings[windowType]) == 'undefined'
				|| typeof(window.turmoil.windowSettings[windowType].left) == 'undefined'
				|| typeof(window.turmoil.windowSettings[windowType].top) == 'undefined') {
				Windows.resizeToDefault(windowType, setToCenter);
			}
			else {
				Windows.actionShow(windowType);
			}
		}
	},
	switchMinimizeMaximize: function (windowType) {
		if (jQuery('#window_' + windowType + '_content_wrapper').is(":visible")) {
			Windows.actionMinimize(windowType);
		}
		else {
			Windows.actionMaximize(windowType);
		}
	},
	bringToTheTop: function (windowType) {
		Tooltip.hideAllTooltips();

		let highestZIndexValue = 0;
		jQuery('.windowResizer').each(function(index) {
			if (jQuery(this).css('z-index') > highestZIndexValue) {
				highestZIndexValue = parseInt(jQuery(this).css('z-index'));
			}
		});

		jQuery('#window_' + windowType + '_resizer').css('z-index', ++highestZIndexValue);
	},
	resetZIndex: function () {
		jQuery('.windowResizer').each(function(index) {
			jQuery(this).css('z-index', 0);
		});
	},
	saveWindowsPositions: function (forceSave) {
		if (typeof(forceSave) == 'undefined') {
			forceSave = false;
		}

		localStorage.setItem('windowSettings', JSON.stringify(window.turmoil.windowSettings));

		// window.turmoil.ajax.exec({
		// 	url: 'account/saveWindowsSettings/' + encodeURI(JSON.stringify(window.turmoil.windowSettings))
		// });

		// + '&save=' + forceSave
	},
	switchWindow: function (windowType) {
		Tooltip.hideAllTooltips();

		let resizer = jQuery('#window_' + windowType + '_resizer');
		if (resizer.is(':hidden')) {
			resizer.show();
			Windows.bringToTheTop(windowType);
		}
		else {
			resizer.hide();
		}
	}
}


jQuery(function () {

	jQuery.each(jQuery.find('.windowIcon'), function (index, value) {
		jQuery(value).draggable({
			revert: true
		});
	});

	/**
	 * TODO: fix
	 *
	 * seems to react to any key...
	 */

	/*
		jQuery(document).bind('keydown', 'i', function () {
			switchWindow('equipment')
		});
		jQuery(document).bind('keydown', 'c', function () {
			switchWindow('stats')
		});
		jQuery(document).bind('keydown', 's', function () {
			switchWindow('stash')
		});

		jQuery(document).bind('keydown', 'n', function () {
			switchWindow('instance')
		});

		jQuery(document).bind('keydown', 'o', function () {
			switchWindow('console')
		});
	*/

});
