const VeamsVent = {
	pluginName: 'Vent',
	initialize: function (Veams) {
		if (!Veams.$) {
			console.error('You need to add a DOM handler plugin if you want to use Veams.Vent!');
		}
		Veams.Vent = Veams.$(document);
	}
};

export default VeamsVent;