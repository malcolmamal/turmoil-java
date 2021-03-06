import React from "react";
import "../../stylesheets/turmoil-error.css";

export default class Error extends React.Component
{
	render() {
		return (
			<div id="myModal" className="modal">
				<div className="modal-content">
					<span className="close" id="modalClose">&times;</span>
					<p id="modalContent"/>
				</div>
			</div>
		);
	}

	componentDidMount() {
		// Get the modal
		window.modal = document.getElementById("myModal");

		// Get the <span> element that closes the modal
		let span = document.getElementById("modalClose");

		// When the user clicks on <span> (x), close the modal
		span.onclick = function () {
			window.modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function (event) {
			if (event.target === window.modal) {
				window.modal.style.display = "none";
			}
		}

		if (window.debug) {
			console.log('Error modal initialized...');
		}
	}
}
