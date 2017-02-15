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
import VeamsHelpers from '../plugins/helpers'

/**
 * @namespace Veams
 */
let Veams = Veams || {
		EVENTS: EVENTS,
		helpers: {},
		options: {
			global: false,
			namespace: 'App',
			attrPrefix: 'data-js'
		},
		plugins: {},
		detections: {
			width: window.innerWidth,
			height: window.innerHeight
		},
		version: '5.0.0-rc1'
	};
Veams.use = use.bind(Veams);

/**
 * Standard plugins
 */
Veams.use(VeamsCore);
Veams.use(VeamsHelpers);

export default Veams;