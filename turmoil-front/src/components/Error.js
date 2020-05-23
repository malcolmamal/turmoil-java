import React from "react";
import "../js/turmoil-error";
import "../stylesheets/turmoil-error.css";
import {initializeErrorModal} from "../js/turmoil-error";

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
		initializeErrorModal();
	}
}