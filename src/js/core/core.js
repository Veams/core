let VEAMS = {};

class Core {
	constructor(Veams) {
		VEAMS = Veams;
	}

	set options(options) {
		this._options = VEAMS.helpers.extend(VEAMS.options, options || {});
	}

	get options() {
		return this._options;
	}

	initialize(opts) {
		/**
		 * Set global options on initialize
		 */
		this.options = opts;
		VEAMS.options = this.options;

		/**
		 * Namespace of application
		 */
		if (!window[VEAMS.options.namespace]) {
			window[VEAMS.options.namespace] = window[VEAMS.options.namespace] || {};
			window[VEAMS.options.namespace].Templates = window[VEAMS.options.namespace].Templates || {};
		}

		/**
		 * Support Detection
		 */
		VEAMS.detections = VEAMS.helpers.extend({
			touch: VEAMS.helpers.isTouch()
		}, Veams.detections || {});
	}
}

/**
 * Plugin object
 */
const VeamsCore = {
	initialize: function (Veams) {
		Veams.core = Veams.core || new Core(Veams);
	}
};

export default VeamsCore;