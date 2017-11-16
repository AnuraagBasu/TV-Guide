import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Glyphicon } from 'react-bootstrap';

import Styles from './styles.scss';

export default class SortController extends Component {
	render() {
		let favFilterClass = [ "filter" ];
		if ( this.props.onlyFav ) {
			favFilterClass.push( "selected" );
		}

		let nameSortClass = [ "sort-by-item" ];
		let numberSortClass = [ "sort-by-item" ];
		if ( this.props.sortBy == "name" ) {
			nameSortClass.push( "selected" );
		} else if ( this.props.sortBy == "number" ) {
			numberSortClass.push( "selected" );
		}

		return (
			<Row className="sort-filter-container">
				<Col xs={6} sm={6} md={6} lg={6} className="section section-left">
					<div className="sortBy">
						<span className="label">Sort By</span>
						<Link to={"?sort_by=name"} className={nameSortClass.join( " " )} onClick={this.props.sort.bind( undefined, 'channelTitle' )}>Name</Link>
						<Link to={"?sort_by=number"} className={numberSortClass.join( " " )} onClick={this.props.sort.bind( undefined, 'channelStbNumber' )}>Number</Link>
					</div>
				</Col>
				<Col xs={6} sm={6} md={6} lg={6} className="section section-right">
					<div className="filters">
						<Link to={"?only_fav=" + !this.props.onlyFav} className={favFilterClass.join( " " )}>
							<Glyphicon glyph="heart" className="heart-shape" />
						</Link>
					</div>
				</Col>
			</Row>
		);
	}
}