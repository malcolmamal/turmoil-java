import { UPDATE_CHARACTER_STATE, UPDATE_ITEMS_IN_EQUIPMENT, UPDATE_ITEMS_IN_STASH } from "../constants/action-types";
import {handleUpdateItemsInEquipment, handleUpdateItemsInStash} from "../handlers";

const initialState = {
	characterState: {},
	equipmentItems: [],
	stashItems: []
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
	}

	return state;
}

export default rootReducer;