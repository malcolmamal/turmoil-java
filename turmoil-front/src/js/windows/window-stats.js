import {Ajax} from "../core/turmoil-ajax";

export function updateCharacterState(callBackFunction)
{
	Ajax.exec({
		url: 'character/state',
		onSuccess: callBackFunction,
	});
}
