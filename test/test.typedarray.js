/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	random = require( './../lib/typedarray.js' ),

	// Module to calculate the mean
	mean = require( 'compute-mean' ),

	// Kolmogorov-Smirnov test
	kstest = require( 'compute-kstest' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'random typed array', function tests() {

	this.timeout( 50000 );

	it( 'should export a function', function test() {
		expect( random ).to.be.a( 'function' );
	});

	it( 'should generate samples which pass mean test when mu = 0 and b = 1', function test() {
		var out,
			mu = 0,
			b = 1,
			sampleMean,
			n = 50000,
			iTotal = 400,
			s,
			ci,
			outside = 0,
			i;

		// Mean test
		s = Math.sqrt( 2 * Math.pow( b, 2 ) ) / Math.sqrt( n );

		// CI
		ci = [ mu - 2 * s, mu + 2 * s ];

		for ( i = 0; i < iTotal; i++ ) {
			out = random( n, 'float64', mu, b );
			sampleMean = mean( out );
			if ( sampleMean < ci[ 0 ] || sampleMean > ci[ 1 ] ) {
				outside += 1;
			}
		}

		assert.isBelow( outside / iTotal, 0.05 + 0.025 );

	});

	it( 'should generate samples which pass Kolmogorov-Smirnov test when mu = 0 and b = 1', function test() {
		var data,
			i,
			notpassed = 0,
			mu = 0,
			b = 1;

		for ( i = 0; i < 100; i++ ) {
			data = random( 500, 'float64', mu, b );
			if ( kstest( data, 'laplace' ).pValue < 0.05 ) {
				notpassed += 1;
			}
		}
		assert.isBelow( notpassed / 100, 0.15 );
	});

	it( 'should generate samples which pass mean test when mu = -2, b = 4', function test() {
		var out,
			mu = -2,
			b = 4,
			sampleMean,
			n = 50000,
			iTotal = 400,
			s,
			ci,
			outside = 0,
			i;

		// Mean test
		s = Math.sqrt( 2 * Math.pow( b, 2 ) ) / Math.sqrt( n );

		// CI
		ci = [ mu - 2 * s, mu + 2 * s ];

		for ( i = 0; i < iTotal; i++ ) {
			out = random( n, 'float64', mu, b );
			sampleMean = mean( out );
			if ( sampleMean < ci[ 0 ] || sampleMean > ci[ 1 ] ) {
				outside += 1;
			}
		}

		assert.isBelow( outside / iTotal, 0.05 + 0.025 );

	});

	it( 'should generate samples which pass Kolmogorov-Smirnov test when mu = -2 and b = 4', function test() {
		var data,
			i,
			notpassed = 0,
			mu = -2,
			b = 4,
			pval;
		for ( i = 0; i < 100; i++ ) {
			data = random( 500, 'float64', mu, b );
			pval = kstest( data, 'laplace', {
				'mu': mu,
				'b': b
			}).pValue;
			if ( pval < 0.05 ) {
				notpassed += 1;
			}
		}
		assert.isBelow( notpassed / 100, 0.15 );
	});


});
