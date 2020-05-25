import React from "react";

export default class Field extends React.Component
{
	render() {
		const ident = "polygon-" + this.props.column + "-" + this.props.row;
		const text = this.props.column + ":" + this.props.row;

		const initialColumnPosition = 5;
		const initialRowPosition = 5;

		const initialX = 5;
		const initialY = 13;

		const rowFixed = this.props.row * 2 - 1;
		const offset = (this.props.column + rowFixed + 1) % 2;

		const columnPosition = initialColumnPosition + ((this.props.column - 1) * 15);
		const rowPosition = initialRowPosition + ((rowFixed  + offset) * 9);

		const valueX = initialX + ((this.props.column - 1) * 15);
		const valueY = initialY + ((rowFixed  + offset) * 9);

		return(
			<>
				<polygon id={ident} stroke="#4f4f4f" transform={"translate(" + columnPosition + ", " + rowPosition +")"} className="instancePolygon" strokeWidth="0.15" points="5,-9 -5,-9 -10,0 -5,9 5,9 10,0"/>
				<text className="locationText" x={valueX} y={valueY}>{text}</text>
			</>
		);
	}
}
