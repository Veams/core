'use strict';

/**
 * Simple extend method, which extends an object.
 *
 * @param {Object} obj - object which will be extended
 *
 * @return {Object} obj - extended object
 */
export default function defaultsHelper(obj) {
		[].slice.call(arguments, 1).forEach((item) => {
			for (let key in item) {
				if (obj[key] === undefined) obj[key] = item[key];
			}
		});
		return obj;
};