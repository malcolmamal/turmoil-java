import React from 'react';
import ReactDOM from 'react-dom';

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

// ========================================

ReactDOM.render(
  <Turmoil />,
  document.getElementById('root')
);
