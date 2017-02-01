const VeamsVent = {
	pluginName: 'Vent',
	initialize: function (Veams) {
		if (Veams.$ || window.jQuery || window.$) {
			Veams.Vent = Veams.$(document);
		} else {
			console.error('You need to add a DOM handler plugin if you want to use Veams.Vent!');
		}
	}
};

export default VeamsVent;