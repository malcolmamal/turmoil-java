export function updateCharacterState(callBackFunction)
{
	window.turmoil.ajax.exec({
		url: 'character/state',
		onSuccess: callBackFunction,
	});
}
