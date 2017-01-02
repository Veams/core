if (!window.Veams) {
	window.Veams = {};
}

if (!window.Veams.helpers) {
	window.Veams.helpers = {};
}

const helpers = window.Veams.helpers;

/**
 * Touch Detection
 */
helpers.isTouch = function isTouch() {
	return 'ontouchstart' in window;
};

module.exports = helpers.isTouch;
