import extendHelper from '../utils/helpers/extend';
import mixinsHelper from '../utils/helpers/mixin';
import methodExtendHelper from '../utils/helpers/method-extend';
import touchHelper from '../utils/helpers/is-touch';
import throttleHelper from '../utils/helpers/throttle';
import selectorHelper from '../utils/helpers/query-selector-array';
import foreachHelper from '../utils/helpers/for-each';
import makeIdHelper from '../utils/helpers/make-id';

const VeamsHelpers = {
	pluginName: 'Helpers',
	initialize: function (Veams) {
		Veams.addHelper = function addHelper(...args) {
			let params = [...args];

			if (params.length === 1) {
				if (typeof params[0] !== 'object') {
					console.error('VeamsHelpers :: You need to pass an object!');
					return;
				}

				for (let key in params[0]) {
					if (params[0].hasOwnProperty(key)) {
						if (!Veams.helpers[key]) {
							Veams.helpers[key] = params[0][key];
						} else {
							console.info(`VeamsHelpers :: The helper ${key} is already defined! Please define a new name for: `, params[0][key]);
						}
					}
				}
			} else if (params.length === 2) {

				if (!Veams.helpers[params[0]]) {
					if (typeof params[0] !== 'string' || typeof params[1] !== 'function') {
						console.error('VeamsHelpers :: You need to pass a string as first argument and the helper function as second one.');
						return;
					}
					Veams.helpers[params[0]] = params[1];
				} else {
					console.info(`VeamsHelpers :: The helper ${params[0]} is already defined! Please define a new name for: `, params[1]);
				}
			}
		};

		this.addDefaultHelpers(Veams);
	},

	addDefaultHelpers: function (Veams) {
		Veams.addHelper('querySelectorArray', selectorHelper);
		Veams.addHelper('extend', extendHelper);
		Veams.addHelper('isTouch', touchHelper);
		Veams.addHelper('mixin', mixinsHelper);
		Veams.addHelper('methodExtend', methodExtendHelper);
		Veams.addHelper('throttle', throttleHelper);
		Veams.addHelper('forEach', foreachHelper);
		Veams.addHelper('makeId', makeIdHelper);
	}
};

export default VeamsHelpers;