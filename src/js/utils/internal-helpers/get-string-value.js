/**
 * Get value out of variable string.
 *
 * @param {String} str - String which is a reference to a var.
 *
 * @return String
 */
const getStringValue = function getStringValue(str) {
	if (str.indexOf('.') === -1) return str;
	let arr = str.split('.');
	let context = arr[0];
	let finalStr = context === 'this' ? this : window[context];
	let strReplacer = (el, prev) => {
		return prev[el];
	};

	arr.shift();
	arr.forEach((item) => {
		finalStr = strReplacer(item, finalStr);
		return finalStr;
	});

	if (typeof finalStr !== 'string') {
		throw new Error('The resulting variable out of your events object must be a string!');
	} else {
		return finalStr;
	}
};

export default getStringValue;