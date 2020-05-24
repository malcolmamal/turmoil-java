import jQuery from "jquery";
import "jquery-mousewheel";
import "malihu-custom-scrollbar-plugin";
import "malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css";
import soundMoveLeather from "../media/audio/move_leather.wav";
import soundAttackMelee1 from "../media/audio/attack_melee_001.wav";
import soundAttackMelee2 from "../media/audio/attack_melee_002.wav";
import soundAttackMelee3 from "../media/audio/attack_melee_003.wav";
import {initWindow, resetZIndex} from "./turmoil-windows";

window.turmoil.sounds = {
	'soundMoveLeather': soundMoveLeather,
	'soundAttackMelee1': soundAttackMelee1,
	'soundAttackMelee2': soundAttackMelee2,
	'soundAttackMelee3': soundAttackMelee3,
};

/**
 * window.turmoil.ajax.exec({
 *		url: 'controller/action/id',
 *		onSuccess: someFunction
 * });
 *
 * @type {{baseUrl: string, exec: exec}}
 */

window.baseUrl = 'http://localhost:8080/';
window.turmoil.ajax = {

	debugInfo: '',
	exec: function()
	{
		if (arguments.length === 1)
		{
			let params = arguments[0];
			if (typeof(params.url) !== 'undefined')
			{
				let dataString = null;
				if (typeof(params.args) !== 'undefined')
				{
					jQuery.each(params.args, function(name, value) {
						dataString += "&arg[" + name + "]=" + value;
					});
				}

				showSpinner();
				jQuery.ajax({
					type: "GET",
					crossDomain: true,
					dataType: 'json',
					timeout: 3000,
					url: window.baseUrl + params.url,
					data: dataString,
					//dataType:"script",
					success: function(data, textStatus, xhr) {
						if (textStatus === 'success')
						{
							if (typeof(params.eval) !== 'undefined' && params.eval === true) {
								eval(data);
							}

							if (typeof(params.onSuccess) !== 'undefined') {

								if (typeof(params.onSuccessThis) !== 'undefined') {
									params.onSuccess(data, params.onSuccessThis);
								}
								else {
									params.onSuccess(data);
								}
							}
						}
						else if (window.debug)
						{
							console.log('Ajax error', textStatus, params.url, data);
						}
						hideSpinner();
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						handleAjaxError(XMLHttpRequest.responseText, errorThrown, textStatus);
					},
					complete: function(xhr, textStatus) {
						//console.log('complete', xhr.status);
						//console.log('complete url', window.baseUrl + params.url);
					}
				});
			}
			else
			{
				if (window.debug)
				{
					console.log('Missing url param for ajax call');
				}
			}
		}
		else
		{
			if (window.debug)
			{
				console.log('Missing arguments for ajax call');
			}
		}
	}
};

function handleAjaxError(responseText, errorThrown, status)
{
	if (typeof responseText === 'undefined')
	{
		responseText = status;
	}

	jQuery('#error').html(responseText);
	if (window.debug)
	{
		console.log('Error in ajax call', errorThrown);
		window.turmoil.ajax.debugInfo = responseText;

		if (window.debugPopup)
		{
			jQuery('#modalContent').html(responseText);
			window.modal.style.display = "block";
		}
	}

	hideSpinner();
}

export function randomInt(max)
{
	return Math.floor((Math.random() * max) + 1);
}

export function playAudio(audio)
{
	let sound = new Audio(window.turmoil.sounds[audio]);
	sound.load();
	sound.play();
}

export function playAudioLoop(audio, suffix)
{
	let ident = audio + '_' + suffix;
	let sound = new Audio(window.turmoil.sounds[audio]);
	window.turmoil.soundLoops[ident] = sound;
	window.turmoil.soundLoops[ident + '_loop'] = true;

	sound.load();
	sound.addEventListener('ended', function() {
		if (window.turmoil.soundLoops[ident + '_loop'])
		{
			this.currentTime = 0;
			this.play();
		}
	}, false);
	sound.play();
}

export function stopAudioLoop(audio, suffix)
{
	let ident = audio + '_' + suffix;
	if (typeof(window.turmoil.soundLoops[ident]) != 'undefined')
	{
		let sound = window.turmoil.soundLoops[ident];
		//TODO: handle promises: https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
		sound.pause();
		window.turmoil.soundLoops[ident + '_loop'] = false;
	}
}

function isVerticalScrollPresent()
{
	// currently disabled
	return false;
	//return (document.documentElement.scrollHeight !== document.documentElement.clientHeight);
}

