import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import store, { history } from '../core/store';
import Root from './containers/Root';

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<Root />
				</Router>
			</Provider>
		);
	}
}