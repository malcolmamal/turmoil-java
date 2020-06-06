import {
	UPDATE_CHARACTER_STATE,
	UPDATE_ITEMS_IN_EQUIPMENT,
	UPDATE_ITEMS_IN_STASH,
	UPDATE_ENEMY_UNITS,
	UPDATE_FRIENDLY_UNITS
} from "../constants/action-types";

export let ReduxActions = {
	updateCharacterStatsAction: function (payload) {
		return { type: UPDATE_CHARACTER_STATE, payload }
	},
	updateItemsInEquipmentAction: function (payload) {
		return { type: UPDATE_ITEMS_IN_EQUIPMENT, payload }
	},
	updateItemsInStashAction: function (payload) {
		return { type: UPDATE_ITEMS_IN_STASH, payload }
	},
	updateEnemyUnitsAction: function (payload) {
		return { type: UPDATE_ENEMY_UNITS, payload }
	},
	updateFriendlyUnitsAction: function (payload) {
		return { type: UPDATE_FRIENDLY_UNITS, payload }
	}
}
