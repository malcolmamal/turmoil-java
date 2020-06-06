import React from "react";

export default class Unit extends React.Component
{
	render() {
		const unitStyle = {
			width: this.props.healthBar + 'px',
		}
		const imageClass = this.props.enemy ? " instancePortraitFlipped instanceEnemy" : "";
		const mainDivClass = this.props.enemy ? " enemyUnit" : "";
		const unitAlt = this.props.title ? this.props.title : "unit";

		return(
			<div className={"instanceElement" + mainDivClass} id={this.props.ident} onClick={() => this.props.onClick(this.props.ident)}>
				<div className="instancePortraitHealthBar">
					<div className="instancePortraitHealthBarInner" id={this.props.ident + "Health"} style={unitStyle}/>
				</div>
				<img alt={unitAlt} className={"instancePortrait" + imageClass}
					 src={"/images/portraits/" + this.props.portrait}/>
				<div id={this.props.ident + "Effect"}/>
			</div>
		);
	}
}
