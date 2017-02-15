/**
 * Represents a Vent plugin which creates an empty object.
 * The object will be used as publish/subscribe plugin.
 *
 * The module extends the default EVENTS object of Veams
 * when you pass the option called 'customEvents'.
 *
 * @module VeamsVent
 *
 * @author Sebastian Fitzner
 */

const VeamsVent = {
	options: {
		furtherEvents: {}
	},
	pluginName: 'Vent',
	initialize: function (Veams, opts) {

		if (!Veams.$) {
			console.error('VeamsVent :: You need to add a DOM handler plugin if you want to use Veams.Vent!');
			return;
		}

		if (opts) {
			this.options = Veams.helpers.defaults(opts || {}, this.options);
		}

		Veams.Vent = Veams.$({});
		Veams.EVENTS = Veams.helpers.defaults(this.options.furtherEvents, Veams.EVENTS);
	}
};

export default VeamsVent;