function setProperContentHeight()
{
	let turmoilBody = jQuery('#turmoilBody');
	let turmoilFooter = jQuery('#turmoilFooter');
	let newFooterPosition;
	if (isVerticalScrollPresent())
	{
		// making sure the footer is always at the bottom
		// however there is a problem, if somehow the scroll appears and the footer is moved to the bottom, there is no way to undo the changes currently
		// perhaps going through all the windows and checking bottom positions and comparing to the visible content height would yield some results (changing height if possible)
		// alternatively the scroll could just be disabled (not sure if the mouse scrolling would be still possible then or if that could be disabled as well)
		newFooterPosition = Math.round(document.documentElement.scrollHeight - turmoilFooter.height());
	}
	else
	{
		newFooterPosition = Math.round(jQuery(window).height() - turmoilFooter.height());
	}
	turmoilFooter.css('top', newFooterPosition + 'px');

	let headerPosition = document.getElementById("turmoilHeader").getBoundingClientRect().bottom;
	let footerPosition = document.getElementById("turmoilFooter").getBoundingClientRect().top;
	let contentHeight = Math.round(footerPosition - headerPosition - 2);

	turmoilBody.css('height', contentHeight + 'px');

	let tallContentContainer = jQuery('.tallContentContainer');
	if (tallContentContainer.length)
	{
		let tallContainerHeight = turmoilBody.height() - 25;
		tallContentContainer.height(tallContainerHeight);
	}
}

function addEvent(element, type, eventHandle)
{
	if (element == null || typeof(element) == 'undefined')
	{
		return;
	}

	if (element.addEventListener)
	{
		element.addEventListener(type, eventHandle, false);
	}
	else if (element.attachEvent)
	{
		element.attachEvent("on" + type, eventHandle);
	}
	else
	{
		element["on" + type] = eventHandle;
	}
}

function resizeEvent()
{
	setLayout();
}

function setCenteredContent()
{
	centerContentVertically(jQuery('#centeredContentWrapper'));
}

export function centerContentVertically(centeredContentWrapper)
{
	if (centeredContentWrapper.length)
	{
		let parentOffset = 0;
		if (centeredContentWrapper.parent().length)
		{
			parentOffset = centeredContentWrapper.parent().get(0).getBoundingClientRect().top;
		}
		let halfOfContentHeight = Math.round((centeredContentWrapper.get(0).getBoundingClientRect().bottom - centeredContentWrapper.get(0).getBoundingClientRect().top) / 2);
		let halfOfWindowHeight = Math.round(jQuery(window).height() / 2);

		let topPosition = halfOfWindowHeight - halfOfContentHeight - parentOffset;
		if (topPosition < 0)
		{
			topPosition = 0;
		}

		centeredContentWrapper.css('top', topPosition + 'px')
	}
}

export function centerContentHorizontally(centeredContentWrapper)
{
	if (centeredContentWrapper.length)
	{
		let parentOffset = 0;
		if (centeredContentWrapper.parent().length)
		{
			parentOffset = centeredContentWrapper.parent().get(0).getBoundingClientRect().left;
		}
		let halfOfContentWidth = Math.round((centeredContentWrapper.get(0).getBoundingClientRect().right - centeredContentWrapper.get(0).getBoundingClientRect().left) / 2);
		let halfOfWindowWidth = Math.round(jQuery(window).width() / 2);

		let leftPosition = halfOfWindowWidth - halfOfContentWidth - parentOffset;
		if (leftPosition < 0)
		{
			leftPosition = 0;
		}

		centeredContentWrapper.css('left', leftPosition + 'px')
	}
}

function setLayout()
{
	setProperContentHeight();
	setCenteredContent();
}

function showSpinner()
{
	jQuery('#spinner').show();
}

function hideSpinner()
{
	jQuery('#spinner').hide();
}

export function hideSpinnerWithDelay()
{
	setTimeout(function(){hideSpinner();}, 100);
}

function showAjaxError()
{
	let windowId = window.open('', 'ajaxError', 'height=900, width=1600');
	windowId.document.write(window.turmoil.ajax.debugInfo);
	windowId.focus();

	hideSpinnerWithDelay();
}

jQuery(function() {

	setLayout();

	addEvent(window, "resize", resizeEvent);

	/**
	 * TODO: maybe replace it with https://scotch.io/tutorials/implementing-smooth-scrolling-in-react
	 */
	let scrollableContainer = jQuery('.scrollableContainer');
	if (scrollableContainer.length)
	{
		if (jQuery.isFunction(jQuery().mCustomScrollbar))
		{
			scrollableContainer.mCustomScrollbar({theme:'dark'});
		}
		else if (window.debug)
		{
			console.log('scrollableContainer found, but custom-scrollbar module is not active...')
		}
	}

	jQuery(".flatSubMenu").mouseenter(function() {
		resetZIndex();
	});

	jQuery.each(jQuery('.flatMenu').find('li'), function(index, value) {jQuery(value).click(function(){showSpinner();});})

	initWindow('console', true);
	initWindow('instance', true);
	initWindow('equipment', true);
	initWindow('stash', true);
	initWindow('stats', true);

	initWindow('location', true);

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
