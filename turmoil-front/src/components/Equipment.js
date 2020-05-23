import React from "react";
import Window from "./Window";
import ItemSlotEquipment from "./ItemSlotEquipment";

export default class Equipment extends React.Component
{
	//<g:if test="${character.slotRightHand != null}">class="item-weapon-bg-${character.slotRightHand.damageType.toString().toLowerCase()}"</g:if>
	//<g:if test="${character.slotLeftHand != null}">class="item-weapon-bg-${character.slotLeftHand.damageType.toString().toLowerCase()}"</g:if>

	constructor(props) {
		super(props);

		this.updateStashItems = this.updateStashItems.bind(this);
		this.updateItemsInStash = this.updateItemsInStash.bind(this);
		this.updateEquipmentItems = this.updateEquipmentItems.bind(this);
		this.updateItemsInEquipment = this.updateItemsInEquipment.bind(this);

		window.turmoil.equipment.items = [
			{ slot: "slot_right_hand", top: 175, left: 90, item: {}},
			{ slot: "slot_left_hand", top: 105, left: 625, item: {}},

			{ slot: "slot_amulet", top: 165, left: 355, item: {}, iconItemSize: "square"},
			{ slot: "slot_ring_one", top: 100, left: 10, item: {}, iconItemSize: "square"},
			{ slot: "slot_ring_two", top: 100, left: 705, item: {}, iconItemSize: "square"},
			{ slot: "slot_ring_three", top: 175, left: 10, item: {}, iconItemSize: "square"},
			{ slot: "slot_ring_four", top: 175, left: 705, item: {}, iconItemSize: "square"},

			{ slot: "slot_helm", top: 20, left: 355, item: {}},
			{ slot: "slot_chest", top: 245, left: 355, item: {}},
			{ slot: "slot_belt", top: 395, left: 347, item: {}, iconItemSize: "long"},
			{ slot: "slot_pants", top: 480, left: 355, item: {}},
			{ slot: "slot_boots", top: 635, left: 355, item: {}},
			{ slot: "slot_pauldrons", top: 105, left: 220, item: {}},
			{ slot: "slot_gloves", top: 35, left: 90, item: {}},
			{ slot: "slot_bracers", top: 105, left: 500, item: {}},
		];

		console.log("items at construct", window.turmoil.equipment.items);
	}

	componentDidMount() {

		console.log("items at mount", window.turmoil.equipment.items);

		window.turmoil.ajax.exec({
			url: 'initializeEquipment',
			onSuccess: this.updateItemsInEquipment
		});
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

	render() {
		const backgroundImage = "url('../images/character_male.png')";

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

							{this.props.items.map(item => (
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
