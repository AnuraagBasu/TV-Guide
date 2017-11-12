import React, { Component } from 'react';

import Styles from './styles.scss';

export default class SortController extends Component {
	render() {
		return (
			<div className="sort-controller">
				<div className="title">Sort By</div>
				<div className="item" onClick={this.props.sort.bind( undefined, 'channelTitle' )}>Name</div>
				<div className="item" onClick={this.props.sort.bind( undefined, 'channelStbNumber' )}>Number</div>
			</div>
		);
	}
}