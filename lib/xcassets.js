
var _ = require('underscore');
var async = require('async');
var discovery = require('./discovery');
var dlutil = require('dlutil');

exports.launchAsset = discovery.launchAsset;
exports.iconAsset = discovery.iconAsset;
exports.imageAsset = discovery.imageAsset;
exports.assetForImage = discovery.assetForImage;
exports.imgBasename = discovery.imgBasename;

function iconCatalog(images, done) {
	var names = {};
	var catalog = { images: [], info: { version: 1, author: 'node-xcassets' }, properties: { 'pre-rendered': true } };

	async.mapSeries(images, discovery.iconAsset, function(err, assets) {
		if (err) return done(err);

		_.each(assets, function(asset, index) {
			if (asset) {
				names[images[index]] = asset.filename;
				catalog.images.push(_.pick(asset, 'filename', 'idiom', 'size', 'scale'));
			}
		});

		return done(null, { names: names, catalog: catalog });
	});
}
exports.iconCatalog = iconCatalog;


function launchCatalog(images, done) {
	var names = {};
	var catalog = { images: [], info: { version: 1, author: 'node-xcassets' } };

	async.mapSeries(images, discovery.launchAsset, function(err, assets) {
		if (err) return done(err);

		_.each(assets, function(asset, index) {
			if (asset && asset.idiom) {
				names[images[index]] = asset.filename;
				catalog.images.push(_.pick(asset, 'filename', 'idiom', 'extent', 'scale', 'subtype', 'orientation'));
			}
		});

		return done(null, { names: names, catalog: catalog });
	});
}
exports.launchCatalog = launchCatalog;


function imageCatalogs(images, done) {
	function newCatalog() {
		return { images: [], info: { version: 1, author: 'node-xcassets' } };
	}

	async.mapSeries(images, discovery.imageAsset, function(err, assets) {
		if (err) return done(err);

		_.each(assets, function(asset, index) {
			if (asset) asset['original-filename'] = images[index];
		});

		var partitions = dlutil.partition(_.compact(assets), function(asset) {
			return discovery.imgBasename(asset['original-filename']);
		});

		var catalogs = {};
		var names = {};

		_.each(partitions, function(partition, key) {
			names[key] = _.map(partition, function(asset) {
				var ret = {};
				ret[asset['original-filename']] = asset.filename;
				return ret;
			});
			catalogs[key] = newCatalog();

			_.each(partition, function(asset) {
				catalogs[key].images.push(_.omit(asset, 'original-filename'));
			});
		});

		return done(null, { names: names, catalogs: catalogs });
	});
}
exports.imageCatalogs = imageCatalogs;

function catalogs(images, done) {
	var tmp = _.toArray(images); // copy
	var names = {};
	var catalogs = {};

	iconCatalog(tmp, function(err, info) {
		if (err) return done(err);

		names.icon = info.names;
		catalogs.icon = info.catalog;
		tmp = _.difference(tmp, _.keys(info.names));

		launchCatalog(tmp, function(err, info) {
			if (err) return done(err);

			names.launch = info.names;
			catalogs.launch = info.catalog;
			tmp = _.difference(tmp, _.keys(info.names));

			imageCatalogs(tmp, function(err, info) {
				if (err) return done(err);

				names.image = info.names;
				catalogs.image = info.catalogs;

				return done(null, { names: names, catalogs: catalogs });
			});
		});
	});
}
exports.catalogs = catalogs;
