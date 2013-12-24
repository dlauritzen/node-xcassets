
var _ = require('underscore');
var fs = require("fs");
var path = require('path');
// var sizeOf = require('image-size');
var predefined = require('./predefined');

// exports.sizeOf = sizeOf;

function sizeOf(filename, done) {
	var buf = new Buffer(8);
	fs.open(filename, 'r', function(err, fd) {
		if (err) return done(err);
		// The IHDR data for width and height occur in bytes 32-47, inclusive
		// console.log('Reading in file: %s', filename);
		fs.read(fd, buf, 0, 8, 16, function(err) {
			fs.close(fd, function(cerr) {
				if (err) return done(err);
				else if (cerr) return done(cerr);
				
				// console.log(buf);
				var width = buf.readUInt32BE(0);
				var height = buf.readUInt32BE(4);
				return done(null, { width: width, height: height });
			});
		});
	});
}
exports.sizeOf = sizeOf;

function imgBasename(filename) {
	var name = path.basename(filename);
	var ext = path.extname(name);

	var toRemove = [
		ext,
		'@2x',
		'-568h',
		'~ipad',
		'~iphone'
	];
	_.each(toRemove, function(r) {
		name = name.replace(r, '');
	});
	return name;
}
exports.imgBasename = imgBasename;

function iconAsset(filename, dimensions, done) {
	if (_.isFunction(dimensions) && _.isUndefined(done)) {
		done = dimensions;
		dimensions = null;
	}

	function next(err, dimensions) {
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
	}

	if (!dimensions) {
		try {
			return sizeOf(filename, next);
		}
		catch (e) {
			return done(e);
		}
	}
	else {
		return next(null, dimensions);
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

function launchDescriptionFromAsset(asset) {
	var description = '';
	if (asset.scale == '2x') description += 'Retina ';
	description += asset.orientation == 'landscape' ? 'Landscape ' : 'Portrait ';
	description += asset.idiom == 'iphone' ? 'iPhone' : 'iPad';
	if (asset.idiom == 'iphone') {
		description += (asset.subtype && asset.subtype == 'retina4') ? ' 4"' : ' 3.5"';
	}
	description += asset.extent == 'full-screen' ? '' : ' Status Bar';
	if (asset['minimum-system-version'] == '7.0') description += ' iOS 7';
	description += ' Launch Image';

	return description;
}
exports.launchDescriptionFromAsset = launchDescriptionFromAsset;

function launchAsset(filename, dimensions, done) {
	if (_.isFunction(dimensions) && _.isUndefined(done)) {
		done = dimensions;
		dimensions = null;
	}

	function next(err, dimensions) {
		var orientation = (dimensions.width > dimensions.height) ? 'landscape' : 'portrait';
		var idiom, scale, extent, subtype, os;
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
		if (path.basename(filename).indexOf('-7') != -1) {
			os = '7';
		}
		else {
			os = '6';
		}

		var assetFilename = 'launch';
		if (idiom == 'ipad' || orientation != 'portrait') assetFilename += '-' + orientation;
		if (os == '7') assetFilename += '-7';
		if (extent == 'to-status-bar') assetFilename += '-status';
		if (subtype && subtype == 'retina4') assetFilename += '-568h';
		if (scale == '2x') assetFilename += '@2x';
		if (idiom == 'ipad') assetFilename += '~ipad';
		assetFilename += '.png';

		var ret = {
			idiom: idiom,
			scale: scale,
			extent: extent,
			orientation: orientation,
			dimensions: dimensions,
			filename: assetFilename,
		};
		if (subtype) ret['subtype'] = subtype;
		if (os == '7') ret['minimum-system-version'] = '7.0';

		var description = launchDescriptionFromAsset(ret);
		ret['description'] = description;

		return done(null, ret);
	}

	if (!dimensions) {
		try {
			// console.log('%s exists: %s', filename, fs.existsSync(filename));
			return sizeOf(filename, next);
		}
		catch (e) {
			return done(e);
		}
	}
	else {
		return next(null, dimensions);
	}
}
exports.launchAsset = launchAsset;

function imageAsset(filename, done) {
	var scale = filename.indexOf('@2x') == -1 ? '1x' : '2x';
	var idiom = 'universal';
	var subtype = null;
	if (filename.indexOf('~ipad') != -1) idiom = 'ipad';
	else if (filename.indexOf('~iphone') != -1) idiom = 'iphone';

	if (filename.indexOf('-568h') != -1) subtype = 'retina4';
	
	var ret = {
		filename: path.basename(filename),
		scale: scale,
		idiom: idiom,
	}
	if (subtype == 'retina4') {
		ret.idiom = 'iphone';
		ret.subtype = subtype;
	}
	return done(null, ret);
}
exports.imageAsset = imageAsset;

function assetForImage(filename, done) {
	try {
		sizeOf(filename, function(err, dimensions) {
			iconAsset(filename, dimensions, function(err, asset) {
				if (err) return done(err);
				if (asset) return done(null, { type: 'icon', asset: asset });

				launchAsset(filename, dimensions, function(err, asset) {
					if (err) return done(err);
					if (asset && asset.idiom) return done(null, { type: 'launch', asset: asset });

					imageAsset(filename, function(err, asset) {
						if (err) return done(err);
						return done(null, { type: 'image', asset: asset });
					});
				})
			});
		});
	}
	catch (e) {
		return done(e);
	}
}
exports.assetForImage = assetForImage;
