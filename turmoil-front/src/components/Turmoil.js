import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Error from "./layout/Error";
import Console from "./Console";
import Equipment from "./modules/items/Equipment";
import Stash from "./modules/items/Stash";
import Stats from "./modules/stats/Stats";
import Location from "./modules/instance/Location";

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

						<Console />
						<Equipment />
						<Stash />
						<Stats />

						<Location />

					</div>
				</div>

				<Footer />
			</div>
		);
	}
}