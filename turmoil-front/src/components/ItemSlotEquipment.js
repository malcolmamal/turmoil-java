import React from "react";

export default class ItemSlotEquipment extends React.Component
{
	render() {
		const opacity = 1; // TODO: check actual value
		const rarity = "gray"; //<g:if test="${item}">${item.getRarityClass()}</g:if><g:else>gray</g:else>
		const item = this.props.item;
		const onContextMenuAction = item ? "actionRightClickOnEquipment('${item.id}')" : "return false;";

		const tooltipId = item ? "tooltip_${item.getFileCode()}_${item.id}" : "";
		const tooltipClass = item ? " tooltip itemTooltip" : "";
		const tooltipStyle = item ? " tooltip itemTooltip" : "";

		const iconItemSize = this.props.iconItemSize ? this.props.iconItemSize : "default";
		const itemBackgroundImage = "url('${resource(dir: item.getImagePath(), file: item.getImageFile())}');";

		if (item)
		{
			return (
				<span className={"d3-icon d3-icon-item d3-icon-item-large d3-icon-item-" + {rarity}}
						style={{opacity: opacity}}
						onContextMenu={onContextMenuAction}
				>
					<span className="icon-item-gradient">
						<span
							id={tooltipId}
							className={"icon-item-inner icon-item-" + iconItemSize + " tooltip itemTooltip"}
							style={{backgroundImage: itemBackgroundImage}}
							item="${item.id}"
						/>
					</span>
				</span>
			);
		}

		return (
			<span className={"d3-icon d3-icon-item d3-icon-item-large d3-icon-item-gray"}
				style={{opacity: opacity}}
				onContextMenu={"return false;"}
			>
				<span className="icon-item-gradient">
					<span className={"icon-item-inner icon-item-" + iconItemSize}/>
				</span>
			</span>
		);
	}
}
