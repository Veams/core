'use strict';

/**
 * Helper method to extend an already existing method.
 *
 * @param {Object} to - view which will be extended
 * @param {Object} from - methods which comes from mixin
 * @param {string} methodName - function name
 */
export default function methodExtend(to, from, methodName) {
	function isUndefined(value) {
		return typeof value === 'undefined';
	}

	if (from === undefined) return;

	// if the method is defined on from ...
	if (!isUndefined(from[methodName])) {
		let old = to[methodName];

		// ... we create a new function on to
		to[methodName] = function () {

			// wherein we first call the method which exists on `to`
			let oldReturn = old.apply(this, arguments);

			// and then call the method on `from`
			from[methodName].apply(this, arguments);

			// and then return the expected result,
			// i.e. what the method on `to` returns
			return oldReturn;
		};
	}
};