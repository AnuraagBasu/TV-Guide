import * as types from './types';

export function fetchChannels() {
	return ( dispatch, getState ) => {
		dispatch( {
			type: types.FETCH_CHANNELS_IN_PROGRESS
		} );

		return fetch( "http://ams-api.astro.com.my/ams/v3/getChannelList" )
			.then( resp => resp.json() )
			.then( resp => {
				//TODO: handle different error codes
				dispatch( {
					type: types.FETCH_CHANNELS_RESPONDED,
					payload: {
						channels: _.filter( resp.channels, ( channel ) => {
							return channel.channelStbNumber > 0;
						} )
					}
				} );
			} )
			.catch( err => {
				//TODO: handle error
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
		let favouriteChannel = _.find( getState().channels, { channelId } );

		dispatch( {
			type: types.MARK_CHANNEL_AS_FAVOURITE,
			payload: {
				channel: favouriteChannel
			}
		} );
	};
}