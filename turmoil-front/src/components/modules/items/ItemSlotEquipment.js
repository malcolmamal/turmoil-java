import React from "react";
import {connect} from "react-redux";
import {ReduxActions} from "../../../js/redux/actions";
import {WindowStats} from "../../../js/windows/window-stats";
import {Tooltip} from "../../../js/core/turmoil-tooltip";
import {Ajax} from "../../../js/core/turmoil-ajax";
import {Sound} from "../../../js/core/turmoil-sound";
import {WindowLocation} from "../../../js/windows/window-location";

function mapDispatchToProps(dispatch) {
	return {
		updateCharacterStats: characterState => dispatch(ReduxActions.updateCharacterStatsAction(characterState)),
		updateEquipmentItems: equipmentItems => dispatch(ReduxActions.updateItemsInEquipmentAction(equipmentItems)),
		updateStashItems: stashItems => dispatch(ReduxActions.updateItemsInStashAction(stashItems))
	};
}

class ConnectedItemSlotEquipment extends React.Component
{
	constructor(props) {
		super(props);

		this.onContextMenuHandler = this.onContextMenuHandler.bind(this);

		this.updateItems = this.updateItems.bind(this);
	}

	onContextMenuHandler(event, item) {
		event.preventDefault();
		if (item.ident) {
			this.actionRightClickOnEquipment(item, this.updateItems);

			WindowStats.updateStats(this.props.updateCharacterStats);
		}
	}

	updateItems(item) {
		this.props.updateEquipmentItems({itemToRemove: item});
		this.props.updateStashItems({itemToAdd: item});

		WindowLocation.enableActions();
	}

	actionRightClickOnEquipment(item, updateItems) {
		Tooltip.hideAllTooltips();

		if (item.ident) {
			Ajax.exec({
				url: 'character/unequip/' + item.ident,
				onSuccess: this.finalizeRightClickOnEquipment,
				onSuccessThis: updateItems,
				blockActions: true
			});
		}
	}

	finalizeRightClickOnEquipment(data, callbackFunction) {
		if (data != null && data.success === true) {
			if (typeof(data.itemForStash) !== 'undefined') {
				switch (data.itemForStash.type) {
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

				if (typeof(callbackFunction) === 'function') {
					callbackFunction(data.itemForStash);
				}
			}
		}
	}

	render() {
		const item = this.props.item ? this.props.item : {};

		const rarity = item.rarity ? item.rarity : "gray";
		const itemIdent = item.ident ? item.ident : "";

		const tooltipId = item.ident ? "tooltip_" + item.fileCode + "_" + item.ident : "";
		const tooltipClass = item.ident ? Tooltip.tooltipClass : "";

		const iconItemSize = this.props.iconItemSize ? this.props.iconItemSize : "default";
		const itemBackgroundImage = item.filePath ? "url(" + item.filePath + ")" : "";
		const positionStyle = {position: 'absolute', top: this.props.top + "px",  left: this.props.left + "px"};
		const opacity = item.ident ? 1 : 0.85;

		const rightHandEffect = (item.slot === "slot_right_hand" && item.damageType)
			? <span id="slot_right_hand_effect" className={"item-weapon-bg-" + item.damageType} style={{position: 'absolute', top: '150px', left: '67px', width: '150px', height: '210px'}}/> : "";
		const leftHandEffect = (item.slot === "slot_left_hand" && item.damageType)
			? <span id="slot_left_hand_effect" className={"item-weapon-bg-" + item.damageType}  style={{position: 'absolute', top: '77px', left: '602px', width: '150px', height: '210px'}}/> : "";

		WindowLocation.setAttackType(item);

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
							data-ident={itemIdent}
							data-tooltip-type="item"
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