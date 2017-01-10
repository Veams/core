const defaultsHelper = require('../utils/helpers/defaults');
const isTouchHelper = require('../utils/helpers/is-touch');
const mediaQueryHandler = require('../utils/media-query-handler');
const logger = require('../utils/logger');

/**
 * Imports
 *
 * TODO: Clean up bindings
 */
import Modules from './modules';

class Core {
	constructor() {
		// General options
		this.options = {
			$: false,
			namespace: 'App',
			attrPrefix: 'data-js',
			mediaQueryProp: 'font-family'
		};
	}

	set options(options) {
		this._options = defaultsHelper(options || {}, this._options);
	}

	get options() {
		return this._options;
	}

	initialize(opts) {
		/**
		 * Set global options on initialize
		 */
		this.options = Veams.options = opts;

		if (!window.Veams) {
			window.Veams = {};
		}

		/**
		 * Namespace of application
		 */
		if (!window[this.options.namespace]) {
			window[this.options.namespace] = window[this.options.namespace] || {};
			window[this.options.namespace].Templates = window[this.options.namespace].Templates || {};
		}

		/**
		 * Reference to Veams-query.js or jQuery instance
		 * @memberof Veams
		 */
		if (!this.options.$) {
			throw new Error('You need to pass a dom handler like jQuery or Veams-Query to VeamsCore by providing the option "$"!');
		} else {
			window.Veams.$ = this.options.$;
		}

		/**
		 * Veams Module Handling
		 */
		Veams.modules = new Modules();

		/**
		 * Veams Global Pub/Sub System
		 * @memberof Veams
		 */
		Veams.Vent = Veams.$(document);

		/**
		 * Media Query Handler
		 */
		mediaQueryHandler(this.options);

		/**
		 * Logger functionality
		 */
		logger();

		/**
		 * Support
		 */
		Veams.support.touch = isTouchHelper();
	}
}

const core = new Core();

export default core;