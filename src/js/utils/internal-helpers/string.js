'use strict';

const stringHelpers = {};

/**
 * CamelCase strings by replacing hyphens, white space and points.
 *
 * @param {String} str - String which will be camelcased
 */
stringHelpers.toCamelCase = function (str) {
	// Lower cases the string
	return str.toLowerCase()
	// Replaces any - or _ characters with a space
		.replace(/[-_]+/g, ' ')
		// Removes any non alphanumeric characters
		.replace(/[^\w\s]/g, '')
		// Uppercases the first character in each group immediately following a space
		// (delimited by spaces)
		.replace(/ (.)/g, function ($1) {
			return $1.toUpperCase();
		})
		// Removes spaces
		.replace(/ /g, '');
};

/**
 * String which will be hyphenated by replacing white space and lower case the characters.
 * @param {String} str - String
 */
stringHelpers.hyphenate = function (str) {
	return str.replace(/\s/g, '-').toLowerCase();
};

/**
 * String.
 * @param {String} str - String where first char is upper cased
 */
stringHelpers.capitalizeFirstLetter = function (str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export default stringHelpers;