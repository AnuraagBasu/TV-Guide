import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const moment = require( 'moment' );

import styles from './styles.scss';

export default class WeekSchedule extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			activeTab: ""
		};
	}

	getEventItem( event ) {
		return (
			<Row key={'event_' + event.eventID} className="event-row">
				<Col sm={6} md={2}>
					<div>{moment( event.displayDateTimeUtc ).format( "hh:mm A" )}</div>
				</Col>
				<Col sm={6} md={2}>
					<div>{event.programmeTitle}</div>
				</Col>
				<Col sm={12} md={8}>
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

		this.tabHeaders = [];
		this.tabPanels = [];
		_.forOwn( tabs.headers, ( header, key ) => {
			this.tabHeaders.push( header );
			this.tabPanels.push(
				<TabPanel key={"tab_panel_" + key}>
					{tabs.events[ key ]}
				</TabPanel>
			);
		} );
	}

	componentWillMount() {
		this.prepareSchedule();
	}

	render() {
		return (
			<Tabs className="channel-schedule">
				<TabList className="tab-header-list">
					{this.tabHeaders}
				</TabList>

				{this.tabPanels}
			</Tabs>
		);
	}
}