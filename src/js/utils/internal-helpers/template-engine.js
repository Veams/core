/**
 * Simple template engine for event system.
 *
 * @param {String} tplStr - Template string.
 *
 * @return String
 */
const templateEngine = function templateEngine(tplStr) {
	let reg = new RegExp('(\{\{\s?)(.+)(\s?\}\})');
	let match = reg.exec(tplStr);
	let returnVal = '';

	if (match) {
		returnVal = match[2];
	} else {
		returnVal = tplStr;
	}

	return returnVal;
};

export default templateEngine;