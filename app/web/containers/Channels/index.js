import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ActionCreators } from '../../../core/actions';

class Channels extends Component {
	constructor( props ) {
		super( props );
	}

	render() {
		console.log( "in render of Channels" );
		return (
			<div>
				<span>This is the "Channels" tab</span>
			</div>
		);
	}
}

function mapDispatchToProps( dispatch ) {
	return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
	return {

	};
}

export default connect( mapStateToProps, mapDispatchToProps )( Channels );