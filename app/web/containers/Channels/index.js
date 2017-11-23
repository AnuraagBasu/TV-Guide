import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';
import { Grid, Row, Col, Clearfix, Glyphicon } from 'react-bootstrap';

const _ = require( 'lodash' );
const parseQueryString = require( 'query-string' );

import { ActionCreators } from '../../../core/actions';

import Channel from '../../components/Channel';
import SortController from '../../components/SortController';
import ChannelDesc from '../../components/ChannelDesc';

import Styles from './styles.scss';

class Channels extends Component {
	constructor( props ) {
		super( props );
	}

	getChannelLogo( channelNumber ) {
		return "https://astrocontent.s3.amazonaws.com/Images/ChannelLogo/Neg/" + channelNumber + ".png";
	}

	getChannels( showOnlyFavourites = false ) {
		if ( showOnlyFavourites ) {
			let favouriteChannels = [];
			_.forEach( this.props.channels, ( channel, index ) => {
				if ( channel.isFavourite ) {
					favouriteChannels.push( this.getChannel( channel, index ) );
				}
			} );

			return favouriteChannels;
		} else {
			return _.map( this.props.channels, this.getChannel.bind( this ) );
		}
	}

	getChannel( channel, index ) {
		return (
			<Col xs={4} md={3} key={'channel_' + channel.channelId} className="channel-container">
				<Link to={this.getChannelRouteURL( channel.channelTitle, channel.channelStbNumber )}>
					<Channel name={channel.channelTitle}
						number={channel.channelStbNumber}
						logo={this.getChannelLogo( channel.channelStbNumber )}
						isFavourite={channel.isFavourite}
						onToggleFavourite={this.props.markChannelAsFavourite.bind( undefined, channel.channelId )} />
				</Link>
			</Col>
		);
	}

	getChannelRouteURL( channelTitle, channelStbNumber ) {
		return "/channels/" + channelTitle.split( " " ).join( "-" ) + "/" + channelStbNumber;
	}

	render() {
		let content;
		let queryParams = parseQueryString.parse( this.props.location.search );
		let sortBy = queryParams.sort_by;
		let onlyFav = false;
		if ( this.props.isChannelsDetailedDataPresent && this.props.channels.length ) {
			if ( queryParams.only_fav == "true" ) {
				onlyFav = true;
			}

			content = this.getChannels( onlyFav );
		} else {
			content = (
				<Col sm={1} lg={1}>Loading...</Col>
			);
		}

		return (
			<Grid ref={( node ) => this._scrollableElement} className="channels-container">
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
		isChannelsDetailedDataPresent: state.isChannelsDetailedDataPresent
	};
}

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Channels ) );