/**
 * Represents a mixin plugin.
 * This plugin gives you the possibility to extend your methods in components as long as you provide Veams.helpers.mixin();
 *
 * @module mixin
 *
 * @author Sebastian Fitzner
 */

const VeamsMixins = {
	pluginName: 'Mixins',
	initialize: function (Veams, mixins) {

		if (!mixins || !Array.isArray(mixins)) {
			console.error('VeamsMixins :: You need to pass a mixin array which contains objects with key and value!');
			return;
		}
		if (!Veams.mixins) {
			Veams.mixins = {};
		}

		for (let i = 0; i < mixins.length; i++) {
			let arrElem = mixins[i];

			for (let key in arrElem) {
				if (arrElem.hasOwnProperty(key)) {
					Veams.mixins[key] = arrElem[key](Veams);
				}
			}
		}
	}
};

export default VeamsMixins;