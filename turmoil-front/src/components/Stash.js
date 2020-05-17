import React from "react";
import '../stylesheets/window-stash.css';
import {initializeStash} from "../js/window-stash";
import Window from "./Window";
import ItemSlotStash from "./ItemSlotStash";

export default class Stash extends React.Component
{
	constructor(props) {
		super(props);

		this.updateStashItems = this.updateStashItems.bind(this);
		this.updateItemsInStash = this.updateItemsInStash.bind(this);
		this.updateEquipmentItems = this.updateEquipmentItems.bind(this);
		this.updateItemsInEquipment = this.updateItemsInEquipment.bind(this);
	}

	componentDidMount() {
		initializeStash()

		window.turmoil.ajax.exec({
			url: 'initializeStash',
			onSuccess: this.updateItemsInStash
		});
	}

	updateStashItems() {
		this.props.updateStashItems(window.turmoil.stash);
	}

	updateEquipmentItems() {
		this.props.updateEquipmentItems(window.turmoil.equipment);
	}

	updateItemsInStash(content) {
		this.props.updateItemsInStash(content);
	}

	updateItemsInEquipment(content) {
		this.props.updateItemsInEquipment(content);
	}

	render() {
		const background = {
			backgroundImage: "url('/images/windows/stash.png')",
			width: '500px',
			height: '700px',
		};

		return (
			<Window ident="stash" background={background}>
				<div id="stashItemContainerWrapper">
					<div id="stashItemContainer" className="stashItemContainer">
						<ul id="stashItemListContainer">

							{this.props.items.map(item => (
								<ItemSlotStash item={item.ident}
											   rarity={item.rarity}
											   key={item.ident}
											   filePath={item.filePath}
											   fileCode={item.fileCode}
											   updateStash={this.updateStashItems}
											   updateEquipment={this.updateEquipmentItems}
								/>
							))}

						</ul>
					</div>
				</div>
			</Window>
		);
	}
}
