import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';

const _ = require( 'lodash' );

import { ActionCreators } from '../../../core/actions';

import Channel from '../../components/Channel';

class Channels extends Component {
	constructor( props ) {
		super( props );
	}

	_getChannelLogo( channelNumber ) {
		return "https://astrocontent.s3.amazonaws.com/Images/ChannelLogo/Neg/" + channelNumber + "_100.png";
	}

	_getChannels() {
		return _.map( this.props.channels, ( channel ) => {
			return (
				<Col xs={4} md={3} key={'channel_' + channel.channelId}>
					<Channel name={channel.channelTitle}
						number={channel.channelStbNumber}
						logo={this._getChannelLogo( channel.channelStbNumber )} />
				</Col>
			);
		} );
	}

	componentWillMount() {
		this.props.fetchChannels();
	}

	render() {
		let content;
		if ( this.props.channels.length ) {
			content = this._getChannels();
		} else {
			content = (
				<Col sm={1} lg={1}>Loading...</Col>
			);
		}

		return (
			<Grid className="channels-container">
				<Row>
					{content}
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
		channels: state.channels
	};
}

export default connect( mapStateToProps, mapDispatchToProps )( Channels );