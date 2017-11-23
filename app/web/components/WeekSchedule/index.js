import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const moment = require( 'moment' );

import styles from './styles.scss';

export default class WeekSchedule extends Component {
	constructor( props ) {
		super( props );
	}

	getEventItem( event ) {
		return (
			<Row key={'event_' + event.eventID} className="event-row">
				<Col sm={6} md={1}>
					<div>{moment.utc( event.displayDateTimeUtc ).local().format( "hh:mm A" )}</div>
				</Col>
				<Col sm={6} md={2}>
					<div>{event.programmeTitle}</div>
				</Col>
				<Col sm={12} md={9}>
					<div>{event.shortSynopsis}</div>
				</Col>
			</Row>
		);
	}

	whichDayIsIt( date ) {
		return moment( date ).format( "ddd,D,MMM" );
	}

	prepareSchedule() {
		let tabs = {
			headers: {},
			events: {}
		};

		_.forEach( this.props.schedule, ( event ) => {
			let currentTime = new Date();
			let eventTime = new Date( event.displayDateTimeUtc );
			let eventDay = this.whichDayIsIt( eventTime );

			if ( !tabs.headers[ eventDay ] ) {
				tabs.headers[ eventDay ] = (
					<Tab key={"tab_" + eventDay} className="tab-day">{eventDay}</Tab>
				);
			}

			if ( !tabs.events[ eventDay ] ) {
				tabs.events[ eventDay ] = [];
			}

			tabs.events[ eventDay ].push( this.getEventItem( event ) );
		} );

		let tabHeaders = [];
		let tabPanels = [];
		_.forOwn( tabs.headers, ( header, key ) => {
			tabHeaders.push( header );
			tabPanels.push(
				<TabPanel key={"tab_panel_" + key}>
					{tabs.events[ key ]}
				</TabPanel>
			);
		} );

		return {
			headers: tabHeaders,
			panels: tabPanels
		};
	}

	render() {
		let data = this.prepareSchedule();

		return (
			<Tabs className="channel-schedule">
				<TabList className="tab-header-list">
					{data.headers}
				</TabList>

				{data.panels}
			</Tabs>
		);
	}
}