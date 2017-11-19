import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const parseQueryString = require( 'query-string' );

import { ActionCreators } from '../../../core/actions';

import ChannelDesc from '../../components/ChannelDesc';

import Styles from './styles.scss';

class ChannelDetails extends Component {
	constructor( props ) {
		super( props );
	}

	shouldComponentUpdate( nextProps ) {
		if ( !this.props.channel.linearEvents && nextProps.channel.linearEvents ) {
			return true;
		}

		return false;
	}

	render() {
		return (
			<div className="channel-desc-container">
				<ChannelDesc channel={this.props.channel} />
			</div>
		);
	}
}

function mapDispatchToProps( dispatch ) {
	return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state, props ) {
	return {
		channel: _.find( state.channels, { channelStbNumber: parseInt( props.match.params.channelStbNumber ) } )
	};
}

export default connect( mapStateToProps, mapDispatchToProps )( ChannelDetails );