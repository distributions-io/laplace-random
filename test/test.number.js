/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	random = require( './../lib/number.js' ),

	// Module to calculate the mean
	mean = require( 'compute-mean' ),

	// Kolmogorov-Smirnov test
	kstest = require( 'compute-kstest' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'random number', function tests() {

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
			i, j;

		// Mean test
		s = Math.sqrt( 2 * Math.pow( b, 2 ) ) / Math.sqrt( n );

		// CI
		ci = [ mu - 2 * s, mu + 2 * s ];

		for ( i = 0; i < iTotal; i++ ) {
			out = new Array( n );
			for ( j = 0; j < 500; j++ ) {
				out[ j ] = random( mu, b );
			}
			sampleMean = mean( out );
			if ( sampleMean < ci[ 0 ] || sampleMean > ci[ 1 ] ) {
				outside += 1;
			}
		}
		assert.isBelow( outside / iTotal, 0.05 + 0.025 );

	});

	it( 'should generate samples which pass Kolmogorov-Smirnov test when mu = 0 and b = 1', function test() {
		var data,
			i, j,
			notpassed = 0,
			mu = 0,
			b = 1;

		for ( i = 0; i < 100; i++ ) {
			data = new Array( 500 );
			for ( j = 0; j < 500; j++ ) {
				data[ j ] = random( mu, b );
			}
			if ( kstest( data, 'laplace' ).pValue < 0.05 ) {
				notpassed += 1;
			}
		}
		assert.isBelow( notpassed / 100, 0.15 );
	});

	it( 'should generate samples which pass mean test when mu = 2 and b = 0.05', function test() {
		var out,
			mu = 2,
			b = 0.05,
			sampleMean,
			n = 50000,
			iTotal = 400,
			s,
			ci,
			outside = 0,
			i, j;

		// Mean test
		s = Math.sqrt( 2 * Math.pow( b, 2 ) ) / Math.sqrt( n );

		// CI
		ci = [ mu - 2 * s, mu + 2 * s ];

		for ( i = 0; i < iTotal; i++ ) {
			out = new Array( n );
			for ( j = 0; j < 500; j++ ) {
				out[ j ] = random( mu, b );
			}
			sampleMean = mean( out );
			if ( sampleMean < ci[ 0 ] || sampleMean > ci[ 1 ] ) {
				outside += 1;
			}
		}
		assert.isBelow( outside / iTotal, 0.05 + 0.025 );

	});

	it( 'should generate samples which pass Kolmogorov-Smirnov test when mu = -2 and b = 0.05', function test() {
		var data,
			mu = -2,
			b = 0.05,
			pval,
			i, j,
			notpassed = 0;

		for ( i = 0; i < 100; i++ ) {
			data = new Array( 40 );
			for ( j = 0; j < 40; j++ ) {
				data[ j ] = random( mu, b );
			}
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
