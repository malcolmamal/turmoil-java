import React from "react";
import '../stylesheets/window-console.css';
import '../js/window-console';
import Window from "./Window";

export default class Console extends React.Component
{
	render() {
		const background = {
			backgroundImage: "url('/images/backgrounds/background_paper_texture_1920x480.jpg')",
			width: '600px',
			height: '260px',
		};

		return (
			<Window ident="console" background={background}>
				<div
					id="consoleContent"
					className="consoleContainer"
					style={{width: '600px', height: '240px'}}
				>
					<div id="consoleTabs" className="consoleTabs">
						<ul>
							<li><a href="#console-all"><span>All</span></a></li>
							<li><a href="#console-combat"><span>Combat</span></a></li>
							<li><a href="#console-loot"><span>Loot</span></a></li>
							<li><a href="#console-chat"><span>Chat</span></a></li>
							<li><a href="#console-other"><span>Other</span></a></li>
						</ul>
						<div id="console-all" className="scrollableContainer consoleTab"/>
						<div id="console-combat" className="scrollableContainer consoleTab"/>
						<div id="console-loot" className="scrollableContainer consoleTab"/>
						<div id="console-chat" className="scrollableContainer consoleTab">
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
							tincidunt ut laoreet dolore magna aliquam erat volutpat.
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
							tincidunt ut laoreet dolore magna aliquam erat volutpat.
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
							tincidunt ut laoreet dolore magna aliquam erat volutpat.
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
							tincidunt ut laoreet dolore magna aliquam erat volutpat.
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
							tincidunt ut laoreet dolore magna aliquam erat volutpat.
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
							tincidunt ut laoreet dolore magna aliquam erat volutpat.
						</div>
						<div id="console-other" className="scrollableContainer consoleTab"/>
					</div>
				</div>
			</Window>
		);
	}

	componentDidMount() {
		console.log('Console initialized...');
	}
}