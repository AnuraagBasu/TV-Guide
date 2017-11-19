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
	},
	[ types.SET_CHANNEL_DETAILS ]( state, action ) {
		let updatedChannels = [ ...state ];
		_.forEach( action.payload.channelDetails, ( channel ) => {
			let channelIndex = _.findIndex( updatedChannels, { channelId: channel.channelId } );
			let updatedChannelInfo = Object.assign( channel, updatedChannels[ channelIndex ] );
			updatedChannels.splice( channelIndex, 1, updatedChannelInfo );
		} );

		return updatedChannels;
	},
	[ types.SET_CHANNEL_LINEAR_EVENTS ]( state, action ) {
		let updatedChannels = [ ...state ];
		_.forEach( updatedChannels, ( channel ) => {
			let allEvents = action.payload.events;
			let eventsToBeUpdated = _.find( allEvents, ( channelEvents, channelId ) => {
				if ( channel.channelId == parseInt( channelId ) ) {
					return true;
				}
			} );

			if ( eventsToBeUpdated ) {
				channel.linearEvents = allEvents[ channel.channelId.toString() ];
			}
		} );

		return updatedChannels;
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

export const linearEvents = createReducer( {}, {
	[ types.SET_CHANNEL_LINEAR_EVENTS ]( state, action ) {
		let newState = Object.assign( {}, state );
		_.forOwn( action.payload.events, ( channelEvents, channelId ) => {
			newState[ channelId ] = channelEvents;
		} );

		return newState;
	}
} );