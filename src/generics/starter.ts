'use strict';
/**
 * Polyfills
 */
import '../utils/polyfills/custom-event';

/**
 * Imports
 */
import Core from './core';

/**
 * Veams Core Instance
 */
let Veams: Core;

(function (window, document, undefined) {
	'use strict';

	Veams = new Core({
		namespace: 'Veams',
		addToGlobal: true
	});

	Veams.initialize();

})(window, document);

export default Veams;