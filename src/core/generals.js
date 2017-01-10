/**
 * Polyfills
 */
import '../utils/polyfills/custom-event';

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
	Veams.version = '5.0.0-alpha.2';
	// Dom handler
	Veams.$ = Veams.$ || window.VeamsQuery || window.jQuery;
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
	// Current Media Query
	Veams.currentMedia = Veams.currentMedia || '';
	// Core
	Veams.core = Veams.core || core;
})(window, document);

export default Veams;