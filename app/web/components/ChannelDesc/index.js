import React, { Component } from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';

import Styles from './styles.scss';

export default class ChannelDesc extends Component {
	//TODO: change
	getChannelLogo( channelNumber ) {
		return "https://astrocontent.s3.amazonaws.com/Images/ChannelLogo/Neg/" + channelNumber + ".png";
	}

	render() {
		let channel = this.props.channel;
		let channelHDTag;
		if ( channel.channelHD ) {
			channelHDTag = (
				<span className="tag tag-hd">HD</span>
			);
		}

		let heartClassNames = [ "like-btn" ];
		if ( channel.isFavourite ) {
			heartClassNames.push( "hearted" );
		}

		return (
			<Grid className="channel-details-container">
				<Row>
					<Col xs={12} sm={4} md={4} lg={4} className="channel-col">
						<div className="logo-container">
							<img src={this.getChannelLogo( channel.channelStbNumber )} />
							<div className="like-btn" className={heartClassNames.join( " " )} onClick={this.props.onToggleFavourite}>
								<Glyphicon glyph="heart" />
							</div>
						</div>
					</Col>
					<Col xs={12} sm={8} md={8} lg={8} className="channel-col">
						<Row>
							<Col sm={12} md={12} className="info-container">
								<div className="title">{channel.channelTitle} ({channel.channelStbNumber})</div>
							</Col>
							<Col sm={12} md={12} className="info-container">
								<div className="tags">
									<span className="tag tag-lang">{channel.channelLanguage}</span>
									<span className="tag tag-cat">{channel.channelCategory}</span>
									{channelHDTag}
								</div>
							</Col>
							<Col sm={12} md={12} className="info-container">
								<div className="channel-desc">
									<p>{channel.channelDescription}</p>
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
			</Grid>
		);
	}
}