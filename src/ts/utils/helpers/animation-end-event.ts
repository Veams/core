'use strict';

/**
 * Detect animationend event.
 */
export default function animationEndEvent() {
	let t;
	let el = document.createElement('fakeelement');
	let animations = {
		'animation': 'animationend',
		'OAnimation': 'oAnimationEnd',
		'MozAnimation': 'animationend',
		'WebkitAnimation': 'webkitAnimationEnd'
	};

	for (t in animations) {
		if (el.style[t] !== undefined) {
			return animations[t];
		}
	}
};