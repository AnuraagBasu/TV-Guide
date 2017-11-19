const moment = require( 'moment' );
const _ = require( 'lodash' );

import * as types from './types';
import { getChannelList, getChannelDetails, getLinearEvents } from '../config/urls';

export function fetchChannels() {
	return ( dispatch, getState ) => {
		dispatch( {
			type: types.FETCH_CHANNELS_IN_PROGRESS
		} );

		dispatch( getFavouriteChannels() );

		return fetch( getChannelList() )
			.then( resp => resp.json() )
			.then( resp => {
				//TODO: error handling
				dispatch( setChannels( resp.channels ) );
			} )
			.catch( err => {
				//TODO: error handling
				console.log( "error in fetching channels: " + JSON.stringify( err ) );
			} );
	};
}

export function sortChannels( sortBy ) {
	return ( dispatch, getState ) => {
		if ( sortBy == getState().sortBy ) {
			return;
		}

		dispatch( {
			type: types.SORT_CHANNELS,
			payload: {
				sortBy,
				channels: _.sortBy( getState().channels, [ sortBy ] )
			}
		} );
	};
}

export function markChannelAsFavourite( channelId ) {
	return ( dispatch, getState ) => {
		dispatch( {
			type: types.MARK_CHANNEL_AS_FAVOURITE,
			payload: {
				channelId
			}
		} );

		dispatch( persistFavouriteChannelsLocally( channelId ) );
	};
}

export function fetchChannelDetails( channelIds ) {
	return ( dispatch, getState ) => {
		dispatch( fetchChannelLinearEvents( channelIds ) );

		return fetch( getChannelDetails( channelIds ) )
			.then( resp => resp.json() )
			.then( resp => {
				//TODO: error handling
				dispatch( setChannelDetails( resp.channel ) );
			} )
			.catch( err => {
				//TODO: error handling
				console.log( "error in fetching channel details: " + JSON.stringify( err ) );
			} );
	};
}

export function fetchChannelLinearEvents( channelIds ) {
	return ( dispatch, getState ) => {
		let startTime = moment().format( "YYYY-MM-DD HH:mm" );
		let endTime = moment().add( 6, 'days' ).format( "YYYY-MM-DD HH:mm" );

		fetch( getLinearEvents( channelIds, startTime, endTime ) )
			.then( resp => resp.json() )
			.then( resp => {
				//TODO: error handling
				dispatch( setChannelLinearEvents( resp.getevent ) );
			} )
			.catch( err => {
				//TODO: error handling
				console.log( "error in fetching linear events: " + JSON.stringify( err ) );
			} );
	};
}

export function loadChannelData( count = 15 ) {
	return ( dispatch, getState ) => {
		let allChannels = getState().channels;
		let channelsToFetch = allChannels.slice( 0, count );
		let channelIds = [];
		_.forEach( channelsToFetch, ( channel ) => {
			channelIds.push( channel.channelId );
		} );

		dispatch( fetchChannelDetails( channelIds ) );
	};
}

function setChannels( channels ) {
	return ( dispatch, getState ) => {
		let favouriteChannelIds = getState().favouriteChannelIds;
		let filteredChannels = _.filter( channels, ( channel ) => {
			if ( channel.channelStbNumber > 0 ) {
				let isFavourite = false;
				if ( favouriteChannelIds.indexOf( channel.channelId ) != -1 ) {
					isFavourite = true;
				}

				channel.isFavourite = isFavourite;

				return channel;
			}
		} );

		filteredChannels = _.sortBy( filteredChannels, ( channel ) => {
			return channel.isFavourite != true;
		} );

		dispatch( {
			type: types.FETCH_CHANNELS_RESPONDED,
			payload: {
				channels: filteredChannels
			}
		} );
	};
}

function getFavouriteChannels() {
	return ( dispatch, getState ) => {
		let favouriteChannelIds = localStorage.getItem( "favouriteChannelIds" );
		if ( favouriteChannelIds ) {
			favouriteChannelIds = JSON.parse( favouriteChannelIds );
		} else {
			favouriteChannelIds = [];
		}

		dispatch( {
			type: types.SET_FAVOURITE_CHANNELS,
			payload: {
				favouriteChannelIds: favouriteChannelIds
			}
		} );
	};
}

function persistFavouriteChannelsLocally( channelId ) {
	return ( dispatch, getState ) => {
		localStorage.setItem( "favouriteChannelIds", JSON.stringify( getState().favouriteChannelIds ) );
	};
}

function setChannelDetails( channelDetails ) {
	return ( dispatch, getState ) => {
		dispatch( {
			type: types.SET_CHANNEL_DETAILS,
			payload: {
				channelDetails
			}
		} );
	};
}

function setChannelLinearEvents( events ) {
	return ( dispatch, getState ) => {
		events = _.groupBy( events, "channelId" );
		dispatch( {
			type: types.SET_CHANNEL_LINEAR_EVENTS,
			payload: {
				events
			}
		} );
	};
}