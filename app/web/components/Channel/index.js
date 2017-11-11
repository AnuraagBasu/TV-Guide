import React, { Component } from 'react';

import Styles from './styles.css';

export default class Channel extends Component {
	render() {
		return (
			<div className="channel">
				<img src={this.props.logo} className="image-container" />
				<div>{this.props.name}</div>
				<div>{this.props.number}</div>
			</div>
		);
	}
}