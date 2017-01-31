/**
 * Imports
 */
import EVENTS from '../utils/events';
const throttleHelper = require('./../utils/helpers/throttle');

const VeamsMediaQueryHandler = {
	pluginName: 'MediaQueryHandler',
	initialize: function (Veams, opts = {
		mediaQueryProp: 'font-family',
		delay: 300
	}) {
		// Media Query
		let head = document.querySelectorAll('head');
		let delay = opts.delay || 300;
		let mediaQueryProp = opts.mediaQueryProp || 'font-family';

		/**
		 * Add current media query to Veams
		 */
		Veams.currentMedia = window.getComputedStyle(head[0], null).getPropertyValue(mediaQueryProp);

		// Trigger global resize event
		window.onresize = throttleHelper(function (e) {
			let currentMedia = window.getComputedStyle(head[0], null).getPropertyValue(mediaQueryProp);
			let width = window.innerWidth;

			if (currentMedia !== Veams.currentMedia) {
				let oldMedia = Veams.currentMedia;

				Veams.currentMedia = currentMedia;

				console.log('Veams.currentMedia: ', Veams.currentMedia);

				if (Veams.Vent) {
					Veams.Vent.trigger(EVENTS.mediachange, {
						type: EVENTS.mediachange,
						currentMedia: currentMedia,
						oldMedia: oldMedia
					});
				}
			}

			if (width !== Veams.screenSize.width) {
				Veams.screenSize.width = width;
				Veams.Vent.trigger(EVENTS.resize, e);
			}
		}, delay);
	}
};

export default VeamsMediaQueryHandler;