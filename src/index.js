import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Store from './store'
import App	from './app'
import './styles.css'

ReactDOM.render(
	<StrictMode>
		<Provider store={Store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</StrictMode>,
	document.getElementById('root')
);