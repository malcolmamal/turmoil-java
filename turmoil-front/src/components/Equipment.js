import React from "react";
import Window from "./Window";
import ItemSlotEquipment from "./ItemSlotEquipment";
import {updateItemsInEquipmentAction} from "../js/actions";
import {connect} from "react-redux";
import '../js/window-equipment';

const mapStateToProps = state => {
	return { equipmentItems: state.equipmentItems };
};

function mapDispatchToProps(dispatch) {
	return {
		updateItems: equipmentItems => dispatch(updateItemsInEquipmentAction(equipmentItems))
	};
}

class ConnectedEquipment extends React.Component
{
	//<g:if test="${character.slotRightHand != null}">class="item-weapon-bg-${character.slotRightHand.damageType.toString().toLowerCase()}"</g:if>
	//<g:if test="${character.slotLeftHand != null}">class="item-weapon-bg-${character.slotLeftHand.damageType.toString().toLowerCase()}"</g:if>

	constructor(props) {
		super(props);

		this.wornItems = this.wornItems.bind(this);
	}

	componentDidMount() {
		window.turmoil.ajax.exec({
			url: 'initializeEquipment',
			onSuccess: this.wornItems
		});
	}

	wornItems(content)
	{
		this.props.updateItems({wornItems: content});
	}

	prepareEquipmentItems(equipmentItems)
	{
		let preparedItems = Object.assign({}, window.turmoil.equipment.defaultItems);
		equipmentItems.map((item) => {
			preparedItems[item.slot].item = item;
		});

		return Object.values(preparedItems);
	}

	render() {
		const backgroundImage = "url('../images/character_male.png')";
		const equipmentItems = this.prepareEquipmentItems(this.props.equipmentItems);

		return (
			<Window ident="equipment">
				<div
					id="equipmentContent"
					className="equipmentContainer"
					style={{width: '800px', height: '830px'}}
				>
					<div id="window_equipment" className="windowContent equipmentWindowContent" style={{transform: 'scale(1)', WebkitTransform: 'scale(1)', MozTransform: 'scale(1)', OTransform: 'scale(1)'}}>
						<div className="windowContentInner"
							 style={{backgroundImage: backgroundImage, width: '800px', height: '830px'}}
						>
							{equipmentItems.map(item => (
								<ItemSlotEquipment
									item={item.item}
									slot={item.slot}
									top={item.top}
									left={item.left}
									key={item.slot}
									iconItemSize={item.iconItemSize ? item.iconItemSize : ""}
								/>
							))}

						</div>
					</div>
				</div>
			</Window>
		);
	}
}

const Equipment = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConnectedEquipment);

export default Equipment;