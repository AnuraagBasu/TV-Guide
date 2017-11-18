import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

const parseQueryString = require( 'query-string' );

import { ActionCreators } from '../../../core/actions';

import SortController from '../../components/SortController';
import DaySchedule from '../../components/DaySchedule';

import Styles from './styles.scss';
import Channel from '../../components/Channel/index';

class WhatsOn extends Component {
	constructor( props ) {
		super( props );
	}

	render() {
		let queryString = this.props.location.search;
		let queryParams = parseQueryString.parse( queryString );
		let sortBy = queryParams.sort_by;
		let onlyFav = false;
		let content;
		if ( this.props.channels.length ) {
			let scheduleToShow = this.props.linearEvents;
			let channelsInfo = this.props.channels;
			if ( queryParams.only_fav == "true" ) {
				onlyFav = true;
				channelsInfo = _.filter( this.props.channels, ( channel ) => {
					if ( this.props.linearEvents[ channel.channelId.toString() ] && channel.isFavourite ) {
						return true;
					}
				} );

				scheduleToShow = _.filter( this.props.linearEvents, ( channelEvents, channelId ) => {
					if ( this.props.favouriteChannelIds.indexOf( parseInt( channelId ) ) != -1 ) {
						return true;
					}
				} );
			} else {
				channelsInfo = _.filter( this.props.channels, ( channel ) => {
					if ( this.props.linearEvents[ channel.channelId.toString() ] ) {
						return true;
					}
				} );
			}

			content = (
				<Col>
					<DaySchedule schedule={this.props.linearEvents} channels={channelsInfo} />
				</Col>
			);
		} else {
			content = (
				<Col sm={1} lg={1}>Loading...</Col>
			);
		}

		return (
			<Grid className="whatson-container">
				<SortController sort={this.props.sortChannels} onlyFav={onlyFav} sortBy={sortBy} queryParams={queryParams} />

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
		channels: state.channels,
		linearEvents: state.linearEvents,
		favouriteChannelIds: state.favouriteChannelIds
	};
}

export default connect( mapStateToProps, mapDispatchToProps )( WhatsOn );