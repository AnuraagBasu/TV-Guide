import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import { ActionCreators } from '../../../core/actions';

import DaySchedule from '../../components/DaySchedule';

import Styles from './styles.scss';

class WhatsOn extends Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<Grid className="whatson-container">
				<Row>
					<Col>
						<DaySchedule schedule={this.props.linearEvents} channels={this.props.channels} />
					</Col>
				</Row>
			</Grid>
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

export default connect( mapStateToProps, mapDispatchToProps )( WhatsOn );