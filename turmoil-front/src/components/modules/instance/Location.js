import React from "react";
import {connect} from "react-redux";
import Window from "../../Window";
import Field from "./Field";
import FriendlyUnit from "./FriendlyUnit";
import EnemyUnit from "./EnemyUnit";
import '../../../stylesheets/window-instance.css';
import '../../../stylesheets/window-location.css';
import {updateEnemyUnitsAction, updateFriendlyUnitsAction} from "../../../js/actions";
import {Ajax} from "../../../js/core/turmoil-ajax";

const mapStateToProps = state => {
	return {
		enemyUnits: state.enemyUnits,
		friendlyUnits: state.friendlyUnits,
	};
};

function mapDispatchToProps(dispatch) {
	return {
		updateEnemyUnits: enemyUnits => dispatch(updateEnemyUnitsAction(enemyUnits)),
		updateFriendlyUnits: friendlyUnits => dispatch(updateFriendlyUnitsAction(friendlyUnits)),
	};
}

class ConnectedLocation extends React.Component
{
	componentDidMount() {
		Ajax.exec({
			url: 'instance/initializeEnemyUnits',
			onSuccess: this.props.updateEnemyUnits,
			onSuccessThis: this
		});

		Ajax.exec({
			url: 'instance/initializeFriendlyUnits',
			onSuccess: this.props.updateFriendlyUnits,
			onSuccessThis: this
		});
	}

	render() {
		const background = {
			backgroundImage: "url('/images/backgrounds/background_grunge_650x550.png')",
			backgroundSize: "cover",
			width: '850px',
			height: '780px'
		};

		let fields = [];
		for (let i = 1; i < 11; i++)
		{
			for (let j = 1; j < 9; j++)
			{
				fields.push({column: i, row: j});
			}
		}

		return (
			<Window ident="location" background={background}>
				{this.props.friendlyUnits.map(unit => (
					<FriendlyUnit ident={unit.ident} portrait={unit.portrait} healthBar={unit.healthBar} position={unit.position} key={unit.ident}/>
				))}

				{this.props.enemyUnits.map(unit => (
					<EnemyUnit ident={unit.ident} portrait={unit.portrait} healthBar={unit.healthBar} position={unit.position} key={unit.ident}/>
				))}

				<div className="instanceSvg">
					<svg style={{width: "160px", height: "160px", left: "320", top: "320", position: "relative", transform: "scale(5)"}} id="svgElement">
						<g>
							{fields.map(field => (
								<Field column={field.column} row={field.row} key={"polygon-" + field.column + "-" + field.row}/>
							))}
						</g>
					</svg>
				</div>
			</Window>
		);
	}
}

const Location = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConnectedLocation);

export default Location;