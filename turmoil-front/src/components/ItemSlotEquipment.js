import React from "react";
import {actionRightClickOnEquipment} from "../js/turmoil-start";

import { connect } from "react-redux";
import { updateCharacterStats } from "../js/actions/index";
import {updateCharacterState} from "../js/window-stats";

function mapDispatchToProps(dispatch) {
	return {
		updateCharacterStats: characterState => dispatch(updateCharacterStats(characterState))
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

			//TODO: update stats
			updateCharacterState(this.props.updateCharacterStats);
		}
	}

	updateItems()
	{
		this.props.updateStash();
		this.props.updateEquipment();
	}

	render() {
		const opacity = 1; // TODO: check actual value
		const item = this.props.item ? this.props.item : {};

		const rarity = item.rarity ? item.rarity : "gray";
		const itemIdent = item.ident ? item.ident : "";

		const tooltipId = item.ident ? "tooltip_" + item.fileCode + "_" + item.ident : "";
		const tooltipClass = item.ident ? " tooltip itemTooltip" : "";

		const iconItemSize = this.props.iconItemSize ? this.props.iconItemSize : "default";
		const itemBackgroundImage = item.filePath ? "url(" + item.filePath + ")" : "";
		const positionStyle = {position: 'absolute', top: this.props.top + "px",  left: this.props.left + "px"};

		return (
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
		);
	}
}

const ItemSlotEquipment = connect(
	null,
	mapDispatchToProps
)(ConnectedItemSlotEquipment);

export default ItemSlotEquipment;