import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

const moment = require( 'moment' );

import Styles from './styles.scss';

const HOUR_WIDTH = 300;

export default class DaySchedule extends Component {

	getChannelLogo( channelNumber ) {
		return "https://astrocontent.s3.amazonaws.com/Images/ChannelLogo/Neg/" + channelNumber + ".png";
	}

	getSchedule() {
		return _.map( this.props.channels, ( channel ) => {
			return this.getEventsForChannel( channel.channelId );
		} );
	}

	getEventsForChannel( channelId ) {
		let channelTitle = "";
		let channelEvents = this.props.schedule[ channelId.toString() ];
		let events = [];
		_.forEach( channelEvents, ( event, index ) => {
			let eventTime = moment( event.displayDateTimeUtc ).local().unix();
			let timeAtMidnight = moment().endOf( "day" ).unix();

			if ( ( eventTime >= moment().unix() ) && ( eventTime <= timeAtMidnight ) ) {
				channelTitle = event.channelTitle;
				let key = "event_" + event.channelId + "_" + index;
				let eventDuration = event.displayDuration.split( ":" );
				let eventDurationInSecs = ( parseInt( eventDuration[ 0 ] ) * 60 * 60 ) + ( parseInt( eventDuration[ 1 ] ) * 60 ) + parseInt( eventDuration[ 2 ] );

				let eventStyles = {
					width: ( HOUR_WIDTH / ( 60 * 60 ) ) * eventDurationInSecs
				};

				events.push(
					<div key={key} className="channel-event" style={eventStyles}>
						<span>{event.programmeTitle}</span>
					</div>
				);
			}
		} );

		return (
			<div key={"channel_event_" + channelId} className="channel-events">
				{events}
			</div>
		);
	}

	getChannels() {
		return _.map( this.props.channels, ( channel ) => {
			return (
				<div key={"channel_" + channel.channelId} className="channel-info">
					<img src={this.getChannelLogo( channel.channelStbNumber )} />
					<div className="channel-info-name">{channel.channelTitle}</div>
					<div className="channel-info-number">CH - {channel.channelStbNumber}</div>
				</div>
			);
		} );
	}

	onScroll( event ) {
		let target = event.target;
		if ( target.id == "daySchedule" && ( ( target.scrollTop + target.offsetHeight ) > ( target.scrollHeight - 100 ) ) ) {
			this.props.onScrollEnd( event );
		}
	}

	getHourPieces() {
		let currentTime = moment().unix();
		let timeAtMidnight = moment().endOf( "day" ).unix();
		let hoursLeftTillMidnight = Math.floor( ( timeAtMidnight - currentTime ) / ( 60 * 60 ) );

		let hourPieces = [];
		for ( let i = 0; i < hoursLeftTillMidnight; i++ ) {
			hourPieces.push(
				<div key={'hour_pieces_' + i} style={{ width: HOUR_WIDTH, borderWidth: 1 }} className="event-hour-piece">
					{moment().add( i + 1, 'hours' ).format( "h A" )}
				</div>
			);
		}

		return hourPieces;
	}

	componentDidMount() {
		window.addEventListener( "scroll", this.onScroll.bind( this ), true );
	}

	componentWillUnmount() {
		window.removeEventListener( "scroll", this.onScroll.bind( this ) );
	}

	render() {
		return (
			<Row id="daySchedule" className="day-schedule">
				<Col>
					<div className="channels-info-container">
						<div className="channel-info-header"></div>
						{this.getChannels()}
					</div>

					<div className="events-container">
						<div className="channel-events-header">
							{this.getHourPieces()}
						</div>

						<div className="events">
							{this.getSchedule()}
						</div>
					</div>
				</Col>
			</Row>
		);
	}
}