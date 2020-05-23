import jQuery from "jquery";
import moment from "moment";

window.debug = true;
window.debugPopup = true;

window.turmoil = {};

window.turmoil.instance = {};
window.turmoil.instance.enemies = [
	//{"ident": "testEnemy", portrait: "male/male_portrait_055.png", position: "polygon-8-3"},
	//{ident: "testEnemy2", portrait: "male/male_portrait_054.png", position: "polygon-8-5"},
];

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

window.turmoil.sounds = {};
window.turmoil.soundLoops = {};

window.turmoil.windowSettings = localStorage.getItem('windowSettings') === null ? {} : JSON.parse(localStorage.getItem('windowSettings'));

window.turmoil.lastLogDate = null;
window.turmoil.log = function(content, target)
{
	if (typeof(target) == 'undefined')
	{
		target = 'all';
	}

	console.log('[' + target + ']', content);

	let consoleTarget = jQuery('#console-' + target);
	if (consoleTarget.length > 0)
	{
		let currentDate;
		if (typeof(moment) == 'function')
		{
			currentDate = moment().format("YYYY-MM-DD HH:mm:ss.SSS");
		}
		else
		{
			currentDate = getCurrentDateTime();
		}
		currentDate = '[' + currentDate + '] ';

		let currentDateObject = new Date();
		if (window.turmoil.lastLogDate != null)
		{
			let difference = currentDateObject.getTime() - window.turmoil.lastLogDate.getTime();
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
	let caller = '';
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

window.turmoil.activeUnit = null;

// functions

function getCurrentDateTime()
{
	let currentDate = new Date();
	return currentDate.toJSON().slice(0,10) + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds() + '.' + currentDate.getMilliseconds();
}