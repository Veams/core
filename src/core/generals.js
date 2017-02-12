/**
 * Polyfills
 */
import '../utils/polyfills/custom-event';
import use from './use';

/**
 * Imports
 */
import EVENTS from '../utils/events';
import core from './core';

/**
 * @namespace Veams
 */
let Veams = Veams || {
		EVENTS: EVENTS,
		core: core,
		helpers: {},
		plugins: {},
		detections: {
			width: window.innerWidth,
			height: window.innerHeight
		},
		version: '5.0.0-alpha.10'
	};

(function (window, document, undefined) {
	'use strict';

	window.Veams = Veams;
	Veams.use = use.bind(Veams);
})(window, document);

export default Veams;