import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const parseQueryString = require( 'query-string' );
const moment = require( 'moment' );

import { ActionCreators } from '../../../core/actions';

import ChannelDesc from '../../components/ChannelDesc';

import Styles from './styles.scss';

class ChannelDetails extends Component {
	constructor( props ) {
		super( props );
	}

	getLinearEventsToShow() {
		let today = moment().format( "ddd,D,MMM" );
		let allEvents = Object.assign( {}, this.props.linearEvents );
		let eventsForToday = _.filter( allEvents[ today ], ( event ) => {
			let eventTime = moment.utc( event.displayDateTimeUtc ).local();
			if ( eventTime.diff( moment(), "hours" ) >= 0 ) {
				return true;
			}

			return false;
		} );
		allEvents[ today ] = eventsForToday;

		return allEvents;
	}

	componentWillMount() {
		if ( !this.props.channel || ( this.props.channel && !this.props.channel.channelDescription ) ) {
			this.props.loadDataForChannel( parseInt( this.props.match.params.channelStbNumber ) );
		}
	}

	render() {
		return (
			<div className="channel-desc-container">
				<ChannelDesc channel={this.props.channel} linearEvents={this.getLinearEventsToShow()} />
			</div>
		);
	}
}

function mapDispatchToProps( dispatch ) {
	return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state, props ) {
	let channel = _.find( state.channels, { channelStbNumber: parseInt( props.match.params.channelStbNumber ) } );
	return {
		channel: channel,
		linearEvents: state.linearEvents[ channel.channelId.toString() ] || []
	};
}

export default connect( mapStateToProps, mapDispatchToProps )( ChannelDetails );