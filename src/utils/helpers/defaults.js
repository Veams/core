if (!window.Veams) {
	window.Veams = {};
}

if (!window.Veams.helpers) {
	window.Veams.helpers = {};
}
const helpers = window.Veams.helpers;

/**
 * Simple extend method, which extends an object.
 *
 * @param {Object} obj - object which will be extended
 *
 * @return {Object} obj - extended object
 */
helpers.defaults = function defaults(obj) {
	[].slice.call(arguments, 1).forEach((item) => {
		for (let key in item) {
			if (obj[key] === undefined) obj[key] = item[key];
		}
	});
	return obj;
};

module.exports = helpers.defaults;