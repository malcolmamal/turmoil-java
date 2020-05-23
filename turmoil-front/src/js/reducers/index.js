import { UPDATE_CHARACTER_STATE, UPDATE_ITEMS_IN_EQUIPMENT, UPDATE_ITEMS_IN_STASH, UPDATE_ITEMS_IN_EQUIPMENT_AND_STASH } from "../constants/action-types";
import {handleUpdateItemsInEquipment, handleUpdateItemsInStash} from "../handlers";

const initialState = {
	characterState: {},
	equipmentItems: [],//window.turmoil.equipment.defaultItems,
	stashItems: []
};

function rootReducer(state = initialState, action) {
	console.log("hello reducer, payload", action.type, action.payload)
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
		case UPDATE_ITEMS_IN_EQUIPMENT_AND_STASH: {
			return Object.assign({}, state, {
				equipmentItems: action.payload.equipmentItems,
				stashItems: action.payload.stashItems,
			});
		}
	}

	return state;
}

export default rootReducer;