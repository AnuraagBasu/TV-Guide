import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import createHistory from 'history/createBrowserHistory';
import reducer from '../reducers';

export const history = createHistory();

function getStore( initialState ) {
	const enhancer = compose(
		applyMiddleware(
			thunkMiddleware,
			createLogger()
		)
	);

	return createStore( reducer, initialState, enhancer );
}

const initialState = {

};

export default getStore( initialState );