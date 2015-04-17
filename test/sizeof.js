
const vows = require('vows'),
    path = require('path'),
    assert = require('assert'),
    xcassets = require('../lib/xcassets');

vows.describe('sizeof').addBatch({
    'icon': {
        topic: function() {
            return xcassets.sizeof('test/images/icon-16@2x~mac.png', this.callback);
        },
        'succeeds': function(err, dimensions) {
            assert.isNull(err);
            assert.equal(dimensions.width, 32);
            assert.equal(dimensions.height, 32);
        }
    },
    'launch': {
        topic: function() {
            return xcassets.sizeof('test/images/launch-portrait-736h@3x~iphone.png', this.callback);
        },
        'succeeds': function(err, dimensions) {
            assert.isNull(err);
            assert.equal(dimensions.width, 1242);
            assert.equal(dimensions.height, 2208);
        }
    },
}).export(module);
