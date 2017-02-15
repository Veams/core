/**
 * Detect transitionend event.
 */
module.exports = function transitionEndEvent() {
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