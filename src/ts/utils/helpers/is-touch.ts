'use strict';

/**
 * Touch Detection
 */
export default function isTouch() {
	return 'ontouchstart' in window;
};