import React from "react";
import jQuery from "jquery";
import {handleMoveToPolygon} from "../../../js/window-instance";

export default class FriendlyUnit extends React.Component
{
	render()
	{
		const ident = this.props.ident;
		const portrait = this.props.portrait;
		const unitStyle = {
			width: this.props.healthBar + 'px',
		}

		return(
			<div className="instanceElement" id={ident}>
				<div className="instancePortraitHealthBar">
					<div className="instancePortraitHealthBarInner" id={ident + "Health"} style={unitStyle}/>
				</div>
				<img alt="character" className="instancePortrait"
					 src={"/images/portraits/" + portrait}/>
				<div id={ident + "Effect"}/>
			</div>
		);
	}

	componentDidMount()
	{
		let that = this;
		const ident = that.props.ident;
		const position = that.props.position;
		setTimeout(function() {
				window.turmoil.activeUnit = jQuery('#' + ident);

				handleMoveToPolygon(jQuery('#' + position), window.turmoil.activeUnit);
			}, 200
		);
	}
}
