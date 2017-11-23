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

export function loadDataForChannel( channelStbNumber ) {
	return ( dispatch, getState ) => {
		dispatch( {
			type: types.FETCH_CHANNEL_DATA_IN_PROGRESS
		} );

		let channelToFetch = _.find( getState().channels, { channelStbNumber: channelStbNumber } );

		Promise.all( [ getChannelInfo( [ channelToFetch.channelId ] ), getChannelLinearEvents( [ channelToFetch.channelId ] ) ] )
			.then( data => {
				dispatch( setDetailedChannels( data[ 0 ], data[ 1 ] ) );
			} )
			.catch( err => {
				console.log( "error" );
			} );
	};
}

export function loadDataForChannels( count = 15 ) {
	return ( dispatch, getState ) => {
		dispatch( {
			type: types.FETCH_CHANNEL_DATA_IN_PROGRESS
		} );

		let channelsWithLinearEvents = Object.keys( getState().linearEvents );
		let allChannels = _.map( getState().channels, ( channel ) => {
			return channel.channelId.toString();
		} );
		let channelsToFetch = _.difference( allChannels, channelsWithLinearEvents ).slice( 0, count );

		Promise.all( [ getChannelInfo( channelsToFetch ), getChannelLinearEvents( channelsToFetch ) ] )
			.then( data => {
				dispatch( setDetailedChannels( data[ 0 ], data[ 1 ] ) );
			} )
			.catch( err => {
				console.log( "error" );
			} );
	};
}

function getChannelInfo( channelIds ) {
	return new Promise( ( resolve, reject ) => {
		fetch( getChannelDetails( channelIds ) )
			.then( resp => resp.json() )
			.then( resp => {
				//TODO: error handling
				resolve( resp.channel );
			} )
			.catch( err => {
				//TODO: error handling
				console.log( "error in fetching channel details: " + JSON.stringify( err ) );
				reject( err );
			} );
	} );
}

function getChannelLinearEvents( channelIds ) {
	return new Promise( ( resolve, reject ) => {
		let startTime = moment().startOf( 'day' ).format( "YYYY-MM-DD HH:mm" );
		let endTime = moment().add( 6, 'days' ).format( "YYYY-MM-DD HH:mm" );

		fetch( getLinearEvents( channelIds, startTime, endTime ) )
			.then( resp => resp.json() )
			.then( resp => {
				//TODO: error handling
				resolve( resp.getevent );
			} )
			.catch( err => {
				//TODO: error handling
				console.log( "error in fetching linear events: " + JSON.stringify( err ) );
				reject( err );
			} );
	} );
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

function setDetailedChannels( channelsInfo, channelLinearEvents ) {
	return ( dispatch, getState ) => {
		dispatch( {
			type: types.FETCH_CHANNEL_DATA_RESPONDED,
			payload: {
				channelsInfo,
				channelLinearEvents: _.groupBy( channelLinearEvents, "channelId" )
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