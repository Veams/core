const VeamsDOM = {
	pluginName: '$',
	initialize: function (Veams, opts) {
		if(!opts || !opts.DOM) {
			console.error('VeamsDOM :: You need to pass an options object with a DOM handler: options.DOM!');
			return;
		}
		if (Veams.$) {
			console.log('VeamsDOM :: It seems that you have already defined a DOM handler. I am overwriting it now for you ;)');
		}
		Veams.$ = opts.DOM;
	}
};

export default VeamsDOM;