import jQuery from "jquery";
import {hideAllTooltips} from "./turmoil-tooltip"
import {centerContentVertically, centerContentHorizontally} from "./turmoil-general"

let windowSizes = {};

export function initWindow(windowType, isScalable)
{
	let isVisible = false;
	let scale;
	let verticalPos;
	let horizontalPos;

	if (typeof(window.turmoil.windowSettings[windowType]) == 'undefined')
	{
		window.turmoil.windowSettings[windowType] = {};
	}
	else
	{
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
			hideAllTooltips();
		},
		stop: function() {
			hideAllTooltips();

			window.turmoil.windowSettings[windowType].left = windowResizer.css('left');
			window.turmoil.windowSettings[windowType].top = windowResizer.css('top');
			saveWindowsPositions();
		}
	});

	windowResizer.resizable({
		aspectRatio: true,
		helper: "ui-resizable-helper",
		start: function() {
			hideAllTooltips();
		},
		stop: function() {
			hideAllTooltips();

			let keyWidth = windowType + 'Width';
			if (isScalable && windowSizes[keyWidth] !== 0)
			{
				let scale = jQuery("#window_" + windowType + "_resizer").width() / windowSizes[keyWidth];

				let windowWrapper = jQuery("#window_" + windowType + "_wrapper");
				windowWrapper.css('transform', 'scale(' + scale +')');
				windowWrapper.css('-webkit-transform', 'scale(' + scale +')');
				windowWrapper.css('-moz-transform', 'scale(' + scale +')');
				windowWrapper.css('-o-transform', 'scale(' + scale +')');

				// var positionFix = (jQuery("#window_" + windowType + "_resizer").width() - windowSizes[keyWidth]) / 2;
				// console.log('positionFix', positionFix);
				// jQuery("#window_" + windowType + "_wrapper").css('top', positionFix + 'px');

				// fixing the horizontal alignment
				fixHorizontalAlignment('window_' + windowType + '_resizer', 'window_' + windowType + '_wrapper');

				// TODO: save changes with ajax

				window.turmoil.windowSettings[windowType].scale = scale;
				saveWindowsPositions();
			}
		}
	});

	if (typeof(isVisible) != 'undefined' && isVisible)
	{
		if (typeof(verticalPos) == 'undefined' || typeof(horizontalPos) == 'undefined')
		{
			resizeToDefault(windowType, true)
		}
		else
		{
			windowResizer.css('left', window.turmoil.windowSettings[windowType].left);
			windowResizer.css('top', window.turmoil.windowSettings[windowType].top);
			actionShow(windowType);
		}
	}
	else
	{
		actionClose(windowType);
	}

	// TODO: check if it is not out of bounds
	windowResizer.css('top', verticalPos + 'px');
	windowResizer.css('left', horizontalPos + 'px');
}

// fixing the horizontal alignment
function fixHorizontalAlignment(parentId, childId)
{
	let parent = jQuery("#" + parentId);
	let child = jQuery("#" + childId);

	child.css('left', '0px');

	let properLeftPosition = parent.get(0).getBoundingClientRect().left;
	let wrongLeftPosition = child.get(0).getBoundingClientRect().left;
	let newPosition = Math.round(properLeftPosition - wrongLeftPosition);

	child.css('left', newPosition + 'px');
}

export function resizeToDefault(windowType, setToCenter)
{
	// TODO: check if it is necessary (and possible) to move the window higher (so it would not go over the footer)

	actionMaximize(windowType, setToCenter);

	jQuery("#window_" + windowType + "_minimizer").show();

	let keyWidth = windowType + 'Width';
	let keyHeight = windowType + 'Height';
	let fullHeight = Math.round(windowSizes[keyHeight] + 40);

	let windowResizer = jQuery("#window_" + windowType + "_resizer");
	windowResizer.css('width', windowSizes[keyWidth] + 'px');
	windowResizer.css('height', fullHeight + 'px');

	let scale = 1;
	let windowWrapper = jQuery("#window_" + windowType + "_wrapper");
	windowWrapper.css('transform', 'scale(' + scale +')');
	windowWrapper.css('-webkit-transform', 'scale(' + scale +')');
	windowWrapper.css('-moz-transform', 'scale(' + scale +')');
	windowWrapper.css('-o-transform', 'scale(' + scale +')');

	window.turmoil.windowSettings[windowType].scale = scale;

	// fixing the horizontal alignment
	fixHorizontalAlignment('window_' + windowType + '_resizer', 'window_' + windowType + '_wrapper');

	return false;
}

