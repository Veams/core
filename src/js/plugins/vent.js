/**
 * Represents a Vent plugin which creates an empty object.
 * The object will be used as publish/subscribe plugin.
 *
 * The module extends the default EVENTS object of Veams
 * when you pass the option called 'furtherEvents'.
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
			this.options = Veams.helpers.extend(this.options, opts || {});
		}

		Veams.Vent = Veams.$({});
		Veams.EVENTS = Veams.helpers.extend(Veams.EVENTS, this.options.furtherEvents);
	}
};

export default VeamsVent;