import { UPDATE_CHARACTER_STATE, UPDATE_ITEMS_IN_EQUIPMENT, UPDATE_ITEMS_IN_STASH, UPDATE_ITEMS_IN_EQUIPMENT_AND_STASH } from "../constants/action-types";

export function updateCharacterStats(payload) {
	return { type: UPDATE_CHARACTER_STATE, payload }
}

export function updateItemsInEquipmentAction(payload) {
	return { type: UPDATE_ITEMS_IN_EQUIPMENT, payload }
}

export function updateItemsInStashAction(payload) {
	return { type: UPDATE_ITEMS_IN_STASH, payload }
}

export function updateItemsInEquipmentAndStashAction(payload) {
	return { type: UPDATE_ITEMS_IN_EQUIPMENT_AND_STASH, payload }
}
