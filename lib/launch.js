
const _ = require('underscore');

var SUBTYPE_DISPLAY = {
    '736h': 'Retina HD 5.5',
    '667h': 'Retina HD 4.7',
    'retina4': 'Retina 4',
};
exports.SUBTYPE_DISPLAY = SUBTYPE_DISPLAY;

var LAUNCH = [
    {
        description: 'iPhone Portrait\niOS 8',
        idiom: 'iphone',
        subtype: '736h',
        orientation: 'portrait',
        'minimum-system-version': '8.0',
        extent: 'full-screen',
        filename: 'launch-portrait-736h@3x~iphone.png',
        scale: 3,
        dimensions: {
            width: 1242,
            height: 2208,
        },
    },
    {
        description: 'iPhone Portrait\niOS 8',
        idiom: 'iphone',
        subtype: '667h',
        orientation: 'portrait',
        'minimum-system-version': '8.0',
        extent: 'full-screen',
        filename: 'launch-portrait-667h@2x~iphone.png',
        scale: 2,
        dimensions: {
            width: 750,
            height: 1334,
        },
    },
    {
        description: 'iPhone Landscape\niOS 8',
        idiom: 'iphone',
        subtype: '736h',
        orientation: 'landscape',
        'minimum-system-version': '8.0',
        extent: 'full-screen',
        filename: 'launch-landscape-736h@3x~iphone.png',
        scale: 3,
        dimensions: {
            width: 2208,
            height: 1242,
        },
    },
    {
        description: 'iPhone Portrait\niOS 7,8',
        idiom: 'iphone',
        orientation: 'portrait',
        'minimum-system-version': '7.0',
        extent: 'full-screen',
        filename: 'launch-portrait-480h@2x~iphone.png',
        scale: 2,
        dimensions: {
            width: 640,
            height: 960,
        },
    },
    {
        description: 'iPhone Portrait\niOS 7,8',
        idiom: 'iphone',
        subtype: 'retina4',
        orientation: 'portrait',
        'minimum-system-version': '7.0',
        extent: 'full-screen',
        filename: 'launch-portrait-568h@2x~iphone.png',
        scale: 2,
        dimensions: {
            width: 640,
            height: 1136,
        },
    },
    {
        description: 'iPad Portrait\niOS 7,8',
        idiom: 'ipad',
        orientation: 'portrait',
        'minimum-system-version': '7.0',
        extent: 'full-screen',
        filename: 'launch-portrait~ipad.png',
        scale: 1,
        dimensions: {
            width: 768,
            height: 1024,
        },
    },
    {
        description: 'iPad Portrait\niOS 7,8',
        idiom: 'ipad',
        orientation: 'portrait',
        'minimum-system-version': '7.0',
        extent: 'full-screen',
        filename: 'launch-portrait@2x~ipad.png',
        scale: 2,
        dimensions: {
            width: 1536,
            height: 2048,
        },
    },
    {
        description: 'iPad Landscape\niOS 7,8',
        idiom: 'ipad',
        orientation: 'landscape',
        'minimum-system-version': '7.0',
        extent: 'full-screen',
        filename: 'launch-landscape~ipad.png',
        scale: 1,
        dimensions: {
            width: 1024,
            height: 768,
        },
    },
    {
        description: 'iPad Landscape\niOS 7,8',
        idiom: 'ipad',
        orientation: 'landscape',
        'minimum-system-version': '7.0',
        extent: 'full-screen',
        filename: 'launch-landscape@2x~ipad.png',
        scale: 2,
        dimensions: {
            width: 2048,
            height: 1536,
        },
    },
    /* I guess I don't support iOS <= 6 launch images :P
    {
        description: 'iPhone Portrait\niOS 5,6',
        idiom: 'iphone',
        orientation: 'portrait',
        extent: 'full-screen',
        filename: 'launch-6-portrait-480h~iphone.png',
        scale: 1,
        dimensions: {
            width: 320,
            height: 480,
        },
    },
    {
        description: 'iPhone Portrait\niOS 5,6',
        idiom: 'iphone',
        orientation: 'portrait',
        extent: 'full-screen',
        filename: 'launch-6-portrait-480h@2x~iphone.png',
        scale: 2,
        dimensions: {
            width: 640,
            height: 960,
        },
    },
    {
        description: 'iPhone Portrait\niOS 5,6',
        idiom: 'iphone',
        orientation: 'portrait',
        subtype: 'retina4',
        extent: 'full-screen',
        filename: 'launch-6-portrait-568h@2x~iphone.png',
        scale: 2,
        dimensions: {
            width: 640,
            height: 1136,
        },
    },
    {
        description: 'iPad Portrait\nWithout Status Bar\niOS 5,6',
        idiom: 'ipad',
        orientation: 'portrait',
        extent: 'to-status-bar',
        filename: 'launch-6-portrait-nostatus~ipad.png',
        scale: 1,
        dimensions: {
            width: 768,
            height: 1004,
        },
    },
    {
        description: 'iPad Portrait\nWithout Status Bar\niOS 5,6',
        idiom: 'ipad',
        orientation: 'portrait',
        extent: 'to-status-bar',
        filename: 'launch-6-portrait-nostatus@2x~ipad.png',
        scale: 2,
        dimensions: {
            width: 1536,
            height: 2008,
        },
    },
    {
        description: 'iPad Portrait\niOS 5,6',
        idiom: 'ipad',
        orientation: 'portrait',
        extent: 'full-screen',
        filename: 'launch-6-portrait~ipad.png',
        scale: 1,
        dimensions: {
            width: 768,
            height: 1024,
        },
    },
    {
        description: 'iPad Portrait\niOS 5,6',
        idiom: 'ipad',
        orientation: 'portrait',
        extent: 'full-screen',
        filename: 'launch-6-portrait@2x~ipad.png',
        scale: 2,
        dimensions: {
            width: 1536,
            height: 2048,
        },
    },
    {
        description: 'iPad Landscape\nWithout Status Bar\niOS 5,6',
        idiom: 'ipad',
        orientation: 'landscape',
        extent: 'to-status-bar',
        filename: 'launch-6-landscape-nostatus~ipad.png',
        scale: 1,
        dimensions: {
            width: 1024,
            height: 748,
        },
    },
    {
        description: 'iPad Landscape\nWithout Status Bar\niOS 5,6',
        idiom: 'ipad',
        orientation: 'landscape',
        extent: 'to-status-bar',
        filename: 'launch-6-landscape-nostatus@2x~ipad.png',
        scale: 2,
        dimensions: {
            width: 2048,
            height: 1496,
        },
    },
    {
        description: 'iPad Landscape\niOS 5,6',
        idiom: 'ipad',
        orientation: 'landscape',
        extent: 'full-screen',
        filename: 'launch-6-landscape~ipad.png',
        scale: 1,
        dimensions: {
            width: 1024,
            height: 768,
        },
    },
    {
        description: 'iPad Landscape\niOS 5,6',
        idiom: 'ipad',
        orientation: 'landscape',
        extent: 'full-screen',
        filename: 'launch-6-landscape@2x~ipad.png',
        scale: 2,
        dimensions: {
            width: 2048,
            height: 1536,
        },
    },
    */
];
exports.LAUNCH = LAUNCH;

exports.launchImagesForIdiom = function(idiom) {
    return _.filter(LAUNCH, function(image) {
        return image.idiom == idiom;
    });
};

exports.launchImagesForDimensions = function(width, height) {
    return _.filter(LAUNCH, function(image) {
        return image.dimensions.width == width && image.dimensions.height == height;
    });
};
