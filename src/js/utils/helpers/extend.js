'use strict';

/**
 * Simple extend method to extend the properties of an object.
 *
 * @param {Object} obj - object which will be extended
 *
 * @return {Object} obj - extended object
 */
export default function extend(obj) {
	[].slice.call(arguments, 1).forEach((item) => {
		for (let key in item) obj[key] = item[key];
	});
	return obj;
};