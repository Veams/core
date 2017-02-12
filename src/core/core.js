const defaultsHelper = require('../utils/helpers/defaults');
const isTouchHelper = require('../utils/helpers/is-touch');

class Core {
	constructor() {
		// General options
		this.options = {
			namespace: 'App',
			attrPrefix: 'data-js'
		};
		this.pluginName = 'Core';
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
		this.options = opts;

		if (!Veams) {
			Veams = window.Veams = {};
		}

		Veams.options = this.options;

		/**
		 * Namespace of application
		 */
		if (!window[this.options.namespace]) {
			window[this.options.namespace] = window[this.options.namespace] || {};
			window[this.options.namespace].Templates = window[this.options.namespace].Templates || {};
		}

		/**
		 * Support Detection
		 */
		Veams.detections = defaultsHelper(Veams.detections || {}, {
			touch: isTouchHelper()
		});
	}
}

const core = new Core();

export default core;