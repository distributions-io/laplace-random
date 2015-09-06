'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isNumber = require( 'validate.io-number-primitive' ),
	isPositive = require( 'validate.io-positive' ),
	isPositiveInteger = require( 'validate.io-positive-integer' ),
	isString = require( 'validate.io-string-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {Number} [options.mu] - location parameter
* @param {Number} [options.b] - scale parameter
* @param {String} [options.dtype] - output data type
* @param {Number} [options.seed] - integer-valued seed
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'random()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'mu' ) ) {
		opts.mu = options.mu;
		if ( !isNumber( opts.mu ) ) {
			return new TypeError( 'random()::invalid option. `mu` parameter must be a number primitive. Option: `' + opts.mu + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'b' ) ) {
		opts.b = options.b;
		if ( !isPositive( opts.b ) ) {
			return new TypeError( 'random()::invalid option. `b` parameter must be a positive number. Option: `' + opts.b + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'dtype' ) ) {
		opts.dtype = options.dtype;
		if ( !isString( opts.dtype ) ) {
			return new TypeError( 'random()::invalid option. Data type option must be a string primitive. Option: `' + opts.dtype + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'seed' ) ) {
		opts.seed = options.seed;
		if ( !isPositiveInteger( opts.seed ) ) {
			return new TypeError( 'random()::invalid option. Seed option must be a positive integer. Option: `' + opts.seed + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
