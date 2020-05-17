import React from "react";
import Window from "./Window";
import ItemSlotEquipment from "./ItemSlotEquipment";
import {EnemyUnit} from "./Instance";

export default class Equipment extends React.Component
{
	//<g:if test="${character.slotRightHand != null}">class="item-weapon-bg-${character.slotRightHand.damageType.toString().toLowerCase()}"</g:if>
	//<g:if test="${character.slotLeftHand != null}">class="item-weapon-bg-${character.slotLeftHand.damageType.toString().toLowerCase()}"</g:if>

	constructor(props) {
		super(props);

		this.updateItems = this.updateItems.bind(this);
	}

	updateItems(content) {
		this.props.updateItems(content);
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
								<ItemSlotEquipment item={item.item} slot={item.slot} top={item.top} left={item.left} key={item.slot} iconItemSize={item.iconItemSize ? item.iconItemSize : ""}/>
							))}

						</div>
					</div>
				</div>
			</Window>
		);
	}
}