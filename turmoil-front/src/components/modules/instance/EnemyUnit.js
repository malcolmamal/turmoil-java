import React from "react";
import {connect} from "react-redux";
import jQuery from "jquery";
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
		const ident = this.props.ident;
		const portrait = this.props.portrait;
		const unitStyle = {
			width: this.props.healthBar + 'px',
		}

		return(
			<div className="instanceElement enemyUnit" id={ident} onClick={() => this.actionOnUnitHandler(ident)} >
				<div className="instancePortraitHealthBar">
					<div className="instancePortraitHealthBarInner" id={ident + "Health"} style={unitStyle}/>
				</div>
				<img alt="enemy" className="instancePortrait instancePortraitFlipped instanceEnemy"
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