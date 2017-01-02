if (!window.Veams) {
	window.Veams = {};
}

if (!window.Veams.helpers) {
	window.Veams.helpers = {};
}

const helpers = window.Veams.helpers;

/**
 * Find index of a specific item in an array.
 *
 * @param {Array} array - array in which we search for
 * @param {Object} item - item which will be searched
 */
helpers.indexOf = function indexOf(array, item) {
	if (array == null) return -1;
	let l;
	let i;

	for (i = 0, l = array.length; i < l; i++)
		if (array[i] === item) return i;
	return -1;
};

module.exports = helpers.indexOf;
