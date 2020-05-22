import { UPDATE_CHARACTER_STATS } from "../constants/action-types";

const initialState = {
	stats: {}
};

function rootReducer(state = initialState, action) {
	if (action.type === UPDATE_CHARACTER_STATS) {
		// TODO: update stats
		console.log("from root reducer, payload", action.payload)
		return Object.assign({}, state, {
			stats: action.payload
		});
	}

	return state;
}

export default rootReducer;