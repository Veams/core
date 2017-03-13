/**
 * Polyfills
 */
import '../utils/polyfills/custom-event';
import use from './use';

/**
 * Imports
 */
import EVENTS from '../utils/events';
import VeamsCore from './core';
import VeamsHelpers from '../plugins/helpers';

/**
 * @namespace Veams
 */
let defaults = {
	EVENTS: EVENTS,
	helpers: {},
	options: {
		namespace: 'App'
	},
	plugins: {},
	detections: {
		width: window.innerWidth,
		height: window.innerHeight
	},
	version: '5.0.0-rc7'
};
let Veams = Veams || defaults;

(function (window, document, undefined) {
	'use strict';

	window.Veams = Veams;

	/**
	 * Add use functionality
	 */
	Veams.use = use;

	/**
	 * Standard plugins
	 */
	Veams.use(VeamsCore);
	Veams.use(VeamsHelpers);

})(window, document);

export default Veams;