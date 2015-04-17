
const vows = require('vows'),
    assert = require('assert'),
    xcassets = require('../lib/xcassets');

vows.describe('Discover Idiom').addBatch({
    'default': {
        topic: function() { return xcassets.idiomFromFilename('icon.png'); },
        'is iphone': function(idiom) {
            assert.equal(idiom, 'iphone');
        }
    },
    'iphone': {
        topic: function() { return xcassets.idiomFromFilename('icon~iphone.png'); },
        'is iphone': function(idiom) {
            assert.equal(idiom, 'iphone');
        }
    },
    'ipad': {
        topic: function() { return xcassets.idiomFromFilename('icon~ipad.png'); },
        'is ipad': function(idiom) {
            assert.equal(idiom, 'ipad');
        }
    },
    'watch': {
        topic: function() { return xcassets.idiomFromFilename('icon~watch.png'); },
        'is watch': function(idiom) {
            assert.equal(idiom, 'watch');
        }
    },
}).export(module);
