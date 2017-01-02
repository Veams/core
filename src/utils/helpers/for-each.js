if (!window.Veams) {
	window.Veams = {};
}

if (!window.Veams.helpers) {
	window.Veams.helpers = {};
}

const helpers = window.Veams.helpers;

/**
 * Simple forEach method
 *
 * @param {Array} array - array of objects
 * @param {function} callback - callback function
 * @param {string} scope - scope of function
 */
helpers.forEach = function forEach(array, callback, scope) {
	for (let i = 0; i < array.length; i++) {
		callback.call(scope, i, array[i]);
	}
};

module.exports = helpers.forEach;
