import { UPDATE_CHARACTER_STATS } from "../constants/action-types";

export function updateCharacterStats(payload) {
	return { type: UPDATE_CHARACTER_STATS, payload }
};