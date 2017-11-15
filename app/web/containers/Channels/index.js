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
			console.log( "show here" );
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
						onToggleFavourite={this.props.markChannelAsFavourite.bind( undefined, channel.channelId )}
						onClick={this.props.fetchChannelDetails.bind( undefined, index )} />
				</Link>
			</Col>
		);
	}

	getChannelRouteURL( channelTitle, channelStbNumber ) {
		return "/" + channelTitle.split( " " ).join( "-" ) + "/" + channelStbNumber;
	}

	componentWillMount() {
		this.props.fetchChannels();
	}

	render() {
		console.log( "in render of Channels" );
		let content;
		let queryString = this.props.location.search;
		let queryParams = parseQueryString.parse( queryString );
		console.log( "queryParams: " + JSON.stringify( queryParams ) );
		let showFav = false;
		if ( this.props.channels.length ) {
			if ( queryParams.show_fav == "true" ) {
				showFav = true;
			}
			content = this.getChannels( showFav );
		} else {
			content = (
				<Col sm={1} lg={1}>Loading...</Col>
			);
		}

		return (
			<div>
				<Route path="/" component={() => {
					return (
						<Grid className="channels-container">
							<Row>
								<Col xs={8} sm={8} md={8} lg={8}>
									<SortController sort={this.props.sortChannels} />
								</Col>
								<Col xs={4} sm={4} md={4} lg={4}>
									<Link to={"?show_fav=" + !showFav}>
										<Glyphicon glyph="heart" className="heart-shape" />
									</Link>
								</Col>
							</Row>
							<Row>
								{content}
							</Row>
						</Grid>
					);
				}} />
				<Route exact path="/:channelTitle/:channelStbNumber" component={( props ) => {
					let channel = _.find( this.props.channels, { channelStbNumber: parseInt( props.match.params.channelStbNumber ) } );
					let linearEvents = this.props.linearEvents[ channel.channelId ];

					return (
						<div className="channel-desc-overlay">
							<ChannelDesc channel={channel} linearEvents={linearEvents} />
						</div>
					)
				}} />
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

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Channels ) );