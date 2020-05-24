import React from "react";
import {connect} from "react-redux";
import jQuery from "jquery";
import Unit from "./Unit";
import {actionOnUnit, handleMoveToPolygon} from "../../../js/window-instance";
import {updateItemsInStashAction} from "../../../js/actions";

function mapDispatchToProps(dispatch) {
	return {
		updateItems: stashItems => dispatch(updateItemsInStashAction(stashItems))
	};
}

class ConnectedEnemyUnit extends React.Component
{
	constructor(props) {
		super(props);

		this.actionOnUnitHandler = this.actionOnUnitHandler.bind(this);
		this.updateItems = this.updateItems.bind(this);
	}

	actionOnUnitHandler(ident)
	{
		actionOnUnit(ident, this.updateItems);
	}

	updateItems(item)
	{
		this.props.updateItems({itemToAdd: item});
	}

	render()
	{
		return(
			<Unit ident={this.props.ident} portrait={this.props.portrait} healthBar={this.props.healthBar} enemy={true} onClick={this.actionOnUnitHandler}/>
		);
	}

	componentDidMount()
	{
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