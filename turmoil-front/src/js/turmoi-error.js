export function initializeErrorModal() {

	// Get the modal
	window.modal = document.getElementById("myModal");

	// Get the <span> element that closes the modal
	var span = document.getElementById("modalClose");

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		window.modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function (event) {
		if (event.target === window.modal) {
			window.modal.style.display = "none";
		}
	}

	console.log('error modal initialized');
}