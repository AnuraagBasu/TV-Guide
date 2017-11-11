import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const channels = createReducer( {}, {
	[ types.FETCH_CHANNELS_RESPONDED ]( state, action ) {
		return action.payload.channels;
	},
	[ types.SORT_CHANNELS ]( state, action ) {
		return action.payload.channels;
	}
} );

export const sortBy = createReducer( {}, {
	[ types.SORT_CHANNELS ]( state, action ) {
		return action.payload.sortBy;
	}
} );

export const favouriteChannels = createReducer( {}, {
	[ types.MARK_CHANNEL_AS_FAVOURITE ]( state, action ) {
		return [ ...state, action.payload.channel ];
	}
} );