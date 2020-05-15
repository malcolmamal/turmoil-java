import React from "react";

export default class ItemSlotStash extends React.Component
{
	handleOnContextMenu(itemId)
	{
		//TODO:
		//actionRightClickOnStashedItem(itemId);

		return false;
	}

	render() {
		const iconItemSize = 'big'; //default
		const itemId = this.props.item;
		const itemFileCode = 'shard_of_hate';
		const itemRarityClass = 'common'; //default
		const itemImageFile = "url('/images/items/weapons/shard_of_hate.png'";

		return (
			<li className="stashItemListEntry" id={"stash_item_" + itemId} item={itemId}
				onContextMenu={() => { this.handleOnContextMenu(itemId); }}>
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