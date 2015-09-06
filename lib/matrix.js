'use strict';

// MODULES //

var matrix = require( 'dstructs-matrix' ),
	partial = require( './partial.js' );


// RANDOM //

/**
* FUNCTION: random( dims, dt, mu, b[, rand] )
*	Creates a matrix of Laplace distributed random numbers.
*
* @param {Number[]} dims - dimensions
* @param {String} dt - data type
* @param {Number} mu - location parameter
* @param {Number} b - scale parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Matrix} matrix filled with Laplace random numbers
*/
function random( dims, dt, mu, b, rand ) {
	var out,
		draw,
		i;

	draw = partial( mu, b, rand );
	out = matrix( dims, dt );
	for ( i = 0; i < out.length; i++ ) {
		out.data[ i ] = draw();
	}
	return out;
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
