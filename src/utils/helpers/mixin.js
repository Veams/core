var defaultsHelper = require('./defaults');
var methodExtendHelper = require('./method-extend');

if (!window.Veams) {
	window.Veams = {};
}

if (!window.Veams.helpers) {
	window.Veams.helpers = {};
}

const helpers = window.Veams.helpers;

/**
 * Merge method functions.
 *
 * @param {Object} from - Mixin object which will be merged via Helpers.defaults with the methods of our class
 * @param {Array} methods - Array of method names which will be extended.
 */
helpers.mixin = function mixin(from, methods = ['initialize', 'render']) {
	if (from === undefined) return;

	let to = this.prototype;

	/** Add those methods which exists on `from` but not on `to` to the latter */
	defaultsHelper(to, from);

	/** we do the same for events */
	if (to.events) {
		defaultsHelper(to.events, from.events);
	}

	// Extend to's methods
	methods.forEach((method) => {
		methodExtendHelper(to, from, method);
	});
};

module.exports = helpers.mixin;
