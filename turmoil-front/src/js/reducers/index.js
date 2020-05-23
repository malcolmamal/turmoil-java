import {
	UPDATE_CHARACTER_STATE,
	UPDATE_ENEMY_UNITS, UPDATE_FRIENDLY_UNITS,
	UPDATE_ITEMS_IN_EQUIPMENT,
	UPDATE_ITEMS_IN_STASH
} from "../constants/action-types";
import {
	handleUpdateEnemyUnits,
	handleUpdateFriendlyUnits,
	handleUpdateItemsInEquipment,
	handleUpdateItemsInStash
} from "../handlers";

const initialState = {
	characterState: {},
	equipmentItems: [],
	stashItems: [],
	enemyUnits: [],
	friendlyUnits: [
		//{ident: "testElement", portrait: "male/male_portrait_052.png", position: "polygon-1-4"}
	]
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_CHARACTER_STATE: {
			return Object.assign({}, state, {
				characterState: action.payload
			});
		}
		case UPDATE_ITEMS_IN_EQUIPMENT: {
			return handleUpdateItemsInEquipment(state, action.payload);
		}
		case UPDATE_ITEMS_IN_STASH: {
			return handleUpdateItemsInStash(state, action.payload);
		}
		case UPDATE_ENEMY_UNITS: {
			return handleUpdateEnemyUnits(state, action.payload);
		}
		case UPDATE_FRIENDLY_UNITS: {
			return handleUpdateFriendlyUnits(state, action.payload);
		}
	}

	return state;
}

export default rootReducer;