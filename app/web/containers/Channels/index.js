import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';

const _ = require( 'lodash' );

import { ActionCreators } from '../../../core/actions';

import Channel from '../../components/Channel';
import SortController from '../../components/SortController';

import Styles from './styles.css';

class Channels extends Component {
	constructor( props ) {
		super( props );
	}

	getChannelLogo( channelNumber ) {
		return "https://astrocontent.s3.amazonaws.com/Images/ChannelLogo/Neg/" + channelNumber + ".png";
	}

	getChannels() {
		return _.map( this.props.channels, ( channel ) => {
			return (
				<Col xs={4} md={3} key={'channel_' + channel.channelId} className="channel-container">
					<Channel name={channel.channelTitle}
						number={channel.channelStbNumber}
						logo={this.getChannelLogo( channel.channelStbNumber )}
						onToggleFavourite={this.props.markChannelAsFavourite.bind( undefined, channel.channelId )} />
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
			content = this.getChannels();
		} else {
			content = (
				<Col sm={1} lg={1}>Loading...</Col>
			);
		}

		return (
			<Grid className="channels-container">
				<Row>
					<Col sm={12} lg={12}>
						<SortController sort={this.props.sortChannels} />
					</Col>
				</Row>
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