import React from "react";

export default class Footer extends React.Component
{
	render() {
		const spinnerDisplayStyle = {
			display: 'none',
		}

		return (
			<div id="turmoilFooter" className="turmoilFooter" role="contentinfo">
				<div className="footerBlock">
					Logout - (logged as application.loggedAccount.username)
				</div>
				<div id="spinner" className="spinner" style={spinnerDisplayStyle}>Loading&hellip;</div>
			</div>
		);
	}
}