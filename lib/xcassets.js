
const _ = require('underscore'),
    dlutil = require('dlutil'),
    async = require('async'),
    fs = require('fs'),
    path = require('path'),
    ICONS = require('./icons'),
    LAUNCH = require('./launch');

exports.icons = ICONS;
exports.launch = LAUNCH;

function sizeof(filename, done) {
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
exports.sizeof = sizeof;


function basename(filename) {
    var name = path.basename(filename);
    var ext = path.extname(name);
    var toRemove = [
        ext,
        '@2x',
        '@3x',
        '~iphone',
        '~ipad',
        '-568h',
        '-667h',
        '-736h',
    ];
    _.each(toRemove, function(r) {
        name = name.replace(r, '');
    });
    return name;
}


const idiom_re = /^.*~([^.]+)\.png$/i;
function idiomFromFilename(filename, defaultIdiom) {
    var matches = idiom_re.exec(filename);
    if (matches != null) {
        return matches[1];
    }
    else {
        if (defaultIdiom !== undefined) {
            return defaultIdiom;
        }
        else {
            return 'iphone';
        }
    }
}
exports.idiomFromFilename = idiomFromFilename;


const scale_re = /^.*@(\d+)x.*$/i;
function scaleFromFilename(filename) {
    var matches = scale_re.exec(filename);
    if (matches != null) {
        return parseInt(matches[1]);
    }
    else {
        return 1;
    }
}
exports.scaleFromFilename = scaleFromFilename;


function subtypeFromFilename(filename) {
    var subtypes = {
        '-568h': 'retina4',
    };
    var subtype = _.find(subtypes, function(value, key) {
        return filename.indexOf(key) != -1;
    });
    return subtype || null;
}
exports.subtypeFromFilename = subtypeFromFilename;


function iconAsset(filename, dimensions, done) {
    if (_.isFunction(dimensions) && _.isUndefined(done)) {
        done = dimensions;
        dimensions = null;
    }

    function next(err, dimensions) {
        if (err) return done(err);

        var icons = ICONS.iconsForDimensions(dimensions.width, dimensions.height);
        if (icons.length == 0) {
            // No matching icon sizes
            return done(null, false);
        }
        else if (icons.length == 1) {
            // Return only option
            return done(null, icons[0]);
        }
        else {
            // Multiple matches. Select by idiom.
            var idiom = idiomFromFilename(filename);
            var idiom_icons = ICONS.iconsForIdiom(idiom, icons);
            if (idiom_icons.length == 1) {
                return done(null, idiom_icons[0]);
            }
            else {
                if (idiom_icons.length == 0) {
                    return done(null, false);
                }
                else if (idiom_icons.length == 1) {
                    return done(null, idiom_icons[0]);
                }
                else {
                    // Still have multiple matches. Select by scale.
                    var scale = scaleFromFilename(filename);
                    var scale_icons = ICONS.iconsWithScale(scale, idiom_icons);
                    if (scale_icons.length == 0) {
                        return done(null, false);
                    }
                    else if (scale_icons.length == 1) {
                        return done(null, scale_icons[0]);
                    }
                    else {
                        console.log('Multiple matching results for %s.', filename);
                        console.log(icons);
                        console.log(idiom_icons);
                        console.log(scale_icons);
                        return done(null, false);
                    }
                }
            }
        }
    }

    if (!dimensions) {
        try {
            return sizeof(filename, next);
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


function launchAsset(filename, dimensions, done) {
    if (_.isFunction(dimensions) && _.isUndefined(done)) {
        done = dimensions;
        dimensions = null;
    }

    function next(err, dimensions) {
        if (err) return done(err);

        var candidates = LAUNCH.launchImagesForDimensions(dimensions.width, dimensions.height);
        if (candidates.length == 0) {
            return done(null, false);
        }
        else if (candidates.length == 1) {
            return done(null, candidates[0]);
        }
        else {
            // In a robust module, this case would be handled.
            console.log('Multiple matching results for %s.', filename);
            console.log(candidates);
            return done(null, false);
        }
    }

    if (!dimensions) {
        try {
            return sizeof(filename, next);
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
    var scale = scaleFromFilename(filename);
    var idiom = idiomFromFilename(filename, 'universal');
    var subtype = subtypeFromFilename(filename);
    var ret = {
        filename: path.basename(filename),
        scale: scale + 'x',
        idiom: idiom,
    };
    if (subtype !== null) {
        ret.subtype = subtype;
    }
    return done(null, ret);
}
exports.imageAsset = imageAsset;


function assetForImage(filename, done) {
    try {
        return sizeof(filename, function(err, dimensions) {
            if (err) return done(err);
            return iconAsset(filename, dimensions, function(err, asset) {
                if (err) return done(err);
                if (asset) return done(null, { type: 'icon', asset: asset });
                return launchAsset(filename, dimensions, function(err, asset) {
                    if (err) return done(err);
                    if (asset) return done(null, { type: 'launch', asset: asset });
                    return imageAsset(filename, function(err, asset) {
                        if (err) return done(err);
                        else if (asset) return done(null, { type: 'image', asset: asset });
                        else return done(null, false);
                    });
                });
            });
        });
    }
    catch (e) {
        return done(e);
    }
}
exports.assetForImage = assetForImage;


function iconCatalog(images, done) {
    var names = {};
    var catalog = { images: [], info: { version: 1, author: 'node-xcassets' }, properties: { 'pre-rendered': true } };

    return async.mapSeries(images, iconAsset, function(err, assets) {
        if (err) return done(err);

        _.each(assets, function(asset, index) {
            if (asset) {
                names[images[index]] = asset.filename;
                var d = _.pick(asset, 'filename', 'idiom', 'role', 'subtype');
                d.scale = asset.scale + 'x';
                var points = asset.dimensions.width / asset.scale;
                if (points % 1 === 0) {
                    d.size = points + 'x' + points;
                }
                else {
                    //points = Math.round(asset.dimensions.width/asset.scale * 10) / 10;
                    d.size = points.toFixed(1) + 'x' + points.toFixed(1);
                }
                catalog.images.push(d);
            }
        });
        return done(null, { names: names, catalog: catalog });
    });
}
exports.iconCatalog = iconCatalog;


function launchCatalog(images, done) {
    var names = {};
    var catalog = { images: [], info: { version: 1, author: 'node-xcassets' } };

    return async.mapSeries(images, launchAsset, function(err, assets) {
        if (err) return done(err);

        _.each(assets, function(asset, index) {
            if (asset) {
                names[images[index]] = asset.filename;
                var d = _.pick(asset, 'filename', 'idiom', 'extent', 'scale', 'subtype', 'orientation', 'minimum-system-version');
                d.scale = asset.scale + 'x';
                catalog.images.push(d);
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

    return async.mapSeries(images, imageAsset, function(err, assets) {
        if (err) return done(err);

        _.each(assets, function(asset, index) {
            if (asset) asset['original-filename'] = images[index];
        });

        var partitions = dlutil.partition(_.compact(assets), function(asset) {
            return basename(asset['original-filename']);
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

    if (_.size(tmp) == 0) { return done(null, { names: names, catalogs: catalogs }); }
    return iconCatalog(tmp, function(err, info) {
        if (err) return done(err);
        names.icon = info.names;
        catalogs.icon = info.catalog;
        tmp = _.difference(tmp, _.keys(info.names));

        if (_.size(tmp) == 0) { return done(null, { names: names, catalogs: catalogs }); }
        return launchCatalog(tmp, function(err, info) {
            if (err) return done(err);
            names.launch = info.names;
            catalogs.launch = info.catalog;
            tmp = _.difference(tmp, _.keys(info.names));

            if (_.size(tmp) == 0) { return done(null, { names: names, catalogs: catalogs }); }
            return imageCatalogs(tmp, function(err, info) {
                if (err) return done(err);
                names.image = info.names;
                catalogs.image = info.catalogs;

                return done(null, { names: names, catalogs: catalogs });
            });
        });
    });
}
exports.catalogs = catalogs;

