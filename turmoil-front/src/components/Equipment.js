import React from "react";
import '../stylesheets/turmoil-tooltip.css';
import Window from "./Window";
import ItemSlotEquipment from "./ItemSlotEquipment";

export default class Equipment extends React.Component
{
	//<g:if test="${character.slotRightHand != null}">class="item-weapon-bg-${character.slotRightHand.damageType.toString().toLowerCase()}"</g:if>
	//<g:if test="${character.slotLeftHand != null}">class="item-weapon-bg-${character.slotLeftHand.damageType.toString().toLowerCase()}"</g:if>

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

							<a className="slot-link" id="slot_right_hand" style={{position: 'absolute', top: '175px', left: '90px'}}>
								<ItemSlotEquipment item="" from="character.slotRightHand"/>
							</a>

							<a className="slot-link" id="slot_left_hand" style={{position: 'absolute', top: '175px', left: '660px'}}>
								<ItemSlotEquipment item="" from="character.slotLeftHand"/>
							</a>

							<a className="slot-link" id="slot_amulet" style={{position: 'absolute', top: '170px', left: '450px'}}>
								<ItemSlotEquipment item="" iconItemSize="square" from="character.slotAmulet" />
							</a>

							<a className="slot-link" id="slot_ring_one" style={{position: 'absolute', top: '100px', left: '10px'}}>
								<ItemSlotEquipment item="" iconItemSize="square" from="character.slotRingOne" />
							</a>

							<a className="slot-link" id="slot_ring_two" style={{position: 'absolute', top: '90px', left: '705px'}}>
								<ItemSlotEquipment item="" iconItemSize="square" from="character.slotRingTwo" />
							</a>

							<a className="slot-link" id="slot_ring_three" style={{position: 'absolute', top: '175px', left: '10px'}}>
								<ItemSlotEquipment item="" iconItemSize="square" from="character.slotRingThree" />
							</a>

							<a className="slot-link" id="slot_ring_four" style={{position: 'absolute', top: '90px', left: '630px'}}>
								<ItemSlotEquipment item="" iconItemSize="square" from="character.slotRingFour" />
							</a>

							<a className="slot-link" id="slot_helm" style={{position: 'absolute', top: '35px', left: '355px'}}>
								<ItemSlotEquipment item="" from="character.slotHelm"/>
							</a>

							<a className="slot-link" id="slot_chest" style={{position: 'absolute', top: '210px', left: '355px'}}>
								<ItemSlotEquipment item="" from="character.slotChest"/>
							</a>

							<a className="slot-link" id="slot_belt" style={{position: 'absolute', top: '385px', left: '355px'}}>
								<ItemSlotEquipment item="" iconItemSize="long" from="character.slotBelt" />
							</a>

							<a className="slot-link" id="slot_pants" style={{position: 'absolute', top: '460px', left: '355px'}}>
								<ItemSlotEquipment item="" from="character.slotPants"/>
							</a>

							<a className="slot-link" id="slot_boots" style={{position: 'absolute', top: '635px', left: '355px'}}>
								<ItemSlotEquipment item="" from="character.slotBoots"/>
							</a>

							<a className="slot-link" id="slot_pauldrons" style={{position: 'absolute', top: '90px', left: '220px'}}>
								<ItemSlotEquipment item="" from="character.slotPauldrons"/>
							</a>

							<a className="slot-link" id="slot_gloves" style={{position: 'absolute', top: '0px', left: '90px'}}>
								<ItemSlotEquipment item="" from="character.slotGloves"/>
							</a>

							<a className="slot-link" id="slot_bracers" style={{position: 'absolute', top: '90px', left: '530px'}}>
								<ItemSlotEquipment item="" from="character.slotBracers"/>
							</a>
						</div>
					</div>
				</div>
			</Window>
		);
	}
}