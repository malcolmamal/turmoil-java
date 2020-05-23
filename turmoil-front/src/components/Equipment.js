import React from "react";
import Window from "./Window";
import ItemSlotEquipment from "./ItemSlotEquipment";
import {updateItemsInEquipmentAction} from "../js/actions";
import {connect} from "react-redux";


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

		this.updateStashItems = this.updateStashItems.bind(this);
		this.updateItemsInStash = this.updateItemsInStash.bind(this);
		this.updateEquipmentItems = this.updateEquipmentItems.bind(this);
		this.updateItemsInEquipment = this.updateItemsInEquipment.bind(this);

		this.wornItems = this.wornItems.bind(this);
	}

	componentDidMount() {

		console.log("equipment props items at mount", this.props.equipmentItems);

		console.log("items at mount", window.turmoil.equipment.items);

		window.turmoil.ajax.exec({
			url: 'initializeEquipment',
			onSuccess: this.wornItems
		});
	}

	wornItems(content)
	{
		this.props.updateItems({wornItems: content});
	}

	updateItemsInStash(content) {
		this.props.updateItemsInStash(content);
	}

	updateItemsInEquipment(content) {
		this.props.updateItemsInEquipment(content);
	}

	updateStashItems() {
		this.props.updateStashItems(window.turmoil.stash);
	}

	updateEquipmentItems() {
		this.props.updateEquipmentItems(window.turmoil.equipment);
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
		console.log("equipment props items at render", this.props.equipmentItems);

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
							<span id="slot_right_hand_effect"  style={{position: 'absolute', top: '143px', left: '61px', width: '150px', height: '210px'}}/>
							<span id="slot_left_hand_effect"   style={{position: 'absolute', top: '143px', left: '632px', width: '150px', height: '210px'}}/>

							{equipmentItems.map(item => (
								<ItemSlotEquipment
									item={item.item}
									slot={item.slot}
									top={item.top}
									left={item.left}
									key={item.slot}
									iconItemSize={item.iconItemSize ? item.iconItemSize : ""}
									updateStash={this.updateStashItems}
									updateEquipment={this.updateEquipmentItems}
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