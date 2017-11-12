import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const channels = createReducer( {}, {
	[ types.FETCH_CHANNELS_RESPONDED ]( state, action ) {
		return action.payload.channels;
	},
	[ types.SORT_CHANNELS ]( state, action ) {
		return action.payload.channels;
	},
	[ types.MARK_CHANNEL_AS_FAVOURITE ]( state, action ) {
		let channels = [ ...state ];
		_.forEach( channels, ( channel ) => {
			if ( channel.channelId == action.payload.channelId ) {
				channel.isFavourite = true;
			}
		} );

		return channels;
	}
} );

export const sortBy = createReducer( {}, {
	[ types.SORT_CHANNELS ]( state, action ) {
		return action.payload.sortBy;
	}
} );

export const favouriteChannelIds = createReducer( {}, {
	[ types.MARK_CHANNEL_AS_FAVOURITE ]( state, action ) {
		return [ ...state, action.payload.channelId ];
	},
	[ types.SET_FAVOURITE_CHANNELS ]( state, action ) {
		return action.payload.favouriteChannelIds;
	}
} );