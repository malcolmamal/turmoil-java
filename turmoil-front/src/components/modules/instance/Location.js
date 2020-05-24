import React from "react";
import {connect} from "react-redux";
import Window from "../../Window";
import Field from "./Field";
import Text from "./Text";
import FriendlyUnit from "./FriendlyUnit";
import EnemyUnit from "./EnemyUnit";
import '../../../stylesheets/window-instance.css';
import '../../../stylesheets/window-location.css';
import {updateEnemyUnitsAction, updateFriendlyUnitsAction} from "../../../js/actions";

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
		window.turmoil.ajax.exec({
			url: 'instance/initializeEnemyUnits',
			onSuccess: this.props.updateEnemyUnits,
			onSuccessThis: this
		});

		window.turmoil.ajax.exec({
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

		/*
		 *  changing svgElement's width by 100 requires also changing first viewBox value but divided by 10 (roughly)
		 *  however height is more problematic as it changes the scale
		 *
		 *  this is related to the 3rd and 4th viewBox attribute, if it's 1 then there is no scaling
		 */

		return (
			<Window ident="location" background={background}>
				{this.props.friendlyUnits.map(unit => (
					<FriendlyUnit ident={unit.ident} portrait={unit.portrait} healthBar={unit.healthBar} position={unit.position} key={unit.ident}/>
				))}

				{this.props.enemyUnits.map(unit => (
					<EnemyUnit ident={unit.ident} portrait={unit.portrait} healthBar={unit.healthBar} position={unit.position} key={unit.ident}/>
				))}

				<div className="instanceSvg">
					<svg viewBox="78 1 1 160" style={{width: "850px", height: "780px", left: "0", top: "0", position: "relative"}} id="svgElement">
						<g>
							{fields.map(field => (
								<Field column={field.column} row={field.row} key={"polygon-" + field.column + "-" + field.row}/>
							))}
						</g>

						<g>
							{fields.map(field => (
								<Text x={field.column} y={field.row} key={"text-" + field.column + ":" + field.row}/>
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