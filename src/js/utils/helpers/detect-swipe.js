'use strict';

/**
 * Detect swipe gestures
 *
 * @param {Object} el - element to detect swipes on
 * @param {Number} threshold - threshold for swipe (in px)
 */
export default function detectSwipe(el, threshold) {
	let touchstartX = 0;
	let touchstartY = 0;
	let touchendX = 0;
	let touchendY = 0;
	let swipeThreshold = threshold || 0;

	function handleSwipe() {
		let deltaX = Math.abs(touchstartX - touchendX);
		let deltaY = Math.abs(touchstartY - touchendY);

		if (deltaX > swipeThreshold) {
			if (touchendX < touchstartX) {
				el.dispatchEvent(new CustomEvent('swipe', {
					detail: {
						direction: 'left'
					}
				}));
			}

			if (touchendX > touchstartX) {
				el.dispatchEvent(new CustomEvent('swipe', {
					detail: {
						direction: 'right'
					}
				}));
			}
		}

		if (deltaY > swipeThreshold) {
			if (touchendY < touchstartY) {
				el.dispatchEvent(new CustomEvent('swipe', {
					detail: {
						direction: 'up'
					}
				}));
			}

			if (touchendY > touchstartY) {
				el.dispatchEvent(new CustomEvent('swipe', {
					detail: {
						direction: 'down'
					}
				}));
			}
		}
	}

	el.addEventListener('touchstart', function (e) {
		touchstartX = e.touches[0].clientX;
		touchstartY = e.touches[0].clientY;
	}, false);

	el.addEventListener('touchend', function (e) {
		touchendX = e.changedTouches[0].clientX;
		touchendY = e.changedTouches[0].clientY;

		handleSwipe();

	}, false);
};