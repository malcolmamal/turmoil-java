import React from "react";
import Header from "./Header";
import Window from "./Window";
import Footer from "./Footer";

export default class Turmoil extends React.Component
{
	render() {
		return (
			<div>
				<Header/>

				<div className="turmoilContainer">
					<div id="turmoilBody" className="turmoilBody">
						<div id="shadows">
							<div className="shadowTop"/>
							<div className="shadowLeft"/>
							<div className="shadowRight"/>
							<div className="shadowBottom"/>
						</div>

						<Window/>
					</div>
				</div>

				<Footer/>
			</div>
		);
	}
}