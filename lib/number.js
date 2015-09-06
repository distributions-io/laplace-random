'use strict';

// MODULES //

var abs = Math.abs,
	ln = Math.log,
	sgn = require( 'compute-signum' );


// GENERATE LAPLACE RANDOM NUMBERS //

/**
* FUNCTION random( mu, b[, rand] )
*	Generates a random draw from a Laplace distribution with parameters `mu` and `b`.
*
* @param {Number} mu - location parameter
* @param {Number} b - scale parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Number} random draw from the specified distribution
*/
function random( mu, b, rand ) {
	var u;
	u = rand ? rand() : Math.random();
	u -= 0.5;
	return mu - b * sgn( u ) * ln( 1 - 2*abs(u) );
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
