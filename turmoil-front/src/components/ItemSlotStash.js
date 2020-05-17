import React from "react";
import {actionRightClickOnStashedItem} from "../js/turmoil-start";

export default class ItemSlotStash extends React.Component
{
	constructor(props) {
		super(props);

		this.updateItems = this.updateItems.bind(this);
	}

	onContextMenuHandler(event, itemId)
	{
		event.preventDefault();

		actionRightClickOnStashedItem(itemId, this.updateItems);
	}

	updateItems()
	{
		this.props.updateStash();
		this.props.updateEquipment();
	}

	render() {
		const iconItemSize = 'big'; //default // TODO: size

		const itemId = this.props.item;
		const itemFileCode = this.props.fileCode;
		const itemRarityClass = this.props.rarity;
		const itemImageFile = "url('" + this.props.filePath + "'";

		return (
			<li className="stashItemListEntry" id={"stash_item_" + itemId} item={itemId}
				onContextMenu={(event) => { this.onContextMenuHandler(event, itemId) }}
			>
				<a className="slot slot-mainHand tooltip itemTooltip" id={"tooltip_" + itemFileCode + "_" + itemId}
					item={itemId}>
					<span className={"stashItem d3-icon d3-icon-item stash-icon-item-large d3-icon-item-" + itemRarityClass}>
						<span className="icon-item-gradient">
							<span className="icon-item-inner stash-icon-item-default"
								  style={{backgroundImage: itemImageFile}}/>
						</span>
					</span>
				</a>
			</li>
		);
	}
}