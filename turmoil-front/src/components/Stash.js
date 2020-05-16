import React from "react";
import '../stylesheets/window-stash.css';
import {initializeStash} from "../js/window-stash";
import Window from "./Window";
import ItemSlotStash from "./ItemSlotStash";

export default class Stash extends React.Component
{
	componentDidMount() {
		initializeStash()

		window.turmoil.ajax.exec({
			url: 'initializeStash',
			onSuccess: this.updateItems,
			onSuccessThis: this
		});
	}

	updateItems(content, that) {
		window.turmoil.stash.items = content.items;

		console.log("newly arrived items", content.items);

		that.setState({items: that.getItems()});
	}

	getItems() {
		return window.turmoil.stash.items;
	}

	render() {
		const background = {
			backgroundImage: "url('/images/windows/stash.png')",
			width: '500px',
			height: '700px',
		};

		this.state = {
			items: this.getItems()
		}

		return (
			<Window ident="stash" background={background}>
				<div id="stashItemContainerWrapper">
					<div id="stashItemContainer" className="stashItemContainer">
						<ul id="stashItemListContainer">

							{this.state.items.map(item => (
								<ItemSlotStash item={item.ident}
											   rarity={item.rarity}
											   key={item.ident}
											   filePath={item.filePath}
											   fileCode={item.fileCode}
								/>
							))}

						</ul>
					</div>
				</div>
			</Window>
		);
	}
}
