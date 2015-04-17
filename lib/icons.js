
const _ = require('underscore');

var ICONS = [
    {
        description: 'iPhone\nSpotlight - iOS 5,6\nSettings - iOS 5-8\n29pt',
        idiom: 'iphone',
        filename: 'icon-29~iphone.png',
        scale: 1,
        dimensions: {
            width: 29,
            height: 29,
        },
    },
    {
        description: 'iPhone\nSpotlight - iOS 5,6\nSettings - iOS 5-8\n29pt',
        idiom: 'iphone',
        filename: 'icon-29@2x~iphone.png',
        scale: 2,
        dimensions: {
            width: 58,
            height: 58,
        },
    },
    {
        description: 'iPhone\nSpotlight - iOS 5,6\nSettings - iOS 5-8\n29pt',
        idiom: 'iphone',
        filename: 'icon-29@3x~iphone.png',
        scale: 3,
        dimensions: {
            width: 87,
            height: 87,
        },
    },
    {
        description: 'iPhone Spotlight\niOS 7,8\n40pt',
        idiom: 'iphone',
        filename: 'icon-40@2x~iphone.png',
        scale: 2,
        dimensions: {
            width: 80,
            height: 80,
        },
    },
    {
        description: 'iPhone Spotlight\niOS 7,8\n40pt',
        idiom: 'iphone',
        filename: 'icon-40@3x~iphone.png',
        scale: 3,
        dimensions: {
            width: 120,
            height: 120,
        },
    },
    {
        description: 'iPhone App\niOS 5,6\n57pt',
        idiom: 'iphone',
        filename: 'icon-57~iphone.png',
        scale: 1,
        dimensions: {
            width: 57,
            height: 57,
        },
    },
    {
        description: 'iPhone App\niOS 5,6\n57pt',
        idiom: 'iphone',
        filename: 'icon-57@2x~iphone.png',
        scale: 2,
        dimensions: {
            width: 114,
            height: 114,
        },
    },
    {
        description: 'iPhone App\niOS 7,8\n60pt',
        idiom: 'iphone',
        filename: 'icon-60@2x~iphone.png',
        scale: 2,
        dimensions: {
            width: 120,
            height: 120,
        },
    },
    {
        description: 'iPhone App\niOS 7,8\n60pt',
        idiom: 'iphone',
        filename: 'icon-60@3x~iphone.png',
        scale: 3,
        dimensions: {
            width: 180,
            height: 180,
        },
    },
    {
        description: 'iPad Settings\niOS 5-8\n29pt',
        idiom: 'ipad',
        filename: 'icon-29~ipad.png',
        scale: 1,
        dimensions: {
            width: 29,
            height: 29,
        },
    },
    {
        description: 'iPad Settings\niOS 5-8\n29pt',
        idiom: 'ipad',
        filename: 'icon-29@2x~ipad.png',
        scale: 2,
        dimensions: {
            width: 58,
            height: 58,
        },
    },
    {
        description: 'iPad Spotlight\niOS 7,8\n40pt',
        idiom: 'ipad',
        filename: 'icon-40~ipad.png',
        scale: 1,
        dimensions: {
            width: 40,
            height: 40,
        },
    },
    {
        description: 'iPad Spotlight\niOS 7,8\n40pt',
        idiom: 'ipad',
        filename: 'icon-40@2x~ipad.png',
        scale: 2,
        dimensions: {
            width: 80,
            height: 80,
        },
    },
    {
        description: 'iPad Spotlight\niOS 5,6\n50pt',
        idiom: 'ipad',
        filename: 'icon-50~ipad.png',
        scale: 1,
        dimensions: {
            width: 50,
            height: 50,
        },
    },
    {
        description: 'iPad Spotlight\niOS 5,6\n50pt',
        idiom: 'ipad',
        filename: 'icon-50@2x~ipad.png',
        scale: 2,
        dimensions: {
            width: 100,
            height: 100,
        },
    },
    {
        description: 'iPad App\niOS 5,6\n72pt',
        idiom: 'ipad',
        filename: 'icon-72~ipad.png',
        scale: 1,
        dimensions: {
            width: 72,
            height: 72,
        },
    },
    {
        description: 'iPad App\niOS 5,6\n72pt',
        idiom: 'ipad',
        filename: 'icon-72@2x~ipad.png',
        scale: 2,
        dimensions: {
            width: 144,
            height: 144,
        },
    },
    {
        description: 'iPad App\niOS 7,8\n76pt',
        idiom: 'ipad',
        filename: 'icon-76~ipad.png',
        scale: 1,
        dimensions: {
            width: 76,
            height: 76,
        },
    },
    {
        description: 'iPad App\niOS 7,8\n76pt',
        idiom: 'ipad',
        filename: 'icon-76@2x~ipad.png',
        scale: 2,
        dimensions: {
            width: 152,
            height: 152,
        },
    },
    {
        description: 'CarPlay\niOS 8\n120pt',
        idiom: 'car',
        filename: 'icon-120~car.png',
        scale: 1,
        dimensions: {
            width: 120,
            height: 120,
        },
    },
    {
        description: 'Apple Watch\nNotification Center\n24pt + 27.5pt',
        idiom: 'watch',
        filename: 'icon-24@2x~watch.png',
        scale: 2,
        dimensions: {
            width: 48,
            height: 48,
        },
        role: 'notificationCenter',
        subtype: '38mm',
    },
    {
        description: 'Apple Watch\nNotification Center\n24pt + 27.5pt',
        idiom: 'watch',
        filename: 'icon-27.5@2x~watch.png',
        scale: 2,
        dimensions: {
            width: 55,
            height: 55,
        },
        role: 'notificationCenter',
        subtype: '42mm',
    },
    {
        description: 'Apple Watch\nCompanion Settings\n29pt',
        idiom: 'watch',
        filename: 'icon-29@2x~watch.png',
        scale: 2,
        dimensions: {
            width: 58,
            height: 58,
        },
        role: 'companionSettings',
    },
    {
        description: 'Apple Watch\nCompanion Settings\n29pt',
        idiom: 'watch',
        filename: 'icon-29@3x~watch.png',
        scale: 3,
        dimensions: {
            width: 84,
            height: 84,
        },
        role: 'companionSettings',
    },
    {
        description: 'Apple Watch\nHome Screen (All)\nLong Look (38mm)\n40pt',
        idiom: 'watch',
        filename: 'icon-40@2x~watch.png',
        scale: 2,
        dimensions: {
            width: 80,
            height: 80,
        },
        role: 'appLauncher',
        subtype: '38mm',
    },
    {
        description: 'Apple Watch\nLong Look\n44pt',
        idiom: 'watch',
        filename: 'icon-44@2x~watch.png',
        scale: 2,
        dimensions: {
            width: 88,
            height: 88,
        },
        role: 'longLook',
        subtype: '42mm',
    },
    {
        description: 'Apple Watch\nShort Look\n86pt + 98pt',
        idiom: 'watch',
        filename: 'icon-86@2x~watch.png',
        scale: 2,
        dimensions: {
            width: 172,
            height: 172,
        },
        role: 'quickLook',
        subtype: '38mm',
    },
    {
        description: 'Apple Watch\nShort Look\n86pt + 98pt',
        idiom: 'watch',
        filename: 'icon-98@2x~watch.png',
        scale: 2,
        dimensions: {
            width: 196,
            height: 196,
        },
        role: 'quickLook',
        subtype: '42mm',
    },
    {
        description: 'Mac\n16pt',
        idiom: 'mac',
        filename: 'icon-16~mac.png',
        scale: 1,
        dimensions: {
            width: 16,
            height: 16,
        },
    },
    {
        description: 'Mac\n16pt',
        idiom: 'mac',
        filename: 'icon-16@2x~mac.png',
        scale: 2,
        dimensions: {
            width: 32,
            height: 32,
        },
    },
    {
        description: 'Mac\n32pt',
        idiom: 'mac',
        filename: 'icon-32~mac.png',
        scale: 1,
        dimensions: {
            width: 32,
            height: 32,
        },
    },
    {
        description: 'Mac\n32pt',
        idiom: 'mac',
        filename: 'icon-32@2x~mac.png',
        scale: 2,
        dimensions: {
            width: 64,
            height: 64,
        },
    },
    {
        description: 'Mac\n128pt',
        idiom: 'mac',
        filename: 'icon-128~mac.png',
        scale: 1,
        dimensions: {
            width: 128,
            height: 128,
        },
    },
    {
        description: 'Mac\n128pt',
        idiom: 'mac',
        filename: 'icon-128@2x~mac.png',
        scale: 2,
        dimensions: {
            width: 256,
            height: 256,
        },
    },
    {
        description: 'Mac\n256pt',
        idiom: 'mac',
        filename: 'icon-256~mac.png',
        scale: 1,
        dimensions: {
            width: 256,
            height: 256,
        },
    },
    {
        description: 'Mac\n256pt',
        idiom: 'mac',
        filename: 'icon-256@2x~mac.png',
        scale: 2,
        dimensions: {
            width: 512,
            height: 512,
        },
    },
    {
        description: 'Mac\n512pt',
        idiom: 'mac',
        filename: 'icon-512~mac.png',
        scale: 1,
        dimensions: {
            width: 512,
            height: 512,
        },
    },
    {
        description: 'Mac\n512pt',
        idiom: 'mac',
        filename: 'icon-512@2x~mac.png',
        scale: 2,
        dimensions: {
            width: 1024,
            height: 1024,
        },
    },
];
exports.ICONS = ICONS;

exports.iconsWithScale = function(scale, subset) {
    if (subset === undefined) {
        subset = ICONS;
    }
    return _.filter(subset, function(icon) {
        return icon.scale == scale;
    });
}

exports.iconsForIdiom = function(idiom, subset) {
    if (subset === undefined) {
        subset = ICONS;
    }
    return _.filter(subset, function(icon) {
        return icon.idiom == idiom;
    });
};

exports.iconsForDimensions = function(width, height, subset) {
    if (subset === undefined) {
        subset = ICONS;
    }
    return _.filter(ICONS, function(icon) {
        return icon.dimensions.width == width && icon.dimensions.height == height;
    });
};
