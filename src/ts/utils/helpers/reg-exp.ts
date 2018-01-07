'use strict';

/**
 * Return new RegExp
 *
 * @param {string} regEx - Regular Expression
 *
 * @return {RegExp}
 */
export default function regExp(regEx) {
	return new RegExp("(^|\\s+)" + regEx + "(\\s+|$)");
};