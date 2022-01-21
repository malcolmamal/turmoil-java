// turmoil-init
import './js/turmoil-init';

// react
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

// redux
import {Provider} from "react-redux";
import store from "./js/redux/store/index";

// localization
import {IntlProvider} from "react-intl";
import locale_en from "./translations/en.json";
import locale_pl from "./translations/pl.json";

// application
import {WrappedTurmoil} from './components/WrappedTurmoil';

const data = {
	'en': locale_en,
	'pl': locale_pl
};

const language = navigator.language.split(/[-_]/)[0];

// ========================================

ReactDOM.render(
	<Provider store={store}>
		<IntlProvider locale={language} messages={data[language]}>
			<BrowserRouter>
				<WrappedTurmoil />
			</BrowserRouter>
		</IntlProvider>
	</Provider>,
	document.getElementById('root')
);
