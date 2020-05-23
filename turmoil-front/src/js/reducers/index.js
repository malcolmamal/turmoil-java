import { UPDATE_CHARACTER_STATE } from "../constants/action-types";

const initialState = {
	characterState: {},
	equipment: { items: {} },
	stash: { items: {} }
};

function rootReducer(state = initialState, action) {
	console.log("hello reducer", action.payload)
	if (action.type === UPDATE_CHARACTER_STATE) {
		// TODO: update stats
		console.log("from root reducer, payload", action.payload)
		return Object.assign({}, state, {
			characterState: action.payload
		});
	}

	return state;
}

export default rootReducer;