import { UPDATE_CHARACTER_STATS } from "../constants/action-types";

const initialState = {
	characterState: {}
};

function rootReducer(state = initialState, action) {
	console.log("hello reducer", action.payload)
	if (action.type === UPDATE_CHARACTER_STATS) {
		// TODO: update stats
		console.log("from root reducer, payload", action.payload)
		return Object.assign({}, state, {
			characterState: action.payload
		});
	}

	return state;
}

export default rootReducer;