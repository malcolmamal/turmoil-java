import jQuery from "jquery";
import moment from "moment";
import "jquery-ui/themes/base/all.css";
import {Utils} from "./core/turmoil-utils";
import {Layout} from "./core/turmoil-layout";
import {Windows} from "./core/turmoil-windows";

// sounds
import soundMoveLeather from "../media/audio/move_leather.wav";
import soundAttackMelee1 from "../media/audio/attack_melee_001.wav";
import soundAttackMelee2 from "../media/audio/attack_melee_002.wav";
import soundAttackMelee3 from "../media/audio/attack_melee_003.wav";
import soundAccessoryJewellery from "../media/audio/change_bling_004.wav";
import soundMediumArmor from "../media/audio/change_medium_002.wav";
import soundWeapon from "../media/audio/change_weapon_004.wav";

window.debug = true;
window.debugPopup = true;

window.turmoil = {};

window.turmoil.equipment = {};
window.turmoil.equipment.defaultItems = {
	slot_right_hand: { slot: "slot_right_hand", top: 175, left: 90, item: {}},
	slot_left_hand: { slot: "slot_left_hand", top: 105, left: 625, item: {}},

	slot_amulet: { slot: "slot_amulet", top: 165, left: 355, item: {}, iconItemSize: "square"},
	slot_ring_one: { slot: "slot_ring_one", top: 100, left: 10, item: {}, iconItemSize: "square"},
	slot_ring_two: { slot: "slot_ring_two", top: 100, left: 705, item: {}, iconItemSize: "square"},
	slot_ring_three: { slot: "slot_ring_three", top: 175, left: 10, item: {}, iconItemSize: "square"},
	slot_ring_four: { slot: "slot_ring_four", top: 175, left: 705, item: {}, iconItemSize: "square"},

	slot_helm: { slot: "slot_helm", top: 20, left: 355, item: {}},
	slot_chest: { slot: "slot_chest", top: 245, left: 355, item: {}},
	slot_belt: { slot: "slot_belt", top: 395, left: 347, item: {}, iconItemSize: "long"},
	slot_pants: { slot: "slot_pants", top: 480, left: 355, item: {}},
	slot_boots: { slot: "slot_boots", top: 635, left: 355, item: {}},
	slot_pauldrons: { slot: "slot_pauldrons", top: 105, left: 220, item: {}},
	slot_gloves: { slot: "slot_gloves", top: 35, left: 90, item: {}},
	slot_bracers: { slot: "slot_bracers", top: 105, left: 500, item: {}}
};

window.turmoil.sounds = {
	'soundMoveLeather': soundMoveLeather,
	'soundAttackMelee1': soundAttackMelee1,
	'soundAttackMelee2': soundAttackMelee2,
	'soundAttackMelee3': soundAttackMelee3,
	'soundAccessoryJewellery': soundAccessoryJewellery,
	'soundMediumArmor': soundMediumArmor,
	'soundWeapon': soundWeapon
};

window.turmoil.soundLoops = {};
window.turmoil.soundLoopsPromises = {}; // promises: https://developers.google.com/web/updates/2017/06/play-request-was-interrupted

window.turmoil.windowSettings = localStorage.getItem('windowSettings') === null ? {} : JSON.parse(localStorage.getItem('windowSettings'));

window.turmoil.lastLogDate = null;
window.turmoil.log = function(content, target) {
	if (typeof(target) == 'undefined') {
		target = 'all';
	}

	console.log('[' + target + ']', content);

	let consoleTarget = jQuery('#console-' + target);
	if (consoleTarget.length > 0) {
		let currentDate;
		if (typeof(moment) == 'function') {
			currentDate = moment().format("YYYY-MM-DD HH:mm:ss.SSS");
		}
		else {
			currentDate = Utils.getCurrentDateTime();
		}
		currentDate = '[' + currentDate + '] ';

		let currentDateObject = new Date();
		if (window.turmoil.lastLogDate != null) {
			let difference = currentDateObject.getTime() - window.turmoil.lastLogDate.getTime();
			currentDate += ' (' + difference + 'ms) ';
		}

		consoleTarget.find('.mCSB_container').prepend(currentDate + content + '<br>');

		if (target !== 'all') {
			jQuery('#console-all').find('.mCSB_container').prepend(currentDate + content + '<br>');
		}

		window.turmoil.lastLogDate = currentDateObject;
	}
	else {
		console.log('[' + target + ']', content);
	}
};

window.turmoil.logDebug = function(content) {
	let caller = '';
	if (typeof(arguments) == 'object') {
		if (typeof(this.callee) == 'function' && typeof(this.callee.name) == 'string') {
			caller = this.callee.name + '() - ';
		}
	}
	window.turmoil.log(caller + content, 'all');
	console.log('[debug]', caller + content);
};

window.turmoil.logCombat = function(content) {
	window.turmoil.log(content, 'combat');
};

window.turmoil.activeUnit = null;

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
	Windows.initWindow('equipment', true);
	Windows.initWindow('stash', true);
	Windows.initWindow('stats', true);
	Windows.initWindow('location', true);

	// TODO: handle browser window resize
});

if (typeof jQuery !== 'undefined') {
	(function(jQuery) {
		jQuery('#spinner').ajaxStart(function() {
			jQuery(this).fadeIn();
		}).ajaxStop(function() {
			jQuery(this).fadeOut();
		});
	}) (jQuery);
}
