export let Utils = {
	getCurrentDateTime: function () {
		let currentDate = new Date();
		return currentDate.toJSON().slice(0,10) + ' '
			+ currentDate.getHours() + ':'
			+ currentDate.getMinutes() + ':'
			+ currentDate.getSeconds() + '.'
			+ currentDate.getMilliseconds();
	},
	randomInt: function (max) {
		return Math.floor((Math.random() * max) + 1);
	},
	addEvent: function (element, type, eventHandle) {
		if (element == null || typeof(element) == 'undefined') {
			return;
		}

		if (element.addEventListener) {
			element.addEventListener(type, eventHandle, false);
		}
		else if (element.attachEvent) {
			element.attachEvent("on" + type, eventHandle);
		}
		else {
			element["on" + type] = eventHandle;
		}
	}
}
