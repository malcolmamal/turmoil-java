import { UPDATE_CHARACTER_STATE } from "../constants/action-types";

export function updateCharacterStats(payload) {
	return { type: UPDATE_CHARACTER_STATE, payload }
};