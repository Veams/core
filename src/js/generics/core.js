/**
 * Represents VeamsCore.
 * @module VeamsCore
 *
 * @author Sebastian Fitzner
 */
import '../utils/polyfills/custom-event';
import use from './use';

import EVENTS from '../utils/events';
import VeamsHelpers from '../plugins/helpers';

let initState = false;

class VeamsCore {
	constructor(opts) {
		this._options = {
			namespace: 'Veams',
			addToGlobal: false
		};

		this.base = {
			name: 'Veams',
			version: '5.0.0'
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

	setup(opts) {
		this.use(VeamsHelpers);

		this.detections = this.helpers.extend({
			touch: this.helpers.isTouch()
		}, this.detections);

		this.options = opts;
	}

	initialize(opts) {
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

	onInitialize(cb) {
		if (!cb || typeof cb !== 'function') {
			console.log('Veams :: Callback is not a function!');
			return;
		}

		if (initState === false) {
			this.initialize();
		}

		cb();
	}

	onDOMReady(cb) {
		if (typeof cb !== 'function') {
			console.log('Veams :: Callback is not a function!');
			return;
		}
		document.addEventListener('DOMContentLoaded', cb);
	}
}

export default VeamsCore;