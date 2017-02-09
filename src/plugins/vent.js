/**
 * Represents a Vent plugin which creates an empty object .
 * The object will be used as publish/subscribe plugin.
 *
 * @module Vent
 *
 * @author Sebastian Fitzner
 */

const VeamsVent = {
	pluginName: 'Vent',
	initialize: function (Veams) {
		if (Veams.$ || window.jQuery || window.$) {
			Veams.Vent = Veams.$({});
		} else {
			console.error('VeamsVent :: You need to add a DOM handler plugin if you want to use Veams.Vent!');
		}
	}
};

export default VeamsVent;