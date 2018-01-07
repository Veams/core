'use strict';

/**
 * Polyfills
 */
import '../utils/polyfills/custom-event';

/**
 * Imports
 */
import VeamsCore from './core';

let Veams = {};

(function (window, document, undefined) {
	'use strict';

	Veams = new VeamsCore({
		namespace: 'Veams',
		addToGlobal: true
	});

	Veams.initialize();

})(window, document);

export default Veams;