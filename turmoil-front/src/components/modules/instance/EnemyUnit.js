import React from "react";
import {connect} from "react-redux";
import jQuery from "jquery";
import Unit from "./Unit";
import {actionOnUnit, handleMoveToPolygon} from "../../../js/windows/window-instance";
import {ReduxActions} from "../../../js/redux/actions";

function mapDispatchToProps(dispatch) {
	return {
		updateItems: stashItems => dispatch(ReduxActions.updateItemsInStashAction(stashItems)),
		updateEnemyUnits: stashItems => dispatch(ReduxActions.updateEnemyUnitsAction(stashItems))
	};
}

class ConnectedEnemyUnit extends React.Component
{
	constructor(props) {
		super(props);

		this.actionOnUnitHandler = this.actionOnUnitHandler.bind(this);
		this.updateItems = this.updateItems.bind(this);
		this.addEnemyUnit = this.addEnemyUnit.bind(this);
		this.removeEnemyUnit = this.removeEnemyUnit.bind(this);
	}

	actionOnUnitHandler(ident) {
		actionOnUnit(ident, {updateItems: this.updateItems, removeEnemyUnit: this.removeEnemyUnit, addEnemyUnit: this.addEnemyUnit});
	}

	updateItems(item) {
		this.props.updateItems({itemToAdd: item});
	}

	addEnemyUnit(unit) {
		this.props.updateEnemyUnits({unitToAdd: unit});
	}

	removeEnemyUnit(unit) {
		this.props.updateEnemyUnits({unitToRemove: unit});
	}

	render()
	{
		return(
			<Unit ident={this.props.ident} portrait={this.props.portrait} healthBar={this.props.healthBar} enemy={true} onClick={this.actionOnUnitHandler}/>
		);
	}

	componentDidMount() {
		let that = this;
		const ident = that.props.ident;
		const position = that.props.position;

		setTimeout(function() {
				handleMoveToPolygon(jQuery('#' + position), jQuery('#' + ident));
			}, 125
		);
	}
}

const EnemyUnit = connect(
	null,
	mapDispatchToProps
)(ConnectedEnemyUnit);

export default EnemyUnit;