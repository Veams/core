if (!window.Veams) {
	window.Veams = {};
}

if (!window.Veams.helpers) {
	window.Veams.helpers = {};
}

const helpers = window.Veams.helpers;

/**
 * Return new RegExp
 *
 * @param {string} regEx - Regular Expression
 *
 * @return {RegExp}
 */
helpers.regExp = function regExp(regEx) {
	return new RegExp("(^|\\s+)" + regEx + "(\\s+|$)");
};

module.exports = helpers.regExp;
