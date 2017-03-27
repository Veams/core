const VeamsDOM = {
	options: {
		DOM: false
	},
	pluginName: '$',
	initialize: function (Veams, { DOM }) {
		if (!DOM) {
			console.error('VeamsDOM :: You need to pass an options object with a DOM handler: options.DOM!');
			return;
		}
		if (Veams.$) {
			console.log('VeamsDOM :: It seems that you have already defined a DOM handler. I am overwriting it now for you ;)');
		}

		Veams.$ = this.options.DOM = DOM;
	}
};

export default VeamsDOM;