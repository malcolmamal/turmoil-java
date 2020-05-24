import React from "react";

export default class Text extends React.Component
{
	render() {
		const text = this.props.x + ":" + this.props.y;

		const initialX = 5;
		const initialY = 13;

		const valueYFixed = this.props.y * 2 - 1;
		const valueYOffset = (this.props.x + valueYFixed + 1) % 2;

		const valueX = initialX + ((this.props.x - 1) * 15);
		const valueY = initialY + ((valueYFixed  + valueYOffset) * 9);

		return(
			<text className="locationText" x={valueX} y={valueY}>{text}</text>
		);
	}
}
