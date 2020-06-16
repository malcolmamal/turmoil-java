import React from "react";
import jQuery from "jquery";
import Unit from "./Unit";
import {WindowLocation} from "../../../js/windows/window-location";
import {connect} from "react-redux";
import {ReduxActions} from "../../../js/redux/actions";

function mapDispatchToProps(dispatch) {
	return {
		updateEquipmentItems: equipmentItems => dispatch(ReduxActions.updateItemsInEquipmentAction(equipmentItems)),
	};
}

class ConnectedFriendlyUnit extends React.Component
{
	constructor(props) {
		super(props);

		this.actionOnUnitHandler = this.actionOnUnitHandler.bind(this);
		this.updateEquipmentItems = this.updateEquipmentItems.bind(this);
	}

	actionOnUnitHandler(ident) {
		// do nothing at the moment
		WindowLocation.actionOnFriendlyUnit(ident, {updateEquipmentItems: this.updateEquipmentItems});
	}

	render() {
		return(
			<Unit unit={this.props.unit} onClick={this.actionOnUnitHandler}/>
		);
	}

	updateEquipmentItems(items) {
		this.props.updateEquipmentItems({wornItems: items});
	}

	componentDidMount() {
		const ident = this.props.unit.ident;
		const position = this.props.unit.position;

		if (this.props.unit.activeUnit) {
			WindowLocation.setUnitActive(this.props.unit);
		}

		setTimeout(function() {
				WindowLocation.handleMoveToPolygon(jQuery('#' + position), jQuery('#' + ident));
			}, 200
		);
	}
}

const FriendlyUnit = connect(
	null,
	mapDispatchToProps
)(ConnectedFriendlyUnit);

export default FriendlyUnit;