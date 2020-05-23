export function handleUpdateItemsInEquipment(currentState, payload)
{
	let newState = {};

	console.log("what is payload in equipment", payload);

	if (typeof payload.wornItems !== 'undefined')
	{
		newState.equipmentItems = [...payload.wornItems.items];

		return properResponse(currentState, newState);
	}

	newState.equipmentItems = [...currentState.equipmentItems];

	if (typeof payload.itemToAdd !== 'undefined')
	{
		let slot = payload.itemToAdd.slot;

		removeFromArrayBySlot(slot, newState.equipmentItems);
		newState.equipmentItems.push(payload.itemToAdd);
	}

	if (typeof payload.itemToRemove !== 'undefined')
	{
		let slot = payload.itemToRemove.slot;
		let ident = payload.itemToRemove.ident;

		removeFromArrayByIdent(ident, newState.equipmentItems);
		newState.equipmentItems.push(window.turmoil.equipment.defaultItems[slot]);
	}

	console.log("new state is", newState.equipmentItems);

	console.log("what is now in window.turmoil.equipment.items", window.turmoil.equipment.items);

	return properResponse(currentState, newState);
}

export function handleUpdateItemsInStash(currentState, payload)
{
	let newState = {};

	if (typeof payload.stashItems !== 'undefined')
	{
		newState.stashItems = [...payload.stashItems.items];

		return properResponse(currentState, newState);
	}

	newState.stashItems = [...currentState.stashItems];

	if (typeof payload.itemToAdd !== 'undefined')
	{
		newState.stashItems.push(payload.itemToAdd);
	}

	if (typeof payload.itemToRemove !== 'undefined')
	{
		let ident = payload.itemToRemove.ident;

		removeFromArrayByIdent(ident, newState.stashItems);
	}

	return properResponse(currentState, newState);
}

function removeFromArrayByIdent(ident, itemsArray)
{
	let index;

	for (index = itemsArray.length; index-- > 0 && itemsArray[index].ident !== ident;) {}
	if (index > -1) {
		itemsArray.splice(index, 1);
	}
}

function removeFromArrayBySlot(slot, itemsArray)
{
	let index;

	for (index = itemsArray.length; index-- > 0 && itemsArray[index].slot !== slot;) {}
	if (index > -1) {
		itemsArray.splice(index, 1);
	}
}

function properResponse(currentState, newState)
{
	return Object.assign({}, currentState, newState);
}