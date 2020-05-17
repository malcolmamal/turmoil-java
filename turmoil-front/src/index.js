import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from "react-intl";

// Application
import Turmoil from './components/Turmoil';

// styles
import './stylesheets/turmoil-general.css';
import './stylesheets/turmoil-windows.css';

// javascript
import './js/turmoil-general';
import './js/turmoil-tooltip';
import './js/turmoil-start';
import './js/turmoil-windows';

import locale_en from "./translations/en.json";
import locale_pl from "./translations/pl.json";

const data = {
	'en': locale_en,
	'pl': locale_pl
};

const language = navigator.language.split(/[-_]/)[0];

// ========================================

ReactDOM.render(
	<IntlProvider locale={language} messages={data[language]}>
		<Turmoil />
	</IntlProvider>,
	document.getElementById('root')
);
