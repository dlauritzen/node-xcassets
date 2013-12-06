
var path = require('path');
var xcassets = require('../lib/xcassets');

var imageDir = path.join(__dirname, 'images');

function testSingleOption(filename, description, test) {
	xcassets.iconAsset(filename, function(err, asset) {
		test.ok(asset, 'Search should return a result.');
		test.equal(asset.description, description, 'Description doesn\'t match. Expected "' + description + '"');
		test.done();
	});
}

function testSingleLaunch(filename, description, test) {
	xcassets.launchAsset(filename, function(err, asset) {
		test.ok(asset, 'Search should return a result.');
		test.equal(asset.description, description, 'Description doesn\'t match. Expected "' + description + '"');
		test.done();
	});
}

exports.iconTests = {
	not_found: function(test) {
		xcassets.iconAsset(path.join(imageDir, 'not_found.png'), function(err, asset) {
			test.strictEqual(asset, false, 'Search should not find anything.');
			test.done();
		});
	},
	iphone_7_retina: function(test) {
		testSingleOption(path.join(imageDir, 'icon-7@2x.png'), 'Retina iPhone iOS 7 Icon', test);
	},
	ipad_7_retina: function(test) {
		testSingleOption(path.join(imageDir, 'icon-7@2x~ipad.png'), 'Retina iPad iOS 7 Icon', test);
	},
	iphone_6_retina: function(test) {
		testSingleOption(path.join(imageDir, 'icon@2x.png'), 'Retina iPhone iOS 6 Icon', test);
	},
	ipad_6_retina: function(test) {
		testSingleOption(path.join(imageDir, 'icon@2x~ipad.png'), 'Retina iPad iOS 6 Icon', test);
	},
	iphone_6: function(test) {
		testSingleOption(path.join(imageDir, 'icon.png'), 'iPhone iOS 6 Icon', test);
	},
	ipad_6: function(test) {
		testSingleOption(path.join(imageDir, 'icon~ipad.png'), 'iPad iOS 6 Icon', test);
	},
	iphone_settings_7: function(test) {
		testSingleOption(path.join(imageDir, 'icon-settings-7.png'), 'iPhone iOS 7 Settings', test);
	},
	iphone_settings_7_retina: function(test) {
		testSingleOption(path.join(imageDir, 'icon-settings-7@2x.png'), 'Retina iPhone iOS 7 Settings', test);
	},
	ipad_settings_7: function(test) {
		testSingleOption(path.join(imageDir, 'icon-settings-7~ipad.png'), 'iPad iOS 7 Settings', test);
	},
	ipad_settings_7_retina: function(test) {
		testSingleOption(path.join(imageDir, 'icon-settings-7@2x~ipad.png'), 'Retina iPad iOS 7 Settings', test);
	},
	iphone_spotlight_7_retina: function(test) {
		testSingleOption(path.join(imageDir, 'icon-spotlight-7@2x.png'), 'Retina iPhone iOS 7 Spotlight', test);
	},
	ipad_spotlight_7: function(test) {
		testSingleOption(path.join(imageDir, 'icon-spotlight-7~ipad.png'), 'iPad iOS 7 Spotlight', test);
	},
	ipad_spotlight_7_retina: function(test) {
		testSingleOption(path.join(imageDir, 'icon-spotlight-7@2x~ipad.png'), 'Retina iPad iOS 7 Spotlight', test);
	},
	ipad_spotlight_retina: function(test) {
		testSingleOption(path.join(imageDir, 'icon-spotlight@2x~ipad.png'), 'Retina iPad iOS 6 Spotlight', test);
	},
	ipad_spotlight: function(test) {
		testSingleOption(path.join(imageDir, 'icon-spotlight~ipad.png'), 'iPad iOS 6 Spotlight', test);
	},
}

exports.launchTests = {
	iphone_3_portrait: function(test) {
		testSingleLaunch(path.join(imageDir, 'launch.png'), 'Portrait iPhone 3.5" Launch Image', test);
	},
	iphone_4_portrait: function(test) {
		testSingleLaunch(path.join(imageDir, 'launch-568h@2x.png'), 'Retina Portrait iPhone 4" Launch Image', test);
	},
}
