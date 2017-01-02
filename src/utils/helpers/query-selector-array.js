if (!window.Veams) {
	window.Veams = {};
}

if (!window.Veams.helpers) {
	window.Veams.helpers = {};
}

const helpers = window.Veams.helpers;

/**
 * Get dom elements in an array
 *
 * @param {String} elem - Required: selector
 * @param {Object} [context] - Optional: context
 *
 * @return {Array}
 */
helpers.querySelectorArray = helpers.$ = function querySelectorArray(elem, context) {
	if (!elem) throw new Error('In order to work with querySelectorArray you need to define an element as string!');
	let el = elem;
	let customContext = context || document;

	return Array.prototype.slice.call((customContext).querySelectorAll(el));
};

module.exports = helpers.querySelectorArray;
