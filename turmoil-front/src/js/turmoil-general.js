import jQuery from "jquery";
import moment from "moment";
import "jquery-mousewheel";
import "malihu-custom-scrollbar-plugin";
import "malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css";
import soundMoveLeather from "../media/audio/move_leather.wav";
import soundAttackMelee1 from "../media/audio/attack_melee_001.wav";
import soundAttackMelee2 from "../media/audio/attack_melee_002.wav";
import soundAttackMelee3 from "../media/audio/attack_melee_003.wav";

window.debug = true;
window.debugPopup = true;

window.turmoil = {};

window.turmoil.sounds = {
	'soundMoveLeather': soundMoveLeather,
	'soundAttackMelee1': soundAttackMelee1,
	'soundAttackMelee2': soundAttackMelee2,
	'soundAttackMelee3': soundAttackMelee3,
};

window.turmoil.soundLoops = {};
window.turmoil.windowSettings = localStorage.getItem('windowSettings') === null ? {} : JSON.parse(localStorage.getItem('windowSettings'));

window.turmoil.lastLogDate = null;
window.turmoil.log = function(content, target)
{
	if (typeof(target) == 'undefined')
	{
		target = 'all';
	}

	var consoleTarget = jQuery('#console-' + target);
	if (consoleTarget.length > 0)
	{
		var currentDate;
		if (typeof(moment) == 'function')
		{
			currentDate = moment().format("YYYY-MM-DD HH:mm:ss.SSS");
		}
		else
		{
			currentDate = getCurrentDateTime();
		}
		currentDate = '[' + currentDate + '] ';

		var currentDateObject = new Date();
		if (window.turmoil.lastLogDate != null)
		{
			var difference = currentDateObject.getTime() - window.turmoil.lastLogDate.getTime();
			currentDate += ' (' + difference + 'ms) ';
		}

		consoleTarget.find('.mCSB_container').prepend(currentDate + content + '<br>');

		if (target !== 'all')
		{
			jQuery('#console-all').find('.mCSB_container').prepend(currentDate + content + '<br>');
		}

		window.turmoil.lastLogDate = currentDateObject;
	}
	else
	{
		console.log('[' + target + ']', content);
	}
};

window.turmoil.logDebug = function(content)
{
	var caller = '';
	if (typeof(arguments) == 'object')
	{
		if (typeof(this.callee) == 'function' && typeof(this.callee.name) == 'string') {
			caller = this.callee.name + '() - ';
		}
	}
	window.turmoil.log(caller + content, 'all');
	console.log('[debug]', caller + content);
};

window.turmoil.logCombat = function(content)
{
	window.turmoil.log(content, 'combat');
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
	//baseUrl: '/turmoil/',
	exec: function()
	{
		if (arguments.length === 1)
		{
			var params = arguments[0];
			if (typeof(params.url) !== 'undefined')
			{
				var dataString = null;
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
						handleAjaxError(XMLHttpRequest.responseText, errorThrown);
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

function handleAjaxError(responseText, errorThrown)
{
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

function getCurrentDateTime()
{
	let currentDate = new Date();
	return currentDate.toJSON().slice(0,10) + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds() + '.' + currentDate.getMilliseconds();
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
	let sound = new Audio(window.turmoil.sounds[audio]); //document.getElementById(audio);
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
	var turmoilBody = jQuery('#turmoilBody');
	var turmoilFooter = jQuery('#turmoilFooter');
	var newFooterPosition;
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

	var headerPosition = document.getElementById("turmoilHeader").getBoundingClientRect().bottom;
	var footerPosition = document.getElementById("turmoilFooter").getBoundingClientRect().top;
	var contentHeight = Math.round(footerPosition - headerPosition - 2);

	turmoilBody.css('height', contentHeight + 'px');

	var tallContentContainer = jQuery('.tallContentContainer');
	if (tallContentContainer.length)
	{
		var tallContainerHeight = turmoilBody.height() - 25;
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
		var parentOffset = 0;
		if (centeredContentWrapper.parent().length)
		{
			parentOffset = centeredContentWrapper.parent().get(0).getBoundingClientRect().top;
		}
		var halfOfContentHeight = Math.round((centeredContentWrapper.get(0).getBoundingClientRect().bottom - centeredContentWrapper.get(0).getBoundingClientRect().top) / 2);
		var halfOfWindowHeight = Math.round(jQuery(window).height() / 2);

		var topPosition = halfOfWindowHeight - halfOfContentHeight - parentOffset;
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
		var parentOffset = 0;
		if (centeredContentWrapper.parent().length)
		{
			parentOffset = centeredContentWrapper.parent().get(0).getBoundingClientRect().left;
		}
		var halfOfContentWidth = Math.round((centeredContentWrapper.get(0).getBoundingClientRect().right - centeredContentWrapper.get(0).getBoundingClientRect().left) / 2);
		var halfOfWindowWidth = Math.round(jQuery(window).width() / 2);

		var leftPosition = halfOfWindowWidth - halfOfContentWidth - parentOffset;
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
	var windowId = window.open('', 'ajaxError', 'height=900, width=1600');
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
	var scrollableContainer = jQuery('.scrollableContainer');
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

	jQuery.each(jQuery('.flatMenu').find('li'), function(index, value) {jQuery(value).click(function(){showSpinner();});})

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