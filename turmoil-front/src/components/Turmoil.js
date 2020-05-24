import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Instance from "./modules/instance/Instance";
import Console from "./Console";
import Error from "./layout/Error";
import Equipment from "./modules/items/Equipment";
import Stash from "./modules/items/Stash";
import Stats from "./modules/stats/Stats";

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
						<Stash />
						<Stats />

					</div>
				</div>

				<Footer />
			</div>
		);
	}
}