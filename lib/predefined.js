
var _ = require('underscore');

var ICONS = [
	{
		size: '29x29',
		scale: '1x',
		idiom: 'iphone',
		os: '7',
		scope: 'settings',
		description: 'iPhone iOS 7 Settings',
		filename: 'icon-settings-7.png',
		dimensions: {
			width: 29,
			height: 29,
		},
	},
	{
		size: '29x29',
		scale: '1x',
		idiom: 'ipad',
		os: '7',
		scope: 'settings',
		description: 'iPad iOS 7 Settings',
		filename: 'icon-settings-7~ipad.png',
		dimensions: {
			width: 29,
			height: 29,
		},
	},
	{
		size: '40x40',
		scale: '1x',
		idiom: 'ipad',
		scope: 'spotlight',
		os: '7',
		description: 'iPad iOS 7 Spotlight',
		filename: 'icon-spotlight-7~ipad.png',
		dimensions: {
			width: 40,
			height: 40,
		},
	},
	{
		size: '50x50',
		scale: '1x',
		idiom: 'ipad',
		scope: 'spotlight',
		os: 'pre-7',
		description: 'iPad iOS 6 Spotlight',
		filename: 'icon-spotlight~ipad.png',
		dimensions: {
			width: 50,
			height: 50,
		},
	},
	{
		size: '57x57',
		scale: '1x',
		idiom: 'iphone',
		scope: 'icon',
		os: '6',
		description: 'iPhone iOS 6 Icon',
		filename: 'icon.png',
		dimensions: {
			width: 57,
			height: 57,
		},
	},
	{
		size: '29x29',
		scale: '2x',
		idiom: 'iphone',
		scope: 'settings',
		os: '7',
		description: 'Retina iPhone iOS 7 Settings',
		filename: 'icon-settings-7@2x.png',
		dimensions: {
			width: 58,
			height: 58,
		},
	},
	{
		size: '29x29',
		scale: '2x',
		idiom: 'ipad',
		scope: 'settings',
		os: '7',
		description: 'Retina iPad iOS 7 Settings',
		filename: 'icon-settings-7@2x~ipad.png',
		dimensions: {
			width: 58,
			height: 58,
		},
	},
	{
		size: '72x72',
		scale: '1x',
		idiom: 'ipad',
		scope: 'icon',
		os: '6',
		description: 'iPad iOS 6 Icon',
		filename: 'icon~ipad.png',
		dimensions: {
			width: 72,
			height: 72,
		},
	},
	{
		size: '76x76',
		scale: '1x',
		idiom: 'ipad',
		scope: 'icon',
		os: '7',
		description: 'iPad iOS 7 Icon',
		filename: 'icon-7~ipad.png',
		dimensions: {
			width: 76,
			height: 76,
		},
	},
	{
		size: '40x40',
		scale: '2x',
		idiom: 'iphone',
		scope: 'spotlight',
		os: '7',
		description: 'Retina iPhone iOS 7 Spotlight',
		filename: 'icon-spotlight-7@2x.png',
		dimensions: {
			width: 80,
			height: 80,
		},
	},
	{
		size: '40x40',
		scale: '2x',
		idiom: 'ipad',
		scope: 'spotlight',
		os: '7',
		description: 'Retina iPad iOS 7 Spotlight',
		filename: 'icon-spotlight-7@2x~ipad.png',
		dimensions: {
			width: 80,
			height: 80,
		},
	},
	{
		size: '50x50',
		scale: '2x',
		idiom: 'ipad',
		scope: 'spotlight',
		os: '6',
		description: 'Retina iPad iOS 6 Spotlight',
		filename: 'icon-spotlight@2x~ipad.png',
		dimensions: {
			width: 100,
			height: 100,
		},
	},
	{
		size: '57x57',
		scale: '2x',
		idiom: 'iphone',
		scope: 'icon',
		os: '6',
		description: 'Retina iPhone iOS 6 Icon',
		filename: 'icon@2x.png',
		dimensions: {
			width: 114,
			height: 114,
		},
	},
	{
		size: '60x60',
		scale: '2x',
		idiom: 'iphone',
		scope: 'icon',
		os: '7',
		description: 'Retina iPhone iOS 7 Icon',
		filename: 'icon-7@2x.png',
		dimensions: {
			width: 120,
			height: 120,
		},
	},
	{
		size: '72x72',
		scale: '2x',
		idiom: 'ipad',
		scope: 'icon',
		os: '6',
		description: 'Retina iPad iOS 6 Icon',
		filename: 'icon@2x~ipad.png',
		dimensions: {
			width: 144,
			height: 144,
		},
	},
	{
		size: '76x76',
		scale: '2x',
		idiom: 'ipad',
		scope: 'icon',
		os: '7',
		description: 'Retina iPad iOS 7 Icon',
		filename: 'icon-7@2x~ipad',
		dimensions: {
			width: 152,
			height: 152,
		},
	}
];
exports.ICONS = ICONS;

function optionsForDimensions(dims) {
	return _.where(ICONS, { dimensions: dims });
}
exports.optionsForDimensions = optionsForDimensions;