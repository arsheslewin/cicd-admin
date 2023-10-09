import ReactDOM from 'react-dom/client';

import './i18n/i18n';

import App from './App';
import reportWebVitals from './reportWebVital';

import 'antd/dist/antd.min.css';
import 'virtual:uno.css';
import './styles/_app.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
