import React from "react";

export default class ItemSlotEquipment extends React.Component
{
	render() {
		const opacity = 1; // TODO: check actual value
		const item = this.props.item;

		const rarity = item.rarity ? item.rarity : "gray";
		const itemIdent = item.ident ? item.ident : "";
		const onContextMenuAction = item.ident ? "actionRightClickOnEquipment('${item.id}')" : "return false;";

		const tooltipId = item.ident ? "tooltip_${item.getFileCode()}_${item.id}" : "";
		const tooltipClass = item.ident ? " tooltip itemTooltip" : "";

		const iconItemSize = this.props.iconItemSize ? this.props.iconItemSize : "default";
		const itemBackgroundImage = "url('${resource(dir: item.getImagePath(), file: item.getImageFile())}');";
		const positionStyle = {position: 'absolute', top: this.props.top + "px",  left: this.props.left + "px"};

		return (
			<a className="slot-link" id={this.props.slot} style={positionStyle}>
			<span className={"d3-icon d3-icon-item d3-icon-item-large d3-icon-item-" + rarity}
					style={{opacity: opacity}}
					onContextMenu={{onContextMenuAction}}
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
			</a>
		);
	}
}
