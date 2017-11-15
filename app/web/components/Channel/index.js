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
				<div>{this.props.name}</div>
				<div>{this.props.number}</div>

				<div className="like-btn" className={heartClassNames.join( " " )} onClick={this.props.onToggleFavourite}>
					<Glyphicon glyph="heart" />
				</div>
			</div>
		);
	}
}