import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Link, Switch, withRouter } from 'react-router-dom';

import { ActionCreators } from '../../core/actions';

import Channels from './Channels';
import WhatsOn from './WhatsOn';

class Root extends Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<div>
				<h1>Simple SPA</h1>
				<ul className="header">
					<li><Link to="/channels">Channels</Link></li>
					<li><Link to="/whatson">WhatsOn</Link></li>
				</ul>
				<div className="content">
					<Route exact path="/channels" component={Channels} />
					<Route exact path="/whatson" component={WhatsOn} />
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

	};
}

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Root ) );