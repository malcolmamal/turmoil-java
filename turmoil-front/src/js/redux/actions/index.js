import {
	UPDATE_CHARACTER_STATE,
	UPDATE_ITEMS_IN_EQUIPMENT,
	UPDATE_ITEMS_IN_STASH,
	UPDATE_ENEMY_UNITS,
	UPDATE_FRIENDLY_UNITS
} from "../constants/action-types";

export function updateCharacterStatsAction(payload) {
	console.log("wtf");
	return { type: UPDATE_CHARACTER_STATE, payload }
}

export function updateItemsInEquipmentAction(payload) {
	return { type: UPDATE_ITEMS_IN_EQUIPMENT, payload }
}

export function updateItemsInStashAction(payload) {
	return { type: UPDATE_ITEMS_IN_STASH, payload }
}

export function updateEnemyUnitsAction(payload) {
	return { type: UPDATE_ENEMY_UNITS, payload }
}

export function updateFriendlyUnitsAction(payload) {
	return { type: UPDATE_FRIENDLY_UNITS, payload }
}
