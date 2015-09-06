'use strict';

// MODULES //

var partial = require( './partial.js' ),
	recurse = require( './recurse.js' );


// RANDOM //

/**
* FUNCTION: random( dims, mu, b[, rand] )
*	Creates a multidimensional array of Laplace distributed random numbers.
*
* @param {Number[]} dims - dimensions
* @param {Number} mu - location parameter
* @param {Number} b - scale parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Array} multidimensional array filled with Laplace random numbers
*/
function random( dims, mu, b, rand ) {
	var draw = partial( mu, b, rand );
	return recurse( dims, 0, draw );
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
