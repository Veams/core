import defaultsHelper from '../utils/helpers/defaults';
import extendHelper from '../utils/helpers/extend';
import mixinsHelper from '../utils/helpers/mixin';
import methodExtendHelper from '../utils/helpers/method-extend';
import touchHelper from '../utils/helpers/is-touch';
import throttleHelper from '../utils/helpers/throttle';
import selectorHelper from '../utils/helpers/query-selector-array';
import foreachHelper from '../utils/helpers/for-each';

const VeamsHelpers = {
	pluginName: 'Helpers',
	initialize: function (Veams) {
		Veams.addHelper = function addHelper(helper) {
			if (typeof helper !== 'function') {
				console.error(`Passed helper ${helper} ist not a function!`);
				return;
			}

			if (!Veams.helpers[helper.name]) {
				Veams.helpers[helper.name] = helper;
			}
		};

		this.addDefaultHelpers(Veams);
	},

	addDefaultHelpers: function (Veams) {
		Veams.addHelper(selectorHelper);
		Veams.addHelper(defaultsHelper);
		Veams.addHelper(extendHelper);
		Veams.addHelper(touchHelper);
		Veams.addHelper(mixinsHelper);
		Veams.addHelper(methodExtendHelper);
		Veams.addHelper(throttleHelper);
		Veams.addHelper(foreachHelper);
	}
};

export default VeamsHelpers;