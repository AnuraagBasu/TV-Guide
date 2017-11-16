import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Glyphicon } from 'react-bootstrap';

import Styles from './styles.scss';

export default class SortController extends Component {
	render() {
		return (
			<Row className="sort-filter-container">
				<Col xs={6} sm={6} md={6} lg={6} className="section section-left">
					<div className="sortBy">
						<span className="label">Sort By</span>
						<Link to={"?sort_by=name"} className="sort-by-item" onClick={this.props.sort.bind( undefined, 'channelTitle' )}>Name</Link>
						<Link to={"?sort_by=number"} className="sort-by-item" onClick={this.props.sort.bind( undefined, 'channelStbNumber' )}>Number</Link>
					</div>
				</Col>
				<Col xs={6} sm={6} md={6} lg={6} className="section section-right">
					<div className="filters">
						<Link to={"?only_hd=" + !this.props.onlyHD} className="filter">
							<span>HD</span>
						</Link>

						<Link to={"?only_fav=" + !this.props.onlyFav} className="filter">
							<Glyphicon glyph="heart" className="heart-shape" />
						</Link>
					</div>
				</Col>
			</Row>
		);

		return (
			<div className="sort-controller">
				<div className="title">Sort By</div>
				<div className="item" onClick={this.props.sort.bind( undefined, 'channelTitle' )}>Name</div>
				<div className="item" onClick={this.props.sort.bind( undefined, 'channelStbNumber' )}>Number</div>
			</div>
		);
	}
}