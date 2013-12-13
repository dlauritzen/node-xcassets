
var vows = require("vows");
var assert = require("assert");
var path = require("path");

var xcassets = require('../lib/xcassets');

var sizeOf = xcassets.sizeOf;

vows.describe('Image Size').addBatch({
	'A 20x20 PNG': {
		topic: function() {
			sizeOf(path.join(__dirname, 'images', '20x20.png'), this.callback);
		},
		'should not error': function(err, size) {
			assert.isNull(err);
			assert.isObject(size);
		},
		'should have a size of 20x20 px': function(err, size) {
			assert.equal(size.width, 20);
			assert.equal(size.height, 20);
		},
	},
	'An 80x100 PNG': {
		topic: function() {
			sizeOf(path.join(__dirname, 'images', '80x120.png'), this.callback);
		},
		'should not error': function(err, size) {
			assert.isNull(err);
			assert.isObject(size);
		},
		'should have a size of 80x120 px': function(err, size) {
			assert.equal(size.width, 80);
			assert.equal(size.height, 120);
		},
	},
}).export(module);
