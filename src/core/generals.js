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
let Veams = window.Veams = window.Veams || {};

(function (window, document, undefined) {
	'use strict';
	// Version
	Veams.version = '5.0.0-alpha.5';
	// Global events
	Veams.EVENTS = EVENTS;
	/**
	 * Helper functions object
	 * @memberof Veams
	 */
	Veams.helpers = Veams.helpers || {};
	// Screen Size
	Veams.screenSize = Veams.screenSize || {
		width: window.innerWidth,
		height: window.innerHeight
	};
	// Feature detection
	Veams.support = Veams.support || {};
	// Plugins
	Veams.Plugins = {};
	// Plugin support
	Veams.use = use;

	// Add Core as default
	Veams.core = Veams.core || core;

})(window, document);

export default Veams;