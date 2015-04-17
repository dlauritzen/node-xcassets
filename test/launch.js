
const vows = require('vows'),
    path = require('path'),
    assert = require('assert'),
    xcassets = require('../lib/xcassets');

vows.describe('Launch Assets').addBatch({
    'iPad': {
        'landscape': {
            topic: function() {
                return xcassets.launchAsset('test/images/launch-landscape@2x~ipad.png', this.callback);
            },
            'result': function(err, asset) {
                assert.isNull(err);
                assert.equal(asset.orientation, 'landscape');
                assert.equal(asset.filename, 'launch-landscape@2x~ipad.png');
                assert.equal(asset.extent, 'full-screen');
                assert.equal(asset.scale, 2);
            },
        },
    },
}).export(module);
