/**
 * Touch Detection
 */
module.exports = function isTouch() {
	return 'ontouchstart' in window;
};
