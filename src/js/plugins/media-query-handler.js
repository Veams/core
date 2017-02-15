/**
 * Imports
 */
const VeamsMediaQueryHandler = {
	options: {
		mediaQueryProp: 'font-family',
		delay: 300
	},
	pluginName: 'MediaQueryHandler',
	initialize: function (Veams, opts) {
		// Media Query
		let head = document.querySelectorAll('head');

		if (opts) {
			this.options = Veams.helpers.defaults(opts || {}, this.options);
		}

		/**
		 * Add current media query to Veams
		 */
		Veams.currentMedia = window.getComputedStyle(head[0], null).getPropertyValue(this.options.mediaQueryProp);

		if (!Veams.Vent) {
			console.info('VeamsMediaQueryHandler :: In order to work properly with the VeamsMediaQueryHandler plugin you should add the VeamsVent plugin!');
		}

		// Trigger global resize event
		window.onresize = Veams.helpers.throttle((e) => {
			let currentMedia = window.getComputedStyle(head[0], null).getPropertyValue(this.options.mediaQueryProp);
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
		}, this.options.delay);
	}
};

export default VeamsMediaQueryHandler;