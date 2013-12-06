
var _ = require('underscore');
var sizeOf = require('image-size');
var predefined = require('./predefined');

exports.sizeOf = sizeOf;

function iconAsset(filename, done) {
	// console.log(filename);
	try {
		sizeOf(filename, function(err, dimensions) {
			var icons = _.filter(predefined.ICONS, function(icon) {
				return _.isEqual(icon.dimensions, dimensions);
			});

			if (icons.length == 0) {
				return done(null, false);
			}
			else if (icons.length == 1) {
				return done(null, icons[0]);
			}
			else {
				// Multiple choices
				if (icons.length == 2) {
					// Choice between iphone and ipad
					var tmpName = filename.toLowerCase();
					if (tmpName.indexOf('ipad') != -1 || tmpName.indexOf('pad') != -1) {
						// Choose iPad
						return done(null, _.findWhere(icons, { idiom: 'ipad' }));
					}
					else {
						// Choose iPhone
						return done(null, _.findWhere(icons, { idiom: 'iphone' }));
					}
				}
				else {
					return done(null, false);
				}
			}
		});
	}
	catch (e) {
		console.log('Error: %s', e);
		return done(e);
	}
}
exports.iconAsset = iconAsset;

var WIDTHS = [
	{ width: 320, orientation: 'portrait', idiom: 'iphone', scale: '1x' },
	{ width: 480, orientation: 'landscape', idiom: 'iphone', scale: '1x' },
	{ width: 640, orientation: 'portrait', idiom: 'iphone', scale: '2x' },
	{ width: 768, orientation: 'portrait', idiom: 'ipad', scale: '1x' },
	{ width: 960, orientation: 'landscape', idiom: 'iphone', scale: '2x' },
	{ width: 1024, orientation: 'landscape', idiom: 'ipad', scale: '1x' },
	{ width: 1136, orientation: 'landscape', idiom: 'iphone', scale: '2x', subtype: 'retina4' },
	{ width: 1536, orientation: 'portrait', idiom: 'ipad', scale: '2x' },
	{ width: 2048, orientation: 'landscape', idiom: 'ipad', scale: '2x' },
];

var HEIGHTS = [

	{ height: 300, orientation: 'landscape', extent: 'to-status-bar' },
	{ height: 320, orientation: 'landscape', extent: 'full-screen' },

	{ height: 460, orientation: 'portrait', extent: 'to-status-bar' },
	{ height: 480, orientation: 'portrait', extent: 'full-screen' },

	{ height: 600, orientation: 'landscape', extent: 'to-status-bar' },
	{ height: 640, orientation: 'landscape', extent: 'full-screen' },

	{ height: 748, orientation: 'landscape', extent: 'to-status-bar' },	
	{ height: 768, orientation: 'landscape', extent: 'full-screen' },
	
	{ height: 920, orientation: 'portrait', extent: 'to-status-bar' },
	{ height: 960, orientation: 'portrait', extent: 'full-screen' },
	
	{ height: 1004, orientation: 'portrait', extent: 'to-status-bar' },
	{ height: 1024, orientation: 'portrait', extent: 'full-screen' },
	
	{ height: 1096, orientation: 'portrait', extent: 'to-status-bar', subtype: 'retina4' },
	{ height: 1136, orientation: 'portrait', extent: 'full-screen', subtype: 'retina4' },
	
	{ height: 1496, orientation: 'portrait', extent: 'to-status-bar' },
	{ height: 1536, orientation: 'landscape', extent: 'full-screen' },

	{ height: 2008, orientation: 'portrait', extent: 'to-status-bar' },
	{ height: 2048, orientation: 'portrait', extent: 'full-screen' },
];

function launchAsset(filename, done) {
	try {
		sizeOf(filename, function(err, dimensions) {
			var orientation = (dimensions.width > dimensions.height) ? 'landscape' : 'portrait';
			var idiom, scale, extent, subtype;
			var found;
			if (found = _.findWhere(WIDTHS, { width: dimensions.width, orientation: orientation })) {
				idiom = found.idiom;
				scale = found.scale;
				subtype = found.subtype;
			}
			if (found = _.findWhere(HEIGHTS, { height: dimensions.height, orientation: orientation })) {
				extent = found.extent;
				if (found.subtype) subtype = found.subtype;
			}

			var description = '';
			if (scale == '2x') description += 'Retina ';
			description += orientation == 'landscape' ? 'Landscape ' : 'Portrait ';
			description += idiom == 'iphone' ? 'iPhone' : 'iPad';
			if (idiom == 'iphone') {
				description += (subtype && subtype == 'retina4') ? ' 4"' : ' 3.5"';
			}
			description += extent == 'full-screen' ? '' : ' Status Bar';
			description += ' Launch Image';

			return done(null, {
				idiom: idiom,
				scale: scale,
				extent: extent,
				subtype: subtype,
				description: description,
				orientation: orientation,
				dimensions: dimensions,
			});
		});
	}
	catch (e) {
		return done(e);
	}
}
exports.launchAsset = launchAsset;
