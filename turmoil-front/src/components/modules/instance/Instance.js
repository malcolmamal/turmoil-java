import React from "react";
import {connect} from "react-redux";
import Window from "../../Window";
import FriendlyUnit from "./FriendlyUnit";
import EnemyUnit from "./EnemyUnit";
import '../../../stylesheets/window-instance.css';
import {updateEnemyUnitsAction, updateFriendlyUnitsAction} from "../../../js/actions";
import {Ajax} from "../../../js/turmoil-ajax";

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

class ConnectedInstance extends React.Component
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

	addUnit()
	{
		Ajax.exec({
			url: 'instance/instanceAddEnemy',
			onSuccess: this.props.updateEnemyUnits,
			onSuccessThis: this
		});
	}

	render() {
		const background = {
			backgroundImage: "url('/images/backgrounds/background_grunge_650x550.png')",
			width: '650px',
			height: '580px',
		};

		return (
			<Window ident="instance" background={background}>
				{this.props.friendlyUnits.map(unit => (
					<FriendlyUnit ident={unit.ident} portrait={unit.portrait} healthBar={unit.healthBar} position={unit.position} key={unit.ident}/>
				))}

				{this.props.enemyUnits.map(unit => (
					<EnemyUnit ident={unit.ident} portrait={unit.portrait} healthBar={unit.healthBar} position={unit.position} key={unit.ident}/>
				))}

				<div>
					<button onClick={() => { this.addUnit() }}>add</button>
				</div>

				<div className="instanceSvg">
					<svg width="600" height="545" id="svgElement">
						<g>
							<polygon id="polygon-1-1" className="instancePolygon"
									 points="72.0,0.0 96.0,41.6 72.0,83.1 24.0,83.1 0.0,41.6 24.0,0.0"/>
							<polygon id="polygon-1-2" className="instancePolygon"
									 points="72.0,83.1 96.0,124.7 72.0,166.3 24.0,166.3 0.0,124.7 24.0,83.1"/>
							<polygon id="polygon-1-3" className="instancePolygon"
									 points="72.0,166.3 96.0,207.8 72.0,249.4 24.0,249.4 0.0,207.8 24.0,166.3"/>
							<polygon id="polygon-1-4" className="instancePolygon"
									 points="72.0,249.4 96.0,291.0 72.0,332.6 24.0,332.6 0.0,291.0 24.0,249.4"/>
							<polygon id="polygon-1-5" className="instancePolygon"
									 points="72.0,332.6 96.0,374.1 72.0,415.7 24.0,415.7 0.0,374.1 24.0,332.6"/>
							<polygon id="polygon-1-6" className="instancePolygon"
									 points="72.0,415.7 96.0,457.3 72.0,498.8 24.0,498.8 0.0,457.3 24.0,415.7"/>
							<polygon id="polygon-2-1" className="instancePolygon"
									 points="144.0,41.6 168.0,83.1 144.0,124.7 96.0,124.7 72.0,83.1 96.0,41.6"/>
							<polygon id="polygon-2-2" className="instancePolygon"
									 points="144.0,124.7 168.0,166.3 144.0,207.8 96.0,207.8 72.0,166.3 96.0,124.7"/>
							<polygon id="polygon-2-3" className="instancePolygon"
									 points="144.0,207.8 168.0,249.4 144.0,291.0 96.0,291.0 72.0,249.4 96.0,207.8"/>
							<polygon id="polygon-2-4" className="instancePolygon"
									 points="144.0,291.0 168.0,332.6 144.0,374.1 96.0,374.1 72.0,332.6 96.0,291.0"/>
							<polygon id="polygon-2-5" className="instancePolygon"
									 points="144.0,374.1 168.0,415.7 144.0,457.3 96.0,457.3 72.0,415.7 96.0,374.1"/>
							<polygon id="polygon-2-6" className="instancePolygon"
									 points="144.0,457.3 168.0,498.8 144.0,540.4 96.0,540.4 72.0,498.8 96.0,457.3"/>
							<polygon id="polygon-3-1" className="instancePolygon"
									 points="216.0,0.0 240.0,41.6 216.0,83.1 168.0,83.1 144.0,41.6 168.0,0.0"/>
							<polygon id="polygon-3-2" className="instancePolygon"
									 points="216.0,83.1 240.0,124.7 216.0,166.3 168.0,166.3 144.0,124.7 168.0,83.1"/>
							<polygon id="polygon-3-3" className="instancePolygon"
									 points="216.0,166.3 240.0,207.8 216.0,249.4 168.0,249.4 144.0,207.8 168.0,166.3"/>
							<polygon id="polygon-3-4" className="instancePolygon"
									 points="216.0,249.4 240.0,291.0 216.0,332.6 168.0,332.6 144.0,291.0 168.0,249.4"/>
							<polygon id="polygon-3-5" className="instancePolygon"
									 points="216.0,332.6 240.0,374.1 216.0,415.7 168.0,415.7 144.0,374.1 168.0,332.6"/>
							<polygon id="polygon-3-6" className="instancePolygon"
									 points="216.0,415.7 240.0,457.3 216.0,498.8 168.0,498.8 144.0,457.3 168.0,415.7"/>
							<polygon id="polygon-4-1" className="instancePolygon"
									 points="288.0,41.6 312.0,83.1 288.0,124.7 240.0,124.7 216.0,83.1 240.0,41.6"/>
							<polygon id="polygon-4-2" className="instancePolygon"
									 points="288.0,124.7 312.0,166.3 288.0,207.8 240.0,207.8 216.0,166.3 240.0,124.7"/>
							<polygon id="polygon-4-3" className="instancePolygon"
									 points="288.0,207.8 312.0,249.4 288.0,291.0 240.0,291.0 216.0,249.4 240.0,207.8"/>
							<polygon id="polygon-4-4" className="instancePolygon"
									 points="288.0,291.0 312.0,332.6 288.0,374.1 240.0,374.1 216.0,332.6 240.0,291.0"/>
							<polygon id="polygon-4-5" className="instancePolygon"
									 points="288.0,374.1 312.0,415.7 288.0,457.3 240.0,457.3 216.0,415.7 240.0,374.1"/>
							<polygon id="polygon-4-6" className="instancePolygon"
									 points="288.0,457.3 312.0,498.8 288.0,540.4 240.0,540.4 216.0,498.8 240.0,457.3"/>
							<polygon id="polygon-5-1" className="instancePolygon"
									 points="360.0,0.0 384.0,41.6 360.0,83.1 312.0,83.1 288.0,41.6 312.0,0.0"/>
							<polygon id="polygon-5-2" className="instancePolygon"
									 points="360.0,83.1 384.0,124.7 360.0,166.3 312.0,166.3 288.0,124.7 312.0,83.1"/>
							<polygon id="polygon-5-3" className="instancePolygon"
									 points="360.0,166.3 384.0,207.8 360.0,249.4 312.0,249.4 288.0,207.8 312.0,166.3"/>
							<polygon id="polygon-5-4" className="instancePolygon"
									 points="360.0,249.4 384.0,291.0 360.0,332.6 312.0,332.6 288.0,291.0 312.0,249.4"/>
							<polygon id="polygon-5-5" className="instancePolygon"
									 points="360.0,332.6 384.0,374.1 360.0,415.7 312.0,415.7 288.0,374.1 312.0,332.6"/>
							<polygon id="polygon-5-6" className="instancePolygon"
									 points="360.0,415.7 384.0,457.3 360.0,498.8 312.0,498.8 288.0,457.3 312.0,415.7"/>
							<polygon id="polygon-6-1" className="instancePolygon"
									 points="432.0,41.6 456.0,83.1 432.0,124.7 384.0,124.7 360.0,83.1 384.0,41.6"/>
							<polygon id="polygon-6-2" className="instancePolygon"
									 points="432.0,124.7 456.0,166.3 432.0,207.8 384.0,207.8 360.0,166.3 384.0,124.7"/>
							<polygon id="polygon-6-3" className="instancePolygon"
									 points="432.0,207.8 456.0,249.4 432.0,291.0 384.0,291.0 360.0,249.4 384.0,207.8"/>
							<polygon id="polygon-6-4" className="instancePolygon"
									 points="432.0,291.0 456.0,332.6 432.0,374.1 384.0,374.1 360.0,332.6 384.0,291.0"/>
							<polygon id="polygon-6-5" className="instancePolygon"
									 points="432.0,374.1 456.0,415.7 432.0,457.3 384.0,457.3 360.0,415.7 384.0,374.1"/>
							<polygon id="polygon-6-6" className="instancePolygon"
									 points="432.0,457.3 456.0,498.8 432.0,540.4 384.0,540.4 360.0,498.8 384.0,457.3"/>
							<polygon id="polygon-7-1" className="instancePolygon"
									 points="504.0,0.0 528.0,41.6 504.0,83.1 456.0,83.1 432.0,41.6 456.0,0.0"/>
							<polygon id="polygon-7-2" className="instancePolygon"
									 points="504.0,83.1 528.0,124.7 504.0,166.3 456.0,166.3 432.0,124.7 456.0,83.1"/>
							<polygon id="polygon-7-3" className="instancePolygon"
									 points="504.0,166.3 528.0,207.8 504.0,249.4 456.0,249.4 432.0,207.8 456.0,166.3"/>
							<polygon id="polygon-7-4" className="instancePolygon"
									 points="504.0,249.4 528.0,291.0 504.0,332.6 456.0,332.6 432.0,291.0 456.0,249.4"/>
							<polygon id="polygon-7-5" className="instancePolygon"
									 points="504.0,332.6 528.0,374.1 504.0,415.7 456.0,415.7 432.0,374.1 456.0,332.6"/>
							<polygon id="polygon-7-6" className="instancePolygon"
									 points="504.0,415.7 528.0,457.3 504.0,498.8 456.0,498.8 432.0,457.3 456.0,415.7"/>
							<polygon id="polygon-8-1" className="instancePolygon"
									 points="576.0,41.6 600.0,83.1 576.0,124.7 528.0,124.7 504.0,83.1 528.0,41.6"/>
							<polygon id="polygon-8-2" className="instancePolygon"
									 points="576.0,124.7 600.0,166.3 576.0,207.8 528.0,207.8 504.0,166.3 528.0,124.7"/>
							<polygon id="polygon-8-3" className="instancePolygon"
									 points="576.0,207.8 600.0,249.4 576.0,291.0 528.0,291.0 504.0,249.4 528.0,207.8"/>
							<polygon id="polygon-8-4" className="instancePolygon"
									 points="576.0,291.0 600.0,332.6 576.0,374.1 528.0,374.1 504.0,332.6 528.0,291.0"/>
							<polygon id="polygon-8-5" className="instancePolygon"
									 points="576.0,374.1 600.0,415.7 576.0,457.3 528.0,457.3 504.0,415.7 528.0,374.1"/>
							<polygon id="polygon-8-6" className="instancePolygon"
									 points="576.0,457.3 600.0,498.8 576.0,540.4 528.0,540.4 504.0,498.8 528.0,457.3"/>
						</g>

						<g>
							<line stroke="black" x1="24" y1="0" x2="72" y2="0"/>
							<line stroke="black" x1="24" y1="0" x2="0" y2="42"/>
							<line stroke="black" x1="72" y1="0" x2="96" y2="42"/>
							<line stroke="black" x1="0" y1="42" x2="24" y2="83"/>
							<line stroke="black" x1="24" y1="83" x2="72" y2="83"/>
							<line stroke="black" x1="24" y1="83" x2="0" y2="125"/>
							<line stroke="black" x1="0" y1="125" x2="24" y2="166"/>
							<line stroke="black" x1="24" y1="166" x2="72" y2="166"/>
							<line stroke="black" x1="24" y1="166" x2="0" y2="208"/>
							<line stroke="black" x1="0" y1="208" x2="24" y2="249"/>
							<line stroke="black" x1="24" y1="249" x2="72" y2="249"/>
							<line stroke="black" x1="24" y1="249" x2="0" y2="291"/>
							<line stroke="black" x1="0" y1="291" x2="24" y2="333"/>
							<line stroke="black" x1="24" y1="333" x2="72" y2="333"/>
							<line stroke="black" x1="24" y1="333" x2="0" y2="374"/>
							<line stroke="black" x1="0" y1="374" x2="24" y2="416"/>
							<line stroke="black" x1="24" y1="416" x2="72" y2="416"/>
							<line stroke="black" x1="24" y1="416" x2="0" y2="457"/>
							<line stroke="black" x1="0" y1="457" x2="24" y2="499"/>
							<line stroke="black" x1="24" y1="499" x2="72" y2="499"/>
							<line stroke="black" x1="96" y1="42" x2="144" y2="42"/>
							<line stroke="black" x1="96" y1="42" x2="72" y2="83"/>
							<line stroke="black" x1="72" y1="83" x2="96" y2="125"/>
							<line stroke="black" x1="96" y1="125" x2="144" y2="125"/>
							<line stroke="black" x1="96" y1="125" x2="72" y2="166"/>
							<line stroke="black" x1="72" y1="166" x2="96" y2="208"/>
							<line stroke="black" x1="96" y1="208" x2="144" y2="208"/>
							<line stroke="black" x1="96" y1="208" x2="72" y2="249"/>
							<line stroke="black" x1="72" y1="249" x2="96" y2="291"/>
							<line stroke="black" x1="96" y1="291" x2="144" y2="291"/>
							<line stroke="black" x1="96" y1="291" x2="72" y2="333"/>
							<line stroke="black" x1="72" y1="333" x2="96" y2="374"/>
							<line stroke="black" x1="96" y1="374" x2="144" y2="374"/>
							<line stroke="black" x1="96" y1="374" x2="72" y2="416"/>
							<line stroke="black" x1="72" y1="416" x2="96" y2="457"/>
							<line stroke="black" x1="96" y1="457" x2="144" y2="457"/>
							<line stroke="black" x1="96" y1="457" x2="72" y2="499"/>
							<line stroke="black" x1="72" y1="499" x2="96" y2="540"/>
							<line stroke="black" x1="168" y1="499" x2="144" y2="540"/>
							<line stroke="black" x1="96" y1="540" x2="144" y2="540"/>
							<line stroke="black" x1="168" y1="0" x2="216" y2="0"/>
							<line stroke="black" x1="168" y1="0" x2="144" y2="42"/>
							<line stroke="black" x1="216" y1="0" x2="240" y2="42"/>
							<line stroke="black" x1="144" y1="42" x2="168" y2="83"/>
							<line stroke="black" x1="168" y1="83" x2="216" y2="83"/>
							<line stroke="black" x1="168" y1="83" x2="144" y2="125"/>
							<line stroke="black" x1="144" y1="125" x2="168" y2="166"/>
							<line stroke="black" x1="168" y1="166" x2="216" y2="166"/>
							<line stroke="black" x1="168" y1="166" x2="144" y2="208"/>
							<line stroke="black" x1="144" y1="208" x2="168" y2="249"/>
							<line stroke="black" x1="168" y1="249" x2="216" y2="249"/>
							<line stroke="black" x1="168" y1="249" x2="144" y2="291"/>
							<line stroke="black" x1="144" y1="291" x2="168" y2="333"/>
							<line stroke="black" x1="168" y1="333" x2="216" y2="333"/>
							<line stroke="black" x1="168" y1="333" x2="144" y2="374"/>
							<line stroke="black" x1="144" y1="374" x2="168" y2="416"/>
							<line stroke="black" x1="168" y1="416" x2="216" y2="416"/>
							<line stroke="black" x1="168" y1="416" x2="144" y2="457"/>
							<line stroke="black" x1="144" y1="457" x2="168" y2="499"/>
							<line stroke="black" x1="168" y1="499" x2="216" y2="499"/>
							<line stroke="black" x1="240" y1="42" x2="288" y2="42"/>
							<line stroke="black" x1="240" y1="42" x2="216" y2="83"/>
							<line stroke="black" x1="216" y1="83" x2="240" y2="125"/>
							<line stroke="black" x1="240" y1="125" x2="288" y2="125"/>
							<line stroke="black" x1="240" y1="125" x2="216" y2="166"/>
							<line stroke="black" x1="216" y1="166" x2="240" y2="208"/>
							<line stroke="black" x1="240" y1="208" x2="288" y2="208"/>
							<line stroke="black" x1="240" y1="208" x2="216" y2="249"/>
							<line stroke="black" x1="216" y1="249" x2="240" y2="291"/>
							<line stroke="black" x1="240" y1="291" x2="288" y2="291"/>
							<line stroke="black" x1="240" y1="291" x2="216" y2="333"/>
							<line stroke="black" x1="216" y1="333" x2="240" y2="374"/>
							<line stroke="black" x1="240" y1="374" x2="288" y2="374"/>
							<line stroke="black" x1="240" y1="374" x2="216" y2="416"/>
							<line stroke="black" x1="216" y1="416" x2="240" y2="457"/>
							<line stroke="black" x1="240" y1="457" x2="288" y2="457"/>
							<line stroke="black" x1="240" y1="457" x2="216" y2="499"/>
							<line stroke="black" x1="216" y1="499" x2="240" y2="540"/>
							<line stroke="black" x1="312" y1="499" x2="288" y2="540"/>
							<line stroke="black" x1="240" y1="540" x2="288" y2="540"/>
							<line stroke="black" x1="312" y1="0" x2="360" y2="0"/>
							<line stroke="black" x1="312" y1="0" x2="288" y2="42"/>
							<line stroke="black" x1="360" y1="0" x2="384" y2="42"/>
							<line stroke="black" x1="288" y1="42" x2="312" y2="83"/>
							<line stroke="black" x1="312" y1="83" x2="360" y2="83"/>
							<line stroke="black" x1="312" y1="83" x2="288" y2="125"/>
							<line stroke="black" x1="288" y1="125" x2="312" y2="166"/>
							<line stroke="black" x1="312" y1="166" x2="360" y2="166"/>
							<line stroke="black" x1="312" y1="166" x2="288" y2="208"/>
							<line stroke="black" x1="288" y1="208" x2="312" y2="249"/>
							<line stroke="black" x1="312" y1="249" x2="360" y2="249"/>
							<line stroke="black" x1="312" y1="249" x2="288" y2="291"/>
							<line stroke="black" x1="288" y1="291" x2="312" y2="333"/>
							<line stroke="black" x1="312" y1="333" x2="360" y2="333"/>
							<line stroke="black" x1="312" y1="333" x2="288" y2="374"/>
							<line stroke="black" x1="288" y1="374" x2="312" y2="416"/>
							<line stroke="black" x1="312" y1="416" x2="360" y2="416"/>
							<line stroke="black" x1="312" y1="416" x2="288" y2="457"/>
							<line stroke="black" x1="288" y1="457" x2="312" y2="499"/>
							<line stroke="black" x1="312" y1="499" x2="360" y2="499"/>
							<line stroke="black" x1="384" y1="42" x2="432" y2="42"/>
							<line stroke="black" x1="384" y1="42" x2="360" y2="83"/>
							<line stroke="black" x1="360" y1="83" x2="384" y2="125"/>
							<line stroke="black" x1="384" y1="125" x2="432" y2="125"/>
							<line stroke="black" x1="384" y1="125" x2="360" y2="166"/>
							<line stroke="black" x1="360" y1="166" x2="384" y2="208"/>
							<line stroke="black" x1="384" y1="208" x2="432" y2="208"/>
							<line stroke="black" x1="384" y1="208" x2="360" y2="249"/>
							<line stroke="black" x1="360" y1="249" x2="384" y2="291"/>
							<line stroke="black" x1="384" y1="291" x2="432" y2="291"/>
							<line stroke="black" x1="384" y1="291" x2="360" y2="333"/>
							<line stroke="black" x1="360" y1="333" x2="384" y2="374"/>
							<line stroke="black" x1="384" y1="374" x2="432" y2="374"/>
							<line stroke="black" x1="384" y1="374" x2="360" y2="416"/>
							<line stroke="black" x1="360" y1="416" x2="384" y2="457"/>
							<line stroke="black" x1="384" y1="457" x2="432" y2="457"/>
							<line stroke="black" x1="384" y1="457" x2="360" y2="499"/>
							<line stroke="black" x1="360" y1="499" x2="384" y2="540"/>
							<line stroke="black" x1="456" y1="499" x2="432" y2="540"/>
							<line stroke="black" x1="384" y1="540" x2="432" y2="540"/>
							<line stroke="black" x1="456" y1="0" x2="504" y2="0"/>
							<line stroke="black" x1="456" y1="0" x2="432" y2="42"/>
							<line stroke="black" x1="504" y1="0" x2="528" y2="42"/>
							<line stroke="black" x1="432" y1="42" x2="456" y2="83"/>
							<line stroke="black" x1="456" y1="83" x2="504" y2="83"/>
							<line stroke="black" x1="456" y1="83" x2="432" y2="125"/>
							<line stroke="black" x1="432" y1="125" x2="456" y2="166"/>
							<line stroke="black" x1="456" y1="166" x2="504" y2="166"/>
							<line stroke="black" x1="456" y1="166" x2="432" y2="208"/>
							<line stroke="black" x1="432" y1="208" x2="456" y2="249"/>
							<line stroke="black" x1="456" y1="249" x2="504" y2="249"/>
							<line stroke="black" x1="456" y1="249" x2="432" y2="291"/>
							<line stroke="black" x1="432" y1="291" x2="456" y2="333"/>
							<line stroke="black" x1="456" y1="333" x2="504" y2="333"/>
							<line stroke="black" x1="456" y1="333" x2="432" y2="374"/>
							<line stroke="black" x1="432" y1="374" x2="456" y2="416"/>
							<line stroke="black" x1="456" y1="416" x2="504" y2="416"/>
							<line stroke="black" x1="456" y1="416" x2="432" y2="457"/>
							<line stroke="black" x1="432" y1="457" x2="456" y2="499"/>
							<line stroke="black" x1="456" y1="499" x2="504" y2="499"/>
							<line stroke="black" x1="528" y1="42" x2="576" y2="42"/>
							<line stroke="black" x1="528" y1="42" x2="504" y2="83"/>
							<line stroke="black" x1="504" y1="83" x2="528" y2="125"/>
							<line stroke="black" x1="528" y1="125" x2="576" y2="125"/>
							<line stroke="black" x1="528" y1="125" x2="504" y2="166"/>
							<line stroke="black" x1="504" y1="166" x2="528" y2="208"/>
							<line stroke="black" x1="528" y1="208" x2="576" y2="208"/>
							<line stroke="black" x1="528" y1="208" x2="504" y2="249"/>
							<line stroke="black" x1="504" y1="249" x2="528" y2="291"/>
							<line stroke="black" x1="528" y1="291" x2="576" y2="291"/>
							<line stroke="black" x1="528" y1="291" x2="504" y2="333"/>
							<line stroke="black" x1="504" y1="333" x2="528" y2="374"/>
							<line stroke="black" x1="528" y1="374" x2="576" y2="374"/>
							<line stroke="black" x1="528" y1="374" x2="504" y2="416"/>
							<line stroke="black" x1="504" y1="416" x2="528" y2="457"/>
							<line stroke="black" x1="528" y1="457" x2="576" y2="457"/>
							<line stroke="black" x1="528" y1="457" x2="504" y2="499"/>
							<line stroke="black" x1="504" y1="499" x2="528" y2="540"/>
							<line stroke="black" x1="600" y1="499" x2="576" y2="540"/>
							<line stroke="black" x1="528" y1="540" x2="576" y2="540"/>
							<line stroke="black" x1="576" y1="42" x2="600" y2="83"/>
							<line stroke="black" x1="600" y1="83" x2="576" y2="125"/>
							<line stroke="black" x1="576" y1="125" x2="600" y2="166"/>
							<line stroke="black" x1="600" y1="166" x2="576" y2="208"/>
							<line stroke="black" x1="576" y1="208" x2="600" y2="249"/>
							<line stroke="black" x1="600" y1="249" x2="576" y2="291"/>
							<line stroke="black" x1="576" y1="291" x2="600" y2="333"/>
							<line stroke="black" x1="600" y1="333" x2="576" y2="374"/>
							<line stroke="black" x1="576" y1="374" x2="600" y2="416"/>
							<line stroke="black" x1="600" y1="416" x2="576" y2="457"/>
							<line stroke="black" x1="576" y1="457" x2="600" y2="499"/>
						</g>

						<g>
							<text className="instanceText" x="48" y="79">1:1</text>
							<text className="instanceText" x="48" y="162">1:2</text>
							<text className="instanceText" x="48" y="245">1:3</text>
							<text className="instanceText" x="48" y="328">1:4</text>
							<text className="instanceText" x="48" y="412">1:5</text>
							<text className="instanceText" x="48" y="495">1:6</text>
							<text className="instanceText" x="120" y="121">2:1</text>
							<text className="instanceText" x="120" y="204">2:2</text>
							<text className="instanceText" x="120" y="287">2:3</text>
							<text className="instanceText" x="120" y="370">2:4</text>
							<text className="instanceText" x="120" y="453">2:5</text>
							<text className="instanceText" x="120" y="536">2:6</text>
							<text className="instanceText" x="192" y="79">3:1</text>
							<text className="instanceText" x="192" y="162">3:2</text>
							<text className="instanceText" x="192" y="245">3:3</text>
							<text className="instanceText" x="192" y="328">3:4</text>
							<text className="instanceText" x="192" y="412">3:5</text>
							<text className="instanceText" x="192" y="495">3:6</text>
							<text className="instanceText" x="264" y="121">4:1</text>
							<text className="instanceText" x="264" y="204">4:2</text>
							<text className="instanceText" x="264" y="287">4:3</text>
							<text className="instanceText" x="264" y="370">4:4</text>
							<text className="instanceText" x="264" y="453">4:5</text>
							<text className="instanceText" x="264" y="536">4:6</text>
							<text className="instanceText" x="336" y="79">5:1</text>
							<text className="instanceText" x="336" y="162">5:2</text>
							<text className="instanceText" x="336" y="245">5:3</text>
							<text className="instanceText" x="336" y="328">5:4</text>
							<text className="instanceText" x="336" y="412">5:5</text>
							<text className="instanceText" x="336" y="495">5:6</text>
							<text className="instanceText" x="408" y="121">6:1</text>
							<text className="instanceText" x="408" y="204">6:2</text>
							<text className="instanceText" x="408" y="287">6:3</text>
							<text className="instanceText" x="408" y="370">6:4</text>
							<text className="instanceText" x="408" y="453">6:5</text>
							<text className="instanceText" x="408" y="536">6:6</text>
							<text className="instanceText" x="480" y="79">7:1</text>
							<text className="instanceText" x="480" y="162">7:2</text>
							<text className="instanceText" x="480" y="245">7:3</text>
							<text className="instanceText" x="480" y="328">7:4</text>
							<text className="instanceText" x="480" y="412">7:5</text>
							<text className="instanceText" x="480" y="495">7:6</text>
							<text className="instanceText" x="552" y="121">8:1</text>
							<text className="instanceText" x="552" y="204">8:2</text>
							<text className="instanceText" x="552" y="287">8:3</text>
							<text className="instanceText" x="552" y="370">8:4</text>
							<text className="instanceText" x="552" y="453">8:5</text>
							<text className="instanceText" x="552" y="536">8:6</text>
						</g>
					</svg>
				</div>
			</Window>
		);
	}
}

const Instance = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConnectedInstance);

export default Instance;