import jQuery from "jquery";

export let Layout = {
	isVerticalScrollPresent: function () {
		// currently disabled
		return false;
		//return (document.documentElement.scrollHeight !== document.documentElement.clientHeight);
	},
	setProperContentHeight: function () {
		let turmoilBody = jQuery('#turmoilBody');
		let turmoilFooter = jQuery('#turmoilFooter');
		let newFooterPosition;
		if (Layout.isVerticalScrollPresent()) {
			// making sure the footer is always at the bottom
			// however there is a problem, if somehow the scroll appears and the footer is moved to the bottom, there is no way to undo the changes currently
			// perhaps going through all the windows and checking bottom positions and comparing to the visible content height would yield some results (changing height if possible)
			// alternatively the scroll could just be disabled (not sure if the mouse scrolling would be still possible then or if that could be disabled as well)
			newFooterPosition = Math.round(document.documentElement.scrollHeight - turmoilFooter.height());
		}
		else {
			newFooterPosition = Math.round(jQuery(window).height() - turmoilFooter.height());
		}
		turmoilFooter.css('top', newFooterPosition + 'px');

		let headerPosition = document.getElementById("turmoilHeader").getBoundingClientRect().bottom;
		let footerPosition = document.getElementById("turmoilFooter").getBoundingClientRect().top;
		let contentHeight = Math.round(footerPosition - headerPosition - 2);

		turmoilBody.css('height', contentHeight + 'px');

		let tallContentContainer = jQuery('.tallContentContainer');
		if (tallContentContainer.length) {
			let tallContainerHeight = turmoilBody.height() - 25;
			tallContentContainer.height(tallContainerHeight);
		}
	},
	setCenteredContent: function () {
		Layout.centerContentVertically(jQuery('#centeredContentWrapper'));
	},
	centerContentVertically: function (centeredContentWrapper) {
		if (centeredContentWrapper.length) {
			let parentOffset = 0;
			if (centeredContentWrapper.parent().length) {
				parentOffset = centeredContentWrapper.parent().get(0).getBoundingClientRect().top;
			}
			let halfOfContentHeight = Math.round((centeredContentWrapper.get(0).getBoundingClientRect().bottom - centeredContentWrapper.get(0).getBoundingClientRect().top) / 2);
			let halfOfWindowHeight = Math.round(jQuery(window).height() / 2);

			let topPosition = halfOfWindowHeight - halfOfContentHeight - parentOffset;
			if (topPosition < 0) {
				topPosition = 0;
			}

			centeredContentWrapper.css('top', topPosition + 'px');
		}
	},
	centerContentHorizontally: function (centeredContentWrapper) {
		if (centeredContentWrapper.length) {
			let parentOffset = 0;
			if (centeredContentWrapper.parent().length) {
				parentOffset = centeredContentWrapper.parent().get(0).getBoundingClientRect().left;
			}
			let halfOfContentWidth = Math.round((centeredContentWrapper.get(0).getBoundingClientRect().right - centeredContentWrapper.get(0).getBoundingClientRect().left) / 2);
			let halfOfWindowWidth = Math.round(jQuery(window).width() / 2);

			let leftPosition = halfOfWindowWidth - halfOfContentWidth - parentOffset;
			if (leftPosition < 0) {
				leftPosition = 0;
			}

			centeredContentWrapper.css('left', leftPosition + 'px');
		}
	},
	setLayout: function () {
		Layout.setProperContentHeight();
		Layout.setCenteredContent();
	},
	showSpinner: function () {
		jQuery('#spinner').show();
	},
	hideSpinner: function () {
		jQuery('#spinner').hide();
	},
	hideSpinnerWithDelay: function () {
		setTimeout(function () {
			Layout.hideSpinner();
		}, 100);
	},
	resizeEvent: function resizeEvent() {
		Layout.setLayout();
	}
}
