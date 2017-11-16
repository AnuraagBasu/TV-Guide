import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';

import Styles from './styles.scss';

export default class Channel extends Component {
	render() {
		let heartClassNames = [ "like-btn" ];
		if ( this.props.isFavourite ) {
			heartClassNames.push( "hearted" );
		}

		return (
			<div className="channel" onClick={this.props.onClick}>
				<img src={this.props.logo} className="image-container" />
				<div className="info">
					<span>{this.props.name}</span>
					<span>{this.props.number}</span>
				</div>

				<div className="like-btn" className={heartClassNames.join( " " )} onClick={this.props.onToggleFavourite}>
					<Glyphicon glyph="heart" />
				</div>
			</div>
		);
	}
}