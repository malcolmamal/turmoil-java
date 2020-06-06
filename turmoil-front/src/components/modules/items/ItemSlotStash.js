import React from "react";
import {connect} from "react-redux";
import {ReduxActions} from "../../../js/redux/actions";
import {WindowStats} from "../../../js/windows/window-stats";
import {Tooltip} from "../../../js/core/turmoil-tooltip";
import {Ajax} from "../../../js/core/turmoil-ajax";
import {Sound} from "../../../js/core/turmoil-sound";

function mapDispatchToProps(dispatch) {
	return {
		updateCharacterStats: characterState => dispatch(ReduxActions.updateCharacterStatsAction(characterState)),
		updateEquipmentItems: equipmentItems => dispatch(ReduxActions.updateItemsInEquipmentAction(equipmentItems)),
		updateStashItems: stashItems => dispatch(ReduxActions.updateItemsInStashAction(stashItems))
	};
}

class ConnectedItemSlotStash extends React.Component
{
	constructor(props) {
		super(props);

		this.updateItems = this.updateItems.bind(this);
	}

	onContextMenuHandler(event, itemId) {
		event.preventDefault();

		this.actionRightClickOnStashedItem(itemId, this.updateItems);

		WindowStats.updateStats(this.props.updateCharacterStats);
	}

	updateItems(itemForStash, itemForEquipment) {
		this.props.updateStashItems({itemToAdd: itemForStash, itemToRemove: itemForEquipment});
		this.props.updateEquipmentItems({itemToAdd: itemForEquipment});
	}

	actionRightClickOnStashedItem(itemId, updateItems) {
		Tooltip.hideAllTooltips();

		Ajax.exec({
			url: 'character/equip/' + itemId,
			onSuccess: this.finalizeRightClickOnStashedItem,
			onSuccessThis: updateItems
		});
	}

	finalizeRightClickOnStashedItem(data, callbackFunction) {
		if (data != null && data.success === true) {
			if (typeof(data.itemForEquipment) !== 'undefined') {
				switch (data.itemForEquipment.type) {
					case 'ACCESSORY':
						Sound.playAudio('soundAccessoryJewellery');
						break;
					case 'ARMOR':
						Sound.playAudio('soundMediumArmor');
						break;
					case 'WEAPON':
						Sound.playAudio('soundWeapon');
						break;
				}
			}

			if (typeof(callbackFunction) === 'function')
			{
				callbackFunction(data.itemForStash, data.itemForEquipment);
			}
		}
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