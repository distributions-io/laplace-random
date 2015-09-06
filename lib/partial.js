'use strict';

// FUNCTIONS //

var abs = Math.abs,
	ln = Math.log,
	sgn = require( 'compute-signum' );


// PARTIAL //

/**
* FUNCTION: partial( sigma[, rand] )
*	Partially applies `mu` and `b` and returns a function to generate random numbers from the Laplace distribution.
*
* @param {Number} mu - location parameter
* @param {Number} b - scale parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Function} function which generates random draws from the specified distribution
*/
function partial( mu, b, rand ) {
	var random;
	if ( rand ) {
		random = rand;
	} else {
		random = Math.random;
	}
	/**
	* FUNCTION: draw( x )
	*	Generates a random draw for a Laplace distribution with parameters `mu` and `b`.
	*
	* @private
	* @returns {Number} random draw from the specified distribution
	*/
	return function draw() {
		var u = random();
		u -= 0.5;
		return mu - b * sgn( u ) * ln( 1 - 2*abs(u) );
	}; // end FUNCTION draw()
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
