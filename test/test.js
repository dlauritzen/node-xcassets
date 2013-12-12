
var _ = require('underscore');
var fs = require("fs");
var util = require('util');
var path = require('path');
var discovery = require('../lib/discovery');
var xcassets = require('../lib/xcassets');

var imageDir = path.join(__dirname, 'images');
function imgPath(image) {
	return path.join(imageDir, image);
}
var iconImages = _.map(
	[
		'icon.png', 'icon@2x.png',
		'icon~ipad.png', 'icon@2x~ipad.png',
		'icon-7@2x.png', 'icon-7~ipad.png', 'icon-7@2x~ipad.png',
		'icon-settings-7.png', 'icon-settings-7@2x.png',
		'icon-settings-7~ipad.png', 'icon-settings-7@2x~ipad.png',
		'icon-spotlight~ipad.png', 'icon-spotlight@2x~ipad.png',
		'icon-spotlight-7~ipad.png', 'icon-spotlight-7@2x~ipad.png',
		'icon-spotlight-7@2x.png',
	], imgPath);

var launchImages = _.map(
	[
		'launch.png', 'launch@2x.png', 'launch-568h@2x.png',
		'launch-7@2x.png', 'launch-7-568h@2x.png',
		'launch-Portrait~ipad.png', 'launch-Portrait@2x~ipad.png',
		'launch-Portrait-7~ipad.png', 'launch-Portrait-7@2x~ipad.png',
	], imgPath);

var plainImages = _.map(
	[
		'footer.png', 'footer@2x.png',
		'header.png', 'header@2x.png',
	], imgPath);

var allImages = _.union(iconImages, launchImages, plainImages);

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

exports.basenameTest = function(test) {
	var names = {
		'icon.png': 'icon',
		'icon@2x.png': 'icon',
		'icon-568h@2x.png': 'icon',
		'icon~ipad.png': 'icon',
		'icon~ipad@2x.png': 'icon'
	}
	test.expect(names.length);
	_.each(names, function(value, key) {
		test.equal(discovery.imgBasename(key), value);
	});
	test.done();
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
	ipad_7: function(test) {
		testSingleOption(path.join(imageDir, 'icon-7~ipad.png'), 'iPad iOS 7 Icon', test);
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
	iphone_3_retina_portrait: function(test) {
		testSingleLaunch(path.join(imageDir, 'launch@2x.png'), 'Retina Portrait iPhone 3.5" Launch Image', test);
	},
	iphone_3_retina_7_portrait: function(test) {
		testSingleLaunch(path.join(imageDir, 'launch-7@2x.png'), 'Retina Portrait iPhone 3.5" iOS 7 Launch Image', test);
	},
	iphone_4_retina_portrait: function(test) {
		testSingleLaunch(path.join(imageDir, 'launch-568h@2x.png'), 'Retina Portrait iPhone 4" Launch Image', test);
	},
	iphone_4_retina_7_portrait: function(test) {
		testSingleLaunch(path.join(imageDir, 'launch-7-568h@2x.png'), 'Retina Portrait iPhone 4" iOS 7 Launch Image', test);
	},
	ipad_status_portrait: function(test) {
		testSingleLaunch(path.join(imageDir, 'launch-Portrait~ipad.png'), 'Portrait iPad Status Bar Launch Image', test);
	},
	ipad_7_portrait: function(test) {
		testSingleLaunch(path.join(imageDir, 'launch-Portrait-7~ipad.png'), 'Portrait iPad iOS 7 Launch Image', test);
	},
	ipad_retina_7_portrait: function(test) {
		testSingleLaunch(path.join(imageDir, 'launch-Portrait-7@2x~ipad.png'), 'Retina Portrait iPad iOS 7 Launch Image', test);
	},
	ipad_retina_status_portrait: function(test) {
		testSingleLaunch(path.join(imageDir, 'launch-Portrait@2x~ipad.png'), 'Retina Portrait iPad Status Bar Launch Image', test);
	},
}

exports.catalogTests = {
	icon_catalog: function(test) {
		xcassets.iconCatalog(allImages, function(err, info) {
			test.ok(!err);

			// console.log(util.inspect(info, { depth: null }));

			test.equal(_.size(info.names), iconImages.length);
			test.equal(info.catalog.images.length, iconImages.length);

			test.done();
		});
	},
	launch_catalog: function(test) {
		xcassets.launchCatalog(allImages, function(err, info) {
			test.ok(!err);

			// console.log(util.inspect(info, { depth: null }));

			test.equal(_.size(info.names), launchImages.length);
			test.equal(info.catalog.images.length, launchImages.length);

			test.done();
		});
	},
	catalogs: function(test) {
		test.expect(26);
		xcassets.catalogs(allImages, function(err, info) {
			test.ok(!err);

			test.deepEqual(_.keys(info.names.icon), iconImages);
			test.equal(info.catalogs.icon.images.length, iconImages.length);

			test.deepEqual(_.keys(info.names.launch), launchImages);
			test.equal(info.catalogs.launch.images.length, launchImages.length);

			test.equal(_.size(info.names.image), 2); // header and footer
			_.each(['header', 'footer'], function(name) {
				test.ok(info.names.image[name]);
				_.each(info.names.image[name], function(item) {
					_.each(item, function(value, key) {
						test.ok(key.indexOf(name) != -1);
						test.ok(value.indexOf(name) != -1);
					});
				});

				test.ok(info.catalogs.image[name]);
				_.each(info.catalogs.image[name].images, function(asset) {
					test.ok(asset.filename.indexOf(name) != -1);
					if (asset.filename.indexOf('@2x') != -1) {
						test.ok(asset.scale == '2x');
					}
					else {
						test.ok(asset.scale == '1x');
					}
				});
			});

			test.done();
		});
	}
}

exports.admin = {
	launch: function(test) {
		var d = "/Users/dallinl/mobileapps/ios/scs/scs.xcassets/scs-LaunchImage.launchimage";
		fs.readdir(d, function(err, filenames) {
			if (err) {
				test.done();
			}
			else {
				var images = _.filter(filenames, function(filename) {
					return path.extname(filename) == '.png';
				});
				images = _.map(images, function(filename) {
					return path.join(d, filename);
				});
				xcassets.launchCatalog(images, function(err, info) {
					if (err) {
						test.done();
					}
					else {
						console.log(util.inspect(info, { depth: null }));
						test.done();
					}
				});
			}
		});
	}
}
