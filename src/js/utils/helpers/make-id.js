/**
 * Generates numeric id.
 *
 * @param {Number} [segments=1] - number of segments of generated id (segments consist of 10 digits, separated by '-').
 *
 * @return {String} - generated id
 */
module.exports = function makeId(segments = 1) {
	let array = window.crypto.getRandomValues(new Uint32Array(segments));
	let id = '';
	let i = 0;

	for (; i < array.length; i++) {
		id += array[i] + '-';
	}

	return id.slice(0, -1);
};