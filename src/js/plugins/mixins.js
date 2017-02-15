/**
 * Represents a mixin plugin.
 * This plugin gives you the possibility to extend your methods in components as long as you provide Veams.helpers.mixin();
 *
 * @module VeamsMixins
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
			let name = arrElem.name;

			if (typeof arrElem !== 'function' || !name) {
				console.error('VeamsMixins :: You need to export a mixin as function with a function name which returns an object!');
				return;
			}

			if (Veams.mixins[name]) {
				console.error(`VeamsMixins :: It seems that you have already defined a mixin called ${name}!'`);
				return;
			}

			Veams.mixins[name] = arrElem(Veams);
		}
	}
};

export default VeamsMixins;