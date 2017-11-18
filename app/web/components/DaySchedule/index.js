import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import Styles from './styles.scss';

const WIDTH = 300;

export default class DaySchedule extends Component {

	getChannelLogo( channelNumber ) {
		return "https://astrocontent.s3.amazonaws.com/Images/ChannelLogo/Neg/" + channelNumber + ".png";
	}

	getSchedule() {
		return (
			<div className="events-container">
				{
					_.map( this.props.schedule, ( channel ) => {
						return this.getEventsForChannel( channel );
					} )
				}
			</div>
		);
	}

	getEventsForChannel( channelEvents ) {
		let channelTitle = "";
		let events = _.map( channelEvents, ( event, index ) => {
			channelTitle = event.channelTitle;
			let key = "event_" + event.channelId + "_" + index;
			let eventDuration = event.displayDuration.split( ":" );
			let eventDurationInSecs = ( parseInt( eventDuration[ 0 ] ) * 60 * 60 ) + ( parseInt( eventDuration[ 1 ] ) * 60 ) + parseInt( eventDuration[ 2 ] );

			let eventStyles = {
				width: ( WIDTH / ( 60 * 60 ) ) * eventDurationInSecs
			};

			return (
				<div key={key} className="channel-event" style={eventStyles}>
					<span>{event.programmeTitle}</span>
				</div>
			);
		} );

		return (
			<div className="channel-events">
				{events}
			</div>
		);
	}

	getChannels() {
		let channelsWithEvents = Object.keys( this.props.schedule );
		let channelsToShow = [];
		_.forEach( this.props.channels, ( channel ) => {
			if ( channelsWithEvents.indexOf( channel.channelId.toString() ) != -1 ) {
				channelsToShow.push(
					<div className="channel-info">
						<img src={this.getChannelLogo( channel.channelStbNumber )} />
						<div>{channel.channelTitle}</div>
					</div>
				);
			}
		} );

		return (
			<div className="channels-info-container">
				{channelsToShow}
			</div>
		);
	}

	render() {
		return (
			<Row className="day-schedule">
				<Col>
					{this.getChannels()}

					{this.getSchedule()}
				</Col>
			</Row>
		);

		return (
			<Row className="day-schedule">
				<Col xs={2} sm={2} md={2} lg={2}>
					{this.getChannels()}
				</Col>
				<Col xs={10} sm={10} md={10} lg={10}>
					{this.getSchedule()}
				</Col>
			</Row>
		);
	}
}