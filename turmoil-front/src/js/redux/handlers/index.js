import {Utils} from "../../core/turmoil-utils";

export let ReduxHandlers = {
	handleUpdateItemsInEquipment: function (currentState, payload) {
		let newState = {};

		if (typeof payload.wornItems !== 'undefined') {
			newState.equipmentItems = [...payload.wornItems.items];

			return ReduxHandlers.properResponse(currentState, newState);
		}

		newState.equipmentItems = [...currentState.equipmentItems];

		if (typeof payload.itemToAdd !== 'undefined') {
			let slot = payload.itemToAdd.slot;

			Utils.removeFromArrayBySlot(slot, newState.equipmentItems);
			newState.equipmentItems.push(payload.itemToAdd);
		}

		if (typeof payload.itemToRemove !== 'undefined') {
			let slot = payload.itemToRemove.slot;
			let ident = payload.itemToRemove.ident;

			Utils.removeFromArrayByIdent(ident, newState.equipmentItems);
			newState.equipmentItems.push(window.turmoil.equipment.defaultItems[slot]);
		}

		return ReduxHandlers.properResponse(currentState, newState);
	},
	handleUpdateItemsInStash: function (currentState, payload) {
		let newState = {};

		if (typeof payload.stashItems !== 'undefined') {
			newState.stashItems = [...payload.stashItems.items];

			return ReduxHandlers.properResponse(currentState, newState);
		}

		newState.stashItems = [...currentState.stashItems];

		if (typeof payload.itemToAdd !== 'undefined') {
			newState.stashItems.push(payload.itemToAdd);
		}

		if (typeof payload.itemToRemove !== 'undefined') {
			let ident = payload.itemToRemove.ident;

			Utils.removeFromArrayByIdent(ident, newState.stashItems);
		}

		return ReduxHandlers.properResponse(currentState, newState);
	},
	handleUpdateEnemyUnits: function (currentState, payload) {
		let newState = {};

		if (typeof payload.enemyUnits !== 'undefined') {
			newState.enemyUnits = [...payload.enemyUnits];

			return ReduxHandlers.properResponse(currentState, newState);
		}

		newState.enemyUnits = [...currentState.enemyUnits];

		if (typeof payload.unitToAdd !== 'undefined') {
			newState.enemyUnits.push(payload.unitToAdd);
		}

		if (typeof payload.unitToRemove !== 'undefined') {
			let ident = payload.unitToRemove.ident;

			Utils.removeFromArrayByIdent(ident, newState.enemyUnits);
		}

		return ReduxHandlers.properResponse(currentState, newState);
	},
	handleUpdateFriendlyUnits: function (currentState, payload) {
		let newState = {};

		if (typeof payload.friendlyUnits !== 'undefined') {
			newState.friendlyUnits = [...payload.friendlyUnits];

			return ReduxHandlers.properResponse(currentState, newState);
		}

		return ReduxHandlers.properResponse(currentState, newState);
	},

	properResponse: function (currentState, newState) {
		return Object.assign({}, currentState, newState);
	}
}
