import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Link, Switch, withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { ActionCreators } from '../../core/actions';

import Channels from './Channels';
import WhatsOn from './WhatsOn';
import ChannelDesc from '../components/ChannelDesc';

import Styles from '../index.scss';

class Root extends Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<div>
				<Grid className="page">
					<Row className="menu">
						<Col>
							<div className="contained">
								<Link to="/channels" className="menu-item">Channels</Link>
								<Link to="/whatson" className="menu-item">WhatsOn</Link>
							</div>
						</Col>
					</Row>

					<Row className="content">
						<Col>
							<div className="contained">
								<Route exact path="/channels" component={Channels} />
								<Route exact path="/channels/:channelTitle/:channelStbNumber" component={( props ) => {
									let channel = _.find( this.props.channels, { channelStbNumber: parseInt( props.match.params.channelStbNumber ) } );
									let linearEvents = this.props.linearEvents[ channel.channelId ];

									return (
										<ChannelDesc channel={channel} linearEvents={linearEvents} />
									);
								}} />
								<Route exact path="/whatson" component={WhatsOn} />
							</div>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

function mapDispatchToProps( dispatch ) {
	return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
	return {
		channels: state.channels,
		linearEvents: state.linearEvents
	};
}

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Root ) );