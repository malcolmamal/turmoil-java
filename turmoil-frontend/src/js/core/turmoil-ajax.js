import jQuery from "jquery";
import {Layout} from "./turmoil-layout";
import {WindowLocation} from "../windows/window-location";

/**
 * window.turmoil.ajax.exec({
 *		url: 'controller/action/id',
 *		onSuccess: someFunction
 * });
 *
 * @type {{debugInfo: string, baseUrl: string, exec: Ajax.exec}}
 */
export let Ajax = {
	debugInfo: '',
	baseUrl:  'http://localhost:8080/',
	exec: function() {
		if (arguments.length === 1) {
			let params = arguments[0];
			if (typeof(params.url) !== 'undefined') {
				let dataString = null;
				if (typeof(params.args) !== 'undefined') {
					jQuery.each(params.args, function(name, value) {
						dataString += "&arg[" + name + "]=" + value;
					});
				}

				if (typeof(params.blockActions) !== 'undefined' && params.blockActions === true) {

					if (!WindowLocation.areActionsAllowed()) {
						window.turmoil.logDebug('Actions are currently blocked', arguments);

						return;
					}

					WindowLocation.blockActions();
				}

				Layout.showSpinner();

				jQuery.ajax({
					type: "GET",
					crossDomain: true,
					dataType: 'json',
					timeout: 3000,
					url: typeof(params.fullUrl) !== 'undefined' ? params.fullUrl: Ajax.baseUrl + params.url,
					data: dataString,
					//dataType:"script",
					success: function(data, textStatus, xhr) {
						if (textStatus === 'success') {
							if (typeof(data.success) !== 'undefined' && data.success === false)
							{
								WindowLocation.enableActions();

								let requestData = params.url + (dataString != null ? '?' + dataString : '');
								Ajax.handleAjaxError(
									"<b>" + requestData + "<br><br></b>" + data.message,
									'problem with request: ' + requestData,
									textStatus
								);
							}
							else if (typeof(params.onSuccess) !== 'undefined') {

								if (typeof(params.onSuccessThis) !== 'undefined') {
									params.onSuccess(data, params.onSuccessThis);
								}
								else {
									params.onSuccess(data);
								}
							}
						}
						else if (window.debug) {
							console.log('Ajax error', textStatus, params.url, data);
						}

						Layout.hideSpinner();
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						WindowLocation.enableActions();

						Ajax.handleAjaxError(XMLHttpRequest.responseText, errorThrown, textStatus);
					},
					complete: function(xhr, textStatus) {
						//console.log('complete', xhr.status);
						//console.log('complete url', window.baseUrl + params.url);
					}
				});
			}
			else {
				if (window.debug) {
					console.log('Missing url param for ajax call');
				}
			}
		}
		else {
			if (window.debug) {
				console.log('Missing arguments for ajax call');
			}
		}
	},
	handleAjaxError: function (responseText, errorThrown, status) {
		if (typeof responseText === 'undefined') {
			responseText = status;
		}

		jQuery('#error').html(responseText);
		if (window.debug) {
			console.log('Error in ajax call', errorThrown);
			Ajax.debugInfo = responseText;

			if (window.debugPopup) {
				jQuery('#modalContent').html(responseText);
				window.modal.style.display = "block";
			}
		}

		Layout.hideSpinner();
	},
	showAjaxError: function () {
		let windowId = window.open('', 'ajaxError', 'height=900, width=1600');
		windowId.document.write(Ajax.debugInfo);
		windowId.focus();

		Layout.hideSpinnerWithDelay();
	}
};
