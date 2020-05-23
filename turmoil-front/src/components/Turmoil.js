import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Instance from "./Instance";
import Console from "./Console";
import Error from "./Error";
import Equipment from "./Equipment";
import Stash from "./Stash";
import Stats from "./Stats";
import {updateItemInSlot} from "../js/window-instance";

export default class Turmoil extends React.Component
{
	constructor(props) {
		super(props);

		this.updateStashItems = this.updateStashItems.bind(this)
		this.updateEquipmentItems = this.updateEquipmentItems.bind(this)

		this.state = { stashItems: [], equipmentItems: this.getEquipmentItems() };
	}

	updateStashItems(content) {
		window.turmoil.stash.items = content.items;

		console.log("newly arrived items", content.items);

		this.setState({stashItems: this.getStashItems()});
	}

	getStashItems() {
		return window.turmoil.stash.items;
	}

	updateEquipmentItems(content) {
		console.log("items before", window.turmoil.equipment.items);

		content.items.map((item) => {
			updateItemInSlot(item.slot, item);
		})

		console.log("items after", window.turmoil.equipment.items);

		this.setState({equipmentItems: this.getEquipmentItems()});
	}

	getEquipmentItems() {
		return window.turmoil.equipment.items;
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

						<Instance updateStashItems={this.updateStashItems} />
						<Console />
						<Equipment items={this.state.equipmentItems}
								   updateItemsInEquipment={this.updateEquipmentItems}
								   updateItemsInStash={this.updateStashItems}
								   updateStashItems={this.updateStashItems}
								   updateEquipmentItems={this.updateEquipmentItems}
						/>
						<Stash items={this.state.stashItems}
							   updateItemsInStash={this.updateStashItems}
							   updateItemsInEquipment={this.updateEquipmentItems}
							   updateStashItems={this.updateStashItems}
							   updateEquipmentItems={this.updateEquipmentItems}
						/>
						<Stats />

					</div>
				</div>

				<Footer />
			</div>
		);
	}
}