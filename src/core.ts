/**
 * Imports
 */

// Helpers
import extend from '@veams/helpers/lib/object/extend';
import isTouch from '@veams/helpers/lib/detection/is-touch';

// Polyfill
import './utils/polyfills/custom-event';

// Plugin System
import use from './plugins/use';

// Plugin
import VeamsHelpers, { VeamsHelpersType } from './plugins/helpers';

// Events
import EVENTS, { EVENTSType } from './utils/events';

/**
 * Interfaces
 */
export interface VeamsOptions {
	namespace?: string;
	addToGlobal?: boolean;
}

/**
 * Default values
 */
let defaultOptions = {
	namespace: 'Veams',
	addToGlobal: false
};

/**
 * Represents VeamsCore.
 * @module VeamsCore
 *
 * @author Sebastian Fitzner
 */
class Core {
	_initialized: boolean = false;

	/**
	 * Current Veams Version
	 */
	_version: any;

	/**
	 * Detection object
	 */
	detections: {
		width?: number;
		height?: number;
	};

	/**
	 * Registered Veamshelpers
	 */
	helpers: VeamsHelpersType;

	/**
	 * Available Events
	 */
	EVENTS: EVENTSType;

	/**
	 * Plugins Object
	 */
	Plugins: {};
	use: any;

	/**
	 * Base information about veams
	 */
	base: {
		name: string;
		version: string;
	};

	/**
	 * Veams options
	 */
	_options: VeamsOptions;

	/**
	 * Constructor
	 */
	constructor(opts: VeamsOptions) {
		this._options = defaultOptions;
		this.base = {
			name: 'Veams',
			version: '1.1.1'
		};

		this.use = use.bind(this);
		this.Plugins = {};
		this.EVENTS = EVENTS;
		this.helpers = {};
		this.detections = {
			width: window.innerWidth,
			height: window.innerHeight
		};

		this.setup(opts);
	}

	/**
	 * Getter & Setter
	 */
	set version(version) {
		this._version = version;
	}

	get version() {
		return this._version;
	}

	set initialized(bool) {
		this._initialized = bool;
	}

	get initialized() {
		return this._initialized;
	}

	set options(options) {
		this._options = extend(this.options, options || defaultOptions);
	}

	get options() {
		return this._options;
	}

	/**
	 * Setup Veams core
	 * @param opts
	 */
	setup(opts: VeamsOptions) {
		this.use(VeamsHelpers);

		this.detections = extend({
			touch: isTouch()
		}, this.detections);

		this.options = opts;
	}

	/**
	 * Initialize veams core
	 * @param opts Options
	 */
	initialize(opts: VeamsOptions = this.options) {
		if (this.initialized === true) {
			return console.info('@veams/core :: You already initialized Veams!');
		}

		/**
		 * Set global options on initialize
		 */
		this.options = opts;
		
		if (this.options.addToGlobal) {
			if (window && !window[this.options.namespace]) {
				window[this.options.namespace] = this || {};
			}
		}

		this.initialized = true;
	}

	/**
	 * On initialize lifecyle hook
	 *
	 * @param cb
	 */
	onInitialize(cb: () => any): any {
		if (!cb || typeof cb !== 'function') {
			console.log('@veams/core :: Callback is not a function!');
			return;
		}

		if (this.initialized === false) {
			this.initialize();
		}

		cb();
	}

	/**
	 * After initialize lifecycle hook
	 *
	 * @param cb
	 */
	afterInitialize(cb: () => any): void {
		if (!cb || typeof cb !== 'function') {
			console.log('@veams/core :: Callback is not a function!');
			return;
		}

		cb();
	}

	/**
	 * On DOM ready lifecycle hook
	 *
	 * @param cb
	 */
	onDOMReady(cb: () => any) {
		if (typeof cb !== 'function') {
			console.log('@veams/core :: Callback is not a function!');
			return;
		}
		document.addEventListener('DOMContentLoaded', cb);
	}
}

export default Core;