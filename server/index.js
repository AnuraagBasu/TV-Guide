const express = require( 'express' );
const app = express();
const path = require( 'path' );

app.use( express.static( path.resolve( __dirname, '..', 'app/web' ) ) );
app.use( express.static( path.resolve( __dirname, '..', 'node_modules' ) ) );
app.use( function ( err, req, res, next ) {
	console.error( err );
	console.error( err.stack );
	res.status( err.status || 500 ).send( err.message || 'Internal server error.' );
} );

app.get( '*', function ( request, response ) {
	response.sendFile( path.resolve( __dirname, '..', 'app/web/', 'index.html' ) )
} );

app.listen( process.env.PORT || 3000, function () {
	console.log( "connected on port 3000" );
} );