import React from "react";
import jQuery from "jquery";
import Unit from "./Unit";
import {WindowLocation} from "../../../js/windows/window-location";

export default class FriendlyUnit extends React.Component
{
	actionOnUnitHandler(ident) {
		// do nothing at the moment
	}

	render() {
		return(
			<Unit ident={this.props.ident} portrait={this.props.portrait} healthBar={this.props.healthBar} movement={this.props.movement} onClick={this.actionOnUnitHandler}/>
		);
	}

	componentDidMount() {
		const ident = this.props.ident;
		const position = this.props.position;

		window.turmoil.instance.activeUnit = ident;
		window.turmoil.instance.polygonsInRange = this.props.polygonsInRange;

		WindowLocation.setEquipmentBackground(this.props.gender);

		setTimeout(function() {
				WindowLocation.handleMoveToPolygon(jQuery('#' + position), jQuery('#' + ident));
			}, 200
		);

		setTimeout(function() {
				WindowLocation.setActivePolygons();
			}, 500
		);
	}
}
