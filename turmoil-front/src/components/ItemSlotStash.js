import React from "react";
import {actionRightClickOnStashedItem} from "../js/turmoil-start";
import {updateCharacterStats, updateItemsInEquipmentAction, updateItemsInStashAction} from "../js/actions";
import {connect} from "react-redux";
import {updateCharacterState} from "../js/window-stats";

function mapDispatchToProps(dispatch) {
	return {
		updateCharacterStats: characterState => dispatch(updateCharacterStats(characterState)),
		updateEquipmentItems: equipmentItems => dispatch(updateItemsInEquipmentAction(equipmentItems)),
		updateStashItems: stashItems => dispatch(updateItemsInStashAction(stashItems))
	};
}

class ConnectedItemSlotStash extends React.Component
{
	constructor(props) {
		super(props);

		this.updateItems = this.updateItems.bind(this);
	}

	onContextMenuHandler(event, itemId)
	{
		event.preventDefault();

		actionRightClickOnStashedItem(itemId, this.updateItems);

		updateCharacterState(this.props.updateCharacterStats);
	}

	updateItems(itemForStash, itemForEquipment)
	{
		this.props.updateStashItems({itemToAdd: itemForStash, itemToRemove: itemForEquipment});
		this.props.updateEquipmentItems({itemToAdd: itemForEquipment});
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

const ItemSlotStash = connect(
	null,
	mapDispatchToProps
)(ConnectedItemSlotStash);

export default ItemSlotStash;