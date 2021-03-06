// TODO
// configuration, where does the js go for this? should everyone write their own?
// # can I remove primitive types?  not useful as arrays have items, objects have properties and all others have their own validation routines
// praetorian, add "in" and "boolean" types
// type conversion, praetorian or somewhere else? true not "true"
// checksum type...

// get praetorian (so we can test it)
var Praetorian = require( '../index' );
praetorian = new Praetorian(
	{
		automaticTypeConversion: true
	}
);

// and some testing stuff...
var vows = require( 'vows' ),
		assert = require( 'assert' );

// Data sanitising: this should strip out all invalid properties
var quintus = require( './json/quintus' );
// Data verification: ensures you have passed everything required, note we're not 
// doing any type checking or validation here
// do note though, this test should pass with all "requirements" met
var gracchus = require( './json/gracchus' );
// Data verification: check that required fields that arent passed in json add an error
// this will throw exactly 7 errors
var gaius = require( './json/gaius' );
// Data validation
// var falco = require( './json/falco' )( configuration );
// passing type conversion
var lucius = require( './json/lucius' );
// failing type conversion
var tiberius = require( './json/tiberius' );
// requirements checker
var tarquinius = require( './json/tarquinius' );

vows.describe( 'praetorian' ).addBatch( {

		'quintus': {
			topic: function() {
				// fire the call
				praetorian.validate( quintus.json, quintus.schema, this.callback );
			},
			'execute quintus': function( err, result ) {

				// errors thrown by praetorian will be handled and return an err, to pass the value should be null
				assert.isNull( err );

				// check the response isn't null either
				assert.isNotNull( result );

				// must be an object too
				assert.isObject( result );

				// now check that the result json (cleaned data) is EXACTLY what we expect it to be
				assert.deepEqual( result, quintus.expected );

			}
		},

		'gracchus': {
			topic: function() {
				// fire the call
				praetorian.validate( gracchus.json, gracchus.schema, this.callback );
			},
			'execute gracchus': function( err, result ) {

				// errors thrown by praetorian will be handled and return an err, to pass the value should be null
				assert.isNull( err );

				// check the response isn't null either
				assert.isNotNull( result );

				// must be an object too
				assert.isObject( result );

				// now check that the result json (cleaned data) is EXACTLY what we expect it to be
				assert.deepEqual( result, gracchus.expected );

			}
		},

		'gaius': {
			topic: function() {
				// fire the call
				praetorian.validate( gaius.json, gaius.schema, this.callback );
			},
			'execute gaius': function( err, result ) {

				// no json is passed in, result will be undefined
				assert.isUndefined( result );

				// should be exactly 7 errors, one for each of the required: true root properties
				assert.equal( err.length, 7 );

			}
		},

		// 'falco': {
		// 	topic: function() {
		// 		// fire the call
		// 		praetorian.validate( falco.json, falco.schema, this.callback );
		// 	},
		// 	'execute falco': function( err, result ) {

		// 		// no json will be returned as the json passed in breaks the schema
		// 		assert.isUndefined( result );

		// 		// should be exactly X errors
		// 		assert.equal( err.length, 7 );

		// 	}
		// },
		
		'lucius': {
			topic: function() {
				// fire the call
				praetorian.validate( lucius.json, lucius.schema, this.callback );
			},
			'execute lucius': function( err, result ) {

				// errors thrown by praetorian will be handled and return an err, to pass the value should be null
				assert.isNull( err );

				// check the response isn't null either
				assert.isNotNull( result );

				// must be an object too
				assert.isObject( result );
				
				// now check that the result json (cleaned data) is EXACTLY what we expect it to be
				assert.deepEqual( result, lucius.expected );

			}
		},

		'tiberius': {
			topic: function() {
				// fire the call
				praetorian.validate( tiberius.json, tiberius.schema, this.callback );
			},
			'execute tiberius': function( err, result ) {

				// no json is passed in, result will be undefined
				assert.isUndefined( result );

				// should be exactly 3 errors, one for each of the failing boolean conversions
				assert.equal( err.length, 3 );

			}
		},
		
		'tarquinius': {
			topic: function() {
				// fire the call
				praetorian.requirements( tarquinius.schema, this.callback );
			},
			'execute tarquinius': function( err, result ) {

				// errors thrown by praetorian will be handled and return an err, to pass the value should be null
				assert.isNull( err );

				// check the response isn't null either
				assert.isNotNull( result );

				// must be an object too
				assert.isObject( result );
				
				// now check that the result json (cleaned data) is EXACTLY what we expect it to be
				assert.deepEqual( result, tarquinius.expected );

			}
		}

} ).run();