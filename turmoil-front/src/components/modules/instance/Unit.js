import React from "react";
import {Tooltip} from "../../../js/core/turmoil-tooltip";

export default class Unit extends React.Component
{
	refreshUnitData(ident, movement) {
		window.turmoil.instance.units[ident] = {
			movement: movement
		}
	}

	render() {
		const unitStyle = {
			width: this.props.unit.healthBar + 'px',
		}
		const unitAlt = this.props.title ? this.props.title : "unit";
		const imageClass = this.props.enemy ? " instancePortraitFlipped instanceEnemy instanceEnemyCursor" : "";
		const mainDivClass = this.props.enemy ? " enemyUnit" : "";
		const tooltipType = this.props.enemy ? "monster" : "";
		const tooltipClass = this.props.enemy ? Tooltip.tooltipClass : "";

		const ident = this.props.unit.ident;

		this.refreshUnitData(ident, this.props.unit.movement);

		return(
			<div className={"instanceElement" + mainDivClass} id={ident} onClick={() => this.props.onClick(ident)}>
				<div className="instancePortraitHealthBar">
					<div className="instancePortraitHealthBarInner" id={ident + "Health"} style={unitStyle}/>
				</div>
				<img alt={unitAlt} className={"instancePortrait" + imageClass + tooltipClass}
					 src={"/images/portraits/" + this.props.unit.portrait}
					 data-ident={ident}
					 data-tooltip-type={tooltipType}
				/>
				<div id={ident + "Effect"}/>
			</div>
		);
	}
}
