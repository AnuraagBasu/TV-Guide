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
						channels: resp.channels
					}
				} );
			} )
			.catch( err => {
				//TODO: handle error
				console.log( "error in fetching channels: " + JSON.stringify( err ) );
			} );
	};
}