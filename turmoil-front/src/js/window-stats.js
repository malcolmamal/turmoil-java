export function updateCharacterState(callBackFunction)
{
	console.log("running character state ajax");
	window.turmoil.ajax.exec({
		url: 'character/state',
		onSuccess: callBackFunction,
	});
}