import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Instance from "./Instance";
import Console from "./Console";
import Error from "./Error";
import Equipment from "./Equipment";
import Stash from "./Stash";
import Stats from "./Stats";

export default class Turmoil extends React.Component
{
	constructor(props) {
		super(props);

		this.updateItems = this.updateItems.bind(this)

		this.state = { items: [] };
	}

	updateItems(content) {
		window.turmoil.stash.items = content.items;

		console.log("newly arrived items", content.items);

		this.setState({items: this.getItems()});
	}

	getItems() {
		return window.turmoil.stash.items;
	}

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

						<Instance updateItems={this.updateItems} />
						<Console />
						<Equipment />
						<Stash items={this.state.items} updateItems={this.updateItems} />
						<Stats />

					</div>
				</div>

				<Footer />
			</div>
		);
	}
}