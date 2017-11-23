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

	onScrollEnd( event ) {
		event.stopPropagation();
		if ( !this.props.isChannelsDetailedDataPresent ) {
			event.preventDefault();
		} else {
			this.props.loadDataForChannels();
		}
	}

	prepareDataForDayScheduler( channels, linearEvents, onlyFavourites = false ) {
		this.channelsInfo = [];
		this.scheduleToShow = {};
		if ( !_.isEmpty( linearEvents ) ) {
			_.forEach( channels, ( channel ) => {
				let channelsToShow = Object.keys( linearEvents );

				if ( onlyFavourites ) {
					if ( ( channelsToShow.indexOf( channel.channelId.toString() ) != -1 ) && channel.isFavourite ) {
						this.channelsInfo.push( {
							channelId: channel.channelId,
							channelStbNumber: channel.channelStbNumber,
							channelTitle: channel.channelTitle
						} );

						this.scheduleToShow[ channel.channelId ] = linearEvents[ channel.channelId.toString() ];
					}
				} else {
					if ( channelsToShow.indexOf( channel.channelId.toString() ) != -1 ) {
						this.channelsInfo.push( {
							channelId: channel.channelId,
							channelStbNumber: channel.channelStbNumber,
							channelTitle: channel.channelTitle
						} );

						this.scheduleToShow[ channel.channelId ] = linearEvents[ channel.channelId.toString() ];
					}
				}
			} );
		}
	}

	componentWillMount() {
		this.prepareDataForDayScheduler( this.props.channels, this.props.linearEvents );
	}

	componentWillReceiveProps( nextProps ) {
		if ( ( this.props.location.search != nextProps.location.search ) ||
			( Object.keys( this.props.linearEvents ).length != Object.keys( nextProps.linearEvents ).length ) ) {
			let queryString = nextProps.location.search;
			let queryParams = parseQueryString.parse( queryString );
			let showOnlyFavourites = false;
			if ( queryParams.only_fav == "true" ) {
				showOnlyFavourites = true;
			}

			this.prepareDataForDayScheduler( nextProps.channels, nextProps.linearEvents, showOnlyFavourites );
		}
	}

	render() {
		let queryString = this.props.location.search;
		let queryParams = parseQueryString.parse( queryString );
		let sortBy = queryParams.sort_by;
		let onlyFav = queryParams.only_fav;
		let content;

		if ( !_.isEmpty( this.props.linearEvents ) ) {
			let loader;
			if ( !this.props.isChannelsDetailedDataPresent ) {
				loader = (
					<div>Loading...</div>
				);
			}

			content = (
				<Col>
					<DaySchedule schedule={this.scheduleToShow} channels={this.channelsInfo} onScrollEnd={this.onScrollEnd.bind( this )} />

					{loader}
				</Col>
			);
		} else {
			content = (
				<Col sm={1} lg={1}>Loading...</Col>
			);
		}

		return (
			<Grid className="whatson-container">
				<SortController sort={this.props.sortChannels} onlyFav={onlyFav == "true"} sortBy={sortBy} queryParams={queryParams} />

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
		isChannelsDetailedDataPresent: state.isChannelsDetailedDataPresent
	};
}

export default connect( mapStateToProps, mapDispatchToProps )( WhatsOn );