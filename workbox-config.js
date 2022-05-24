module.exports = {
	globDirectory: 'docs/',
	globPatterns: [
		'**/*.{png,txt,svg,ttf,woff2,ico,html,js,webmanifest,json,css}'
	],
	swDest: 'docs/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};