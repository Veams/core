if (!window.Veams) {
	window.Veams = {};
}

if (!window.Veams.helpers) {
	window.Veams.helpers = {};
}

const helpers = window.Veams.helpers;

/**
 * Detect transitionend event.
 */
helpers.transitionEndEvent = function transitionEndEvent() {
	let t;
	let el = document.createElement('fakeelement');
	let transitions = {
		'transition': 'transitionend',
		'OTransition': 'oTransitionEnd',
		'MozTransition': 'transitionend',
		'WebkitTransition': 'webkitTransitionEnd'
	};

	for (t in transitions) {
		if (el.style[t] !== undefined) {
			return transitions[t];
		}
	}
};

module.exports = helpers.transitionEndEvent;
