var throttleHelper = require('./helpers/throttle');

/**
 * Imports
 */
import EVENTS from './events';

export default function (opts) {
	if (!window.Veams) {
		window.Veams = {};
	}
	// Media Query
	let head = document.querySelectorAll('head');

	/**
	 * Add current media query to Veams
	 */
	Veams.currentMedia = window.getComputedStyle(head[0], null).getPropertyValue(opts.mediaQueryProp);

	// Trigger global resize event
	window.onresize = throttleHelper(function (e) {
		let currentMedia = window.getComputedStyle(head[0], null).getPropertyValue(opts.mediaQueryProp);
		let width = window.innerWidth;

		if (currentMedia !== Veams.currentMedia) {
			let oldMedia = Veams.currentMedia;

			Veams.currentMedia = currentMedia;

			console.log('Veams.currentMedia: ', Veams.currentMedia);

			Veams.Vent.trigger(EVENTS.mediachange, {
				type: EVENTS.mediachange,
				currentMedia: currentMedia,
				oldMedia: oldMedia
			});
		}

		if (width !== Veams.screenSize.width) {
			Veams.screenSize.width = width;
			Veams.Vent.trigger(EVENTS.resize, e);
		}
	}, 300);
}