export function actionClose(windowType)
{
	hideAllTooltips();

	jQuery('#window_' + windowType + '_resizer').hide();
	window.turmoil.windowSettings[windowType].visible = false;

	saveWindowsPositions();
}

function actionShow(windowType)
{
	hideAllTooltips();
	bringToTheTop(windowType);

	jQuery('#window_' + windowType + '_resizer').show();
	window.turmoil.windowSettings[windowType].visible = true;

	saveWindowsPositions();
}

export function actionMaximize(windowType, setToCenter)
{
	// TODO: check if it is necessary (and possible) to move the window higher (so it would not go over the footer)

	actionShow(windowType);

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

	if (typeof(setToCenter) != 'undefined' && setToCenter === true)
	{
		centerContentVertically(windowResizer);
		centerContentHorizontally(windowResizer);

		window.turmoil.windowSettings[windowType].left = windowResizer.css('left');
		window.turmoil.windowSettings[windowType].top = windowResizer.css('top');
	}
}

export function actionMinimize(windowType)
{
	hideAllTooltips();

	jQuery('#window_' + windowType + '_content_wrapper').hide();
	jQuery('#' + windowType + 'ButtonMaximize').show();
	jQuery('#' + windowType + 'ButtonMinimize').hide();

	let handleContainer = jQuery('#handle_' + windowType + '_container');
	let handleHeight = handleContainer.get(0).getBoundingClientRect().bottom - handleContainer.get(0).getBoundingClientRect().top;
	jQuery('#window_' + windowType + '_resizer').height(Math.round(handleHeight));
}

export function switchShowClose(windowType, setToCenter)
{
	if (jQuery('#window_' + windowType + '_content_wrapper').is(":visible"))
	{
		actionClose(windowType);
	}
	else
	{
		if (typeof(window.turmoil.windowSettings[windowType]) == 'undefined'
			|| typeof(window.turmoil.windowSettings[windowType].left) == 'undefined'
			|| typeof(window.turmoil.windowSettings[windowType].top) == 'undefined')
		{
			resizeToDefault(windowType, setToCenter);
		}
		else
		{
			actionShow(windowType);
		}
	}
}

export function switchMinimizeMaximize(windowType)
{
	if (jQuery('#window_' + windowType + '_content_wrapper').is(":visible"))
	{
		actionMinimize(windowType);
	}
	else
	{
		actionMaximize(windowType);
	}
}

export function bringToTheTop(windowType)
{
	hideAllTooltips();

	let highestZIndexValue = 0;
	jQuery('.windowResizer').each(function(index) {
		if (jQuery(this).css('z-index') > highestZIndexValue)
		{
			highestZIndexValue = parseInt(jQuery(this).css('z-index'));
		}
	});

	jQuery('#window_' + windowType + '_resizer').css('z-index', ++highestZIndexValue);
}

export function resetZIndex()
{
	jQuery('.windowResizer').each(function(index) {
		jQuery(this).css('z-index', 0);
	});
}

function saveWindowsPositions(forceSave)
{
	if (typeof(forceSave) == 'undefined')
	{
		forceSave = false;
	}

	localStorage.setItem('windowSettings', JSON.stringify(window.turmoil.windowSettings));

	// window.turmoil.ajax.exec({
	// 	url: 'account/saveWindowsSettings/' + encodeURI(JSON.stringify(window.turmoil.windowSettings))
	// });

	console.log("window settings from save", window.turmoil.windowSettings);

	// + '&save=' + forceSave
}