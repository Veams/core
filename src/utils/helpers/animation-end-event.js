if (!window.Veams) {
	window.Veams = {};
}

if (!window.Veams.helpers) {
	window.Veams.helpers = {};
}

const helpers = window.Veams.helpers;

/**
 * Detect animationend event.
 */
helpers.animationEndEvent = function animationEndEvent() {
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

module.exports = helpers.animationEndEvent;
