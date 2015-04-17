
const vows = require('vows'),
    path = require('path'),
    assert = require('assert'),
    xcassets = require('../lib/xcassets');

vows.describe('Icon Assets').addBatch({
    '29@2x': {
        'watch': {
            topic: function() {
                return xcassets.iconAsset('test/images/icon-29@2x~watch.png', this.callback);
            },
            'result': function(err, asset) {
                assert.isNull(err);
                assert.equal(asset.idiom, 'watch');
                assert.equal(asset.filename, 'icon-29@2x~watch.png');
                assert.equal(asset.scale, 2);
            },
        },
        'ipad': {
            topic: function() {
                return xcassets.iconAsset('test/images/icon-29@2x~ipad.png', this.callback);
            },
            'result': function(err, asset) {
                assert.isNull(err);
                assert.equal(asset.idiom, 'ipad');
                assert.equal(asset.filename, 'icon-29@2x~ipad.png');
                assert.equal(asset.scale, 2);
            },
        },
        'iphone': {
            topic: function() {
                return xcassets.iconAsset('test/images/icon-29@2x~iphone.png', this.callback);
            },
            'result': function(err, asset) {
                assert.isNull(err);
                assert.equal(asset.idiom, 'iphone');
                assert.equal(asset.filename, 'icon-29@2x~iphone.png');
                assert.equal(asset.scale, 2);
            },
        },
    },
    'mac': {
        '16@1x': {
            topic: function() {
                return xcassets.iconAsset('test/images/icon-16~mac.png', this.callback);
            },
            'result': function(err, asset) {
                assert.isNull(err);
                assert.equal(asset.filename, 'icon-16~mac.png');
            }
        },
    },
}).export(module);
