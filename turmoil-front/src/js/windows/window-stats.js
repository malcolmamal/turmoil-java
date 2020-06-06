import {Ajax} from "../core/turmoil-ajax";

export let WindowStats = {
	updateStats: function (callBackFunction) {
		Ajax.exec({
			url: 'character/state',
			onSuccess: callBackFunction,
		});
	}
}
