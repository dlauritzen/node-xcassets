
const vows = require('vows'),
    assert = require('assert'),
    xcassets = require('../lib/xcassets');

vows.describe('Utility Functions').addBatch({
    'subtype': {
        'none': {
            topic: function() { return xcassets.subtypeFromFilename('icon.png'); },
            'returns null': function(subtype) {
                assert.isNull(subtype);
            },
        },
        '-568h': {
            topic: function() { return xcassets.subtypeFromFilename('icon-568h.png'); },
            'returns retina4': function(subtype) {
                assert.equal(subtype, 'retina4');
            },
        },
    },
}).export(module);
