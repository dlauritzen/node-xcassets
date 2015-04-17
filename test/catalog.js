
const vows = require('vows'),
    _ = require('underscore'),
    path = require('path'),
    assert = require('assert'),
    xcassets = require('../lib/xcassets');

vows.describe('Asset Catalogs').addBatch({
    'all': {
        topic: function() {
            var images = [
                'test/images/icon-120~car.png',
                'test/images/icon-128@2x~mac.png',
                'test/images/icon-128~mac.png',
                'test/images/icon-16@2x~mac.png',
                'test/images/icon-16~mac.png',
                'test/images/icon-24@2x~watch.png',
                'test/images/icon-256@2x~mac.png',
                'test/images/icon-256~mac.png',
                'test/images/icon-27.5@2x~watch.png',
                'test/images/icon-29@2x~ipad.png',
                'test/images/icon-29@2x~iphone.png',
                'test/images/icon-29@2x~watch.png',
                'test/images/icon-29@3x~iphone.png',
                'test/images/icon-29@3x~watch.png',
                'test/images/icon-29~ipad.png',
                'test/images/icon-29~iphone.png',
                'test/images/icon-32@2x~mac.png',
                'test/images/icon-32~mac.png',
                'test/images/icon-40@2x~ipad.png',
                'test/images/icon-40@2x~iphone.png',
                'test/images/icon-40@2x~watch.png',
                'test/images/icon-40@3x~iphone.png',
                'test/images/icon-40~ipad.png',
                'test/images/icon-44@2x~watch.png',
                'test/images/icon-50@2x~ipad.png',
                'test/images/icon-50~ipad.png',
                'test/images/icon-512@2x~mac.png',
                'test/images/icon-512~mac.png',
                'test/images/icon-57@2x~iphone.png',
                'test/images/icon-57~iphone.png',
                'test/images/icon-60@2x~iphone.png',
                'test/images/icon-60@3x~iphone.png',
                'test/images/icon-72@2x~ipad.png',
                'test/images/icon-72~ipad.png',
                'test/images/icon-76@2x~ipad.png',
                'test/images/icon-76~ipad.png',
                'test/images/icon-86@2x~watch.png',
                'test/images/icon-98@2x~watch.png',
                'test/images/launch-landscape-736h@3x~iphone.png',
                'test/images/launch-landscape@2x~ipad.png',
                'test/images/launch-landscape~ipad.png',
                'test/images/launch-portrait-480h@2x~iphone.png',
                'test/images/launch-portrait-568h@2x~iphone.png',
                'test/images/launch-portrait-667h@2x~iphone.png',
                'test/images/launch-portrait-736h@3x~iphone.png',
                'test/images/launch-portrait@2x~ipad.png',
                'test/images/launch-portrait~ipad.png',
            ];
            return xcassets.catalogs(images, this.callback);
        },
        'does not error': function(err, info) {
            assert.isNull(err);
        },
        'icon': function(err, info) {
            var names = info.names.icon;
            var catalog = info.catalogs.icon;
            _.each(names, function(dest, src, index) {
                assert.notEqual(src.indexOf(dest), -1, src + " vs " + dest);
            });
            assert.equal(_.size(names), 38, 'should be 38 found icons. got ' + _.size(names));
        },
        'launch': function(err, info) {
            var names = info.names.launch;
            var catalog = info.catalogs.launch;
            _.each(names, function(dest, src, index) {
                assert.notEqual(src.indexOf(dest), -1, src + " vs " + dest);
            });
            assert.equal(_.size(names), 9, 'should be 9 found launch images. got ' + _.size(names));
        },
    }
}).export(module);
