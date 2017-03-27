'use strict';

/**
 * Check if element is in a specific context
 * and return state as boolean
 *
 * @param {Object} elem - Element, which will be checked
 * @param {Object} context - Context element, in which our element could persists
 *
 * @return {boolean}
 */
export default function checkElementInContext(elem, context) {
	let currentNode = elem;
	let contextNode = context || context;

	while (currentNode.parentNode) {
		currentNode = currentNode.parentNode;

		if (currentNode === contextNode) {
			return true;
		}
	}

	return false;
};
