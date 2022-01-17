import React from "react";

export default class Field extends React.Component
{
	render() {
		const ident = "polygon-" + this.props.column + "-" + this.props.row;
		const text = this.props.column + ":" + this.props.row;

		const baseHeight = 15;
		const baseWidth = 9;

		const textHeightOffset = 8; // move text top <-> right
		const verticalOffset = 12; // move whole grid left <-> right
		const horizontalOffset = 2; // move whole grid top <-> bottom

		const rowFixed = this.props.row * 2 - 1;
		const offset = (this.props.column + rowFixed + 1) % 2;

		const columnPosition = ((this.props.column - 1) * baseHeight) + verticalOffset;
		const rowPosition = ((rowFixed  + offset) * baseWidth) + horizontalOffset;

		const valueX = ((this.props.column - 1) * baseHeight) + verticalOffset;
		const valueY = ((rowFixed  + offset) * baseWidth) + textHeightOffset + horizontalOffset;

		return(
			<>
				<polygon id={ident} stroke="#4f4f4f" transform={"translate(" + columnPosition + ", " + rowPosition +")"} className="instancePolygon" strokeWidth="0.15" points="5,-9 -5,-9 -10,0 -5,9 5,9 10,0"/>
				<text className="locationText" x={valueX} y={valueY}>{text}</text>
			</>
		);
	}
}
