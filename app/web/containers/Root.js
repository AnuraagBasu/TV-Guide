import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Link, Switch, withRouter } from 'react-router-dom';

import { ActionCreators } from '../../core/actions';

import Channels from './Channels';
import WhatsOn from './WhatsOn';
import ChannelDesc from '../components/ChannelDesc';

class Root extends Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<div>
				<div className="menu">
					<Link to="/channels" className="menu-item">Channels</Link>
					<Link to="/tv-guide" className="menu-item">TV Guide</Link>
				</div>
				<div className="main-content">
					<Route exact path="/channels" component={Channels} />
					<Route exact path="/channels/:channelTitle/:channelStbNumber" component={( props ) => {
						let channel = _.find( this.props.channels, { channelStbNumber: parseInt( props.match.params.channelStbNumber ) } );
						let linearEvents = this.props.linearEvents[ channel.channelId ];

						return (
							<ChannelDesc channel={channel} linearEvents={linearEvents} />
						);
					}} />
					<Route exact path="/tv-guide" component={WhatsOn} />
				</div>
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