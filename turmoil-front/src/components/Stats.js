import React from "react";
import '../stylesheets/window-stats.css';
import Window from "./Window";
import CharacterState from "./CharacterState";

export default class Stats extends React.Component
{
	render() {
		const background = {
			backgroundImage: "url('/images/backgrounds/background_brown_fabric_300x700.png')",
			width: '300px',
			height: '700px',
		};

		return (
			<Window ident="stats" background={background}>
				<div id="statsContent" className="scrollableContainer statsContainer"
					 style={{width: "284px", height: "680px"}}>
					<CharacterState />
				</div>
			</Window>
		);
	}
}
