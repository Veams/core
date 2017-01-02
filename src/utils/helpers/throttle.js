if (!window.Veams) {
	window.Veams = {};
}

if (!window.Veams.helpers) {
	window.Veams.helpers = {};
}

const helpers = window.Veams.helpers;

/**
 * Throttle method for resize events and more
 *
 * @param {function} func - Function which will be executed.
 * @param {number} wait - number to wait in milliseconds.
 * @param {boolean} immediate - execute function immediately.
 */
helpers.throttle = function throttle(func, wait, immediate) {
	let timeout;

	return function () {
		let context = this;
		let args = arguments;
		let callNow = immediate && !timeout;
		let later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};

		clearTimeout(timeout);

		timeout = setTimeout(later, wait);

		if (callNow) func.apply(context, args);
	};
};
module.exports = helpers.throttle;
