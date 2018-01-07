/**
 * Represents VeamsCore.
 * @module VeamsCore
 *
 * @author Sebastian Fitzner
 */
import '../utils/polyfills/custom-event';
import use from './use';

import EVENTS, { EVENTSType } from '../utils/events';
import VeamsHelpers, { VeamsHelpersType } from '../plugins/helpers';
import { VeamsOptions } from './veamsOptions';

let initState = false;

class VeamsCore {
	_initialized: any;
	
	/**
	 * Current Veams Version
	 */
	_version: any;

	/**
	 * 
	 */
	detections: { width: number; height: number; };

	/**
	 * Registered Veamshelpers
	 */
	helpers: VeamsHelpersType

	/**
	 * Available Events
	 */
	EVENTS: EVENTSType;
	
	
	Plugins: {};
	use: any;

	/**
	 * Base information about veams
	 */
	base: { name: string; version: string; };

	/**
	 * Veams options
	 */
	_options: VeamsOptions;

	constructor(opts) {
		this._options = {
			namespace: 'Veams',
			addToGlobal: false
		};

		this.base = {
			name: 'Veams',
			version: '5.0.1'
		};

		this.use = use.bind(this);
		this.Plugins = {};
		this.EVENTS = EVENTS;
		this.helpers = {};
		this.detections = {
			width: window.innerWidth,
			height: window.innerHeight
		};

		initState = false;

		this.setup(opts);
	}

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
		this._options = this.helpers.extend(this.options, options || {});
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

		this.detections = this.helpers.extend({
			touch: this.helpers.isTouch()
		}, this.detections);

		this.options = opts;
	}

	/**
	 * Initialize veams core
	 * @param opts Options
	 */
	initialize(opts?: VeamsOptions) {
		if (initState === true) {
			return console.info('Veams :: You already initialized Veams!');
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

		initState = true;
	}

	/**
	 * On init lifecyle hook
	 * @param cb 
	 */
	onInitialize(cb: () => any): any {
		if (!cb || typeof cb !== 'function') {
			console.log('Veams :: Callback is not a function!');
			return;
		}

		if (initState === false) {
			this.initialize();
		}

		cb();
	}

	/**
	 * On DOM ready livecycle hook
	 * @param cb 
	 */
	onDOMReady(cb: () => any) {
		if (typeof cb !== 'function') {
			console.log('Veams :: Callback is not a function!');
			return;
		}
		document.addEventListener('DOMContentLoaded', cb);
	}
}

export default VeamsCore;