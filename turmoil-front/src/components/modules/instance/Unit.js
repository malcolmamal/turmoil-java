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
			width: this.props.healthBar + 'px',
		}
		const unitAlt = this.props.title ? this.props.title : "unit";
		const imageClass = this.props.enemy ? " instancePortraitFlipped instanceEnemy instanceEnemyCursor" : "";
		const mainDivClass = this.props.enemy ? " enemyUnit" : "";
		const tooltipType = this.props.enemy ? "monster" : "";
		const tooltipClass = this.props.enemy ? Tooltip.tooltipClass : "";

		this.refreshUnitData(this.props.ident, this.props.movement);

		return(
			<div className={"instanceElement" + mainDivClass} id={this.props.ident} onClick={() => this.props.onClick(this.props.ident)}>
				<div className="instancePortraitHealthBar">
					<div className="instancePortraitHealthBarInner" id={this.props.ident + "Health"} style={unitStyle}/>
				</div>
				<img alt={unitAlt} className={"instancePortrait" + imageClass + tooltipClass}
					 src={"/images/portraits/" + this.props.portrait}
					 data-ident={this.props.ident}
					 data-tooltip-type={tooltipType}
				/>
				<div id={this.props.ident + "Effect"}/>
			</div>
		);
	}
}
