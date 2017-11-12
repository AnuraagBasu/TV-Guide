import * as types from './types';
import { getChannelList, getChannelDetails } from '../config/urls';

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

export function fetchChannelDetails( channelIndex ) {
	return ( dispatch, getState ) => {
		let allChannels = getState().channels;
		let channelsToFetch = [];
		if ( allChannels[ channelIndex ] && !allChannels[ channelIndex ].channelDescription ) {
			channelsToFetch.push( allChannels[ channelIndex ].channelId );
		}

		if ( allChannels[ channelIndex - 1 ] && !allChannels[ channelIndex - 1 ].channelDescription ) {
			channelsToFetch.push( allChannels[ channelIndex - 1 ].channelId );
		}

		if ( allChannels[ channelIndex + 1 ] && !allChannels[ channelIndex + 1 ].channelDescription ) {
			channelsToFetch.push( allChannels[ channelIndex + 1 ].channelId );
		}

		if ( channelsToFetch.length ) {
			return fetch( getChannelDetails( channelsToFetch ) )
				.then( resp => resp.json() )
				.then( resp => {
					//TODO: error handling
					dispatch( setChannelDetails( resp.channel ) );
				} )
				.catch( err => {
					//TODO: error handling
					console.log( "error in fetching channel details: " + JSON.stringify( err ) );
				} );
		}
	};
}

function setChannels( channels ) {
	return ( dispatch, getState ) => {
		dispatch( {
			type: types.FETCH_CHANNELS_RESPONDED,
			payload: {
				channels: _.filter( channels, ( channel ) => {
					if ( channel.channelStbNumber > 0 ) {
						let favouriteChannelIds = getState().favouriteChannelIds;
						let isFavourite = false;
						if ( favouriteChannelIds.indexOf( channel.channelId ) != -1 ) {
							isFavourite = true;
						}

						channel.isFavourite = isFavourite;

						return channel;
					}
				} )
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