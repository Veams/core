/**
 * Imports
 */
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

		if (!Veams.Vent) {
			console.info('VeamsMediaQueryHandler :: In order to work properly with the VeamsMediaQueryHandler plugin you should add the VeamsVent plugin!');
		}

		// Trigger global resize event
		window.onresize = Veams.helpers.throttle(function (e) {
			let currentMedia = window.getComputedStyle(head[0], null).getPropertyValue(mediaQueryProp);
			let width = window.innerWidth;

			if (currentMedia !== Veams.currentMedia) {
				let oldMedia = Veams.currentMedia;

				Veams.currentMedia = currentMedia;

				console.log('VeamsMediaQueryHandler :: Current media ', Veams.currentMedia);

				if (Veams.Vent) {
					Veams.Vent.trigger(Veams.EVENTS.mediachange, {
						type: Veams.EVENTS.mediachange,
						currentMedia: currentMedia,
						oldMedia: oldMedia
					});
				}
			}

			if (width !== Veams.detections.width) {
				Veams.detections.width = width;
				Veams.Vent.trigger(Veams.EVENTS.resize, e);
			}
		}, delay);
	}
};

export default VeamsMediaQueryHandler;