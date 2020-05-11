import React from "react";
import '../stylesheets/window-stash.css';
import {initializeStash} from "../js/window-stash";
import Window from "./Window";
import ItemSlotStash from "./ItemSlotStash";

export default class Stash extends React.Component
{
	componentDidMount() {
		initializeStash()
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
							<ItemSlotStash item="item1"/>
							<ItemSlotStash item="item2"/>
						</ul>
					</div>
				</div>
			</Window>
		);
	}
}
