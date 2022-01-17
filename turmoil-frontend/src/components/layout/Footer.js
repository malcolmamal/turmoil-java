import React from "react";
import {FormattedMessage} from "react-intl";

export default class Footer extends React.Component
{
	render() {
		const spinnerDisplayStyle = {
			display: 'none',
		}

		return (
			<div id="turmoilFooter" className="turmoilFooter" role="contentinfo">
				<div className="footerBlock">
					<FormattedMessage id="turmoil.footer.logout" /> - (logged as application.loggedAccount.username)
				</div>
				<div id="spinner" className="spinner" style={spinnerDisplayStyle}><FormattedMessage id="turmoil.footer.loading" />&hellip;</div>
			</div>
		);
	}
}