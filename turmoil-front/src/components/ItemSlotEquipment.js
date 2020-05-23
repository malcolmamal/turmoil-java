import React from "react";
import {actionRightClickOnEquipment} from "../js/turmoil-items";
import {connect} from "react-redux";
import {updateCharacterStatsAction, updateItemsInStashAction, updateItemsInEquipmentAction} from "../js/actions";
import {updateCharacterState} from "../js/window-stats";

function mapDispatchToProps(dispatch) {
	return {
		updateCharacterStats: characterState => dispatch(updateCharacterStatsAction(characterState)),
		updateEquipmentItems: equipmentItems => dispatch(updateItemsInEquipmentAction(equipmentItems)),
		updateStashItems: stashItems => dispatch(updateItemsInStashAction(stashItems))
	};
}

class ConnectedItemSlotEquipment extends React.Component
{
	constructor(props) {
		super(props);

		this.onContextMenuHandler = this.onContextMenuHandler.bind(this);

		this.updateItems = this.updateItems.bind(this);
	}

	onContextMenuHandler(event, item)
	{
		event.preventDefault();
		if (item.ident)
		{
			actionRightClickOnEquipment(item, this.updateItems);

			updateCharacterState(this.props.updateCharacterStats);
		}
	}

	updateItems(item)
	{
		this.props.updateEquipmentItems({itemToRemove: item});
		this.props.updateStashItems({itemToAdd: item});
	}

	render() {
		const item = this.props.item ? this.props.item : {};

		const rarity = item.rarity ? item.rarity : "gray";
		const itemIdent = item.ident ? item.ident : "";

		const tooltipId = item.ident ? "tooltip_" + item.fileCode + "_" + item.ident : "";
		const tooltipClass = item.ident ? " tooltip itemTooltip" : "";

		const iconItemSize = this.props.iconItemSize ? this.props.iconItemSize : "default";
		const itemBackgroundImage = item.filePath ? "url(" + item.filePath + ")" : "";
		const positionStyle = {position: 'absolute', top: this.props.top + "px",  left: this.props.left + "px"};
		const opacity = item.ident ? 1 : 0.85;

		const rightHandEffect = (item.slot === "slot_right_hand" && item.damageType)
			? <span id="slot_right_hand_effect" className={"item-weapon-bg-" + item.damageType} style={{position: 'absolute', top: '150px', left: '67px', width: '150px', height: '210px'}}/> : "";
		const leftHandEffect = (item.slot === "slot_left_hand" && item.damageType)
			? <span id="slot_left_hand_effect" className={"item-weapon-bg-" + item.damageType}  style={{position: 'absolute', top: '77px', left: '602px', width: '150px', height: '210px'}}/> : "";

		return (
			<div>
				{rightHandEffect}
				{leftHandEffect}

				<div className="slot-link" id={this.props.slot} style={positionStyle} >
				<span className={"d3-icon d3-icon-item d3-icon-item-large d3-icon-item-" + rarity}
						style={{opacity: opacity}}
						onContextMenu={(event) => { this.onContextMenuHandler(event, item) }}
				>
					<span className="icon-item-gradient">
						<span
							id={tooltipId}
							className={"icon-item-inner icon-item-" + iconItemSize + tooltipClass}
							style={{backgroundImage: itemBackgroundImage}}
							item={itemIdent}
						/>
					</span>
				</span>
				</div>
			</div>
		);
	}
}

const ItemSlotEquipment = connect(
	null,
	mapDispatchToProps
)(ConnectedItemSlotEquipment);

export default ItemSlotEquipment;