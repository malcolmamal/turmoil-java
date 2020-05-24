import React from "react";
import jQuery from "jquery";
import Unit from "./Unit";
import {handleMoveToPolygon} from "../../../js/window-instance";

export default class FriendlyUnit extends React.Component
{
	actionOnUnitHandler(ident)
	{
		// do nothing at the moment
	}

	render()
	{
		return(
			<Unit ident={this.props.ident} portrait={this.props.portrait} healthBar={this.props.healthBar} onClick={this.actionOnUnitHandler}/>
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
