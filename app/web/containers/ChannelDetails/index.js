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
		let filteredEvents = _.filter( this.props.linearEvents, ( event ) => {
			let eventTime = moment.utc( event.displayDateTimeUtc );
			let isEventInFuture = eventTime.diff( moment.utc(), "days" );
			if ( isEventInFuture == 0 ) {
				if ( eventTime.diff( moment.utc(), "hours" ) >= 0 ) {
					return true;
				}
			} else if ( isEventInFuture > 0 ) {
				return true;
			}
		} );

		return filteredEvents;
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