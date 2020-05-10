import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Instance from "./Instance";
import Console from "./Console";
import Error from "./Error";
import Equipment from "./Equipment";

export default class Turmoil extends React.Component
{
	render() {
		return (
			<div>
				<Error />
				<Header />

				<div className="turmoilContainer">
					<div id="turmoilBody" className="turmoilBody">
						<div id="shadows">
							<div className="shadowTop"/>
							<div className="shadowLeft"/>
							<div className="shadowRight"/>
							<div className="shadowBottom"/>
						</div>

						<Instance />
						<Console />
						<Equipment />

					</div>
				</div>

				<Footer />
			</div>
		);
	}
}