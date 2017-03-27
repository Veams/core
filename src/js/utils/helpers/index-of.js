'use strict';

/**
 * Find index of a specific item in an array.
 *
 * @param {Array} array - array in which we search for
 * @param {Object} item - item which will be searched
 */
export default function indexOf(array, item) {
	if (array == null) return -1;
	let l;
	let i;

	for (i = 0, l = array.length; i < l; i++)
		if (array[i] === item) return i;
	return -1;
};