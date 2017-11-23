import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import Styles from './styles.scss';

const WIDTH = 300;

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
						{this.getChannels()}
					</div>

					<div className="events-container">
						{this.getSchedule()}
					</div>
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