import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const channels = createReducer( {}, {
	[ types.FETCH_CHANNELS_RESPONDED ]( state, action ) {
		return action.payload.channels;
	}
} );