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
	initialize: function (Veams) {
		if (!Veams.mixins) {
			Veams.mixins = {};
		}

		Veams.addMixin = function addMixin(...args) {
			let params = [...args];

			if (params.length === 1) {
				if (typeof params[0] !== 'object') {
					console.error('VeamsMixins :: You need to pass an object!');
					return;
				}

				for (let key in params[0]) {
					if (params[0].hasOwnProperty(key)) {
						if (!Veams.mixins[key]) {
							Veams.mixins[key] = params[0][key](Veams);
						} else {
							console.info(`VeamsMixins :: It seems that you have already defined a mixin called ${key}!'`);
						}
					}
				}
			} else if (params.length === 2) {

				if (!Veams.mixins[params[0]]) {
					if (typeof params[0] !== 'string' || typeof params[1] !== 'function') {
						console.error('VeamsMixins :: You need to pass a string as first argument and the helper function as second one.');
						return;
					}
					Veams.mixins[params[0]] = params[1](Veams);
				} else {
					console.info(`VeamsMixins :: The mixin ${params[0]} is already defined! Please define a new name for: `, params[1]);
				}
			}
		};
	}
};

export default VeamsMixins;