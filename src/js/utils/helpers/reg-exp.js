/**
 * Return new RegExp
 *
 * @param {string} regEx - Regular Expression
 *
 * @return {RegExp}
 */
module.exports = function regExp(regEx) {
	return new RegExp("(^|\\s+)" + regEx + "(\\s+|$)");
};