import VeamsQuery from 'veams-query';

const VeamsDOM = {
	pluginName: '$',
	initialize: function (Veams) {
		if (Veams.$) {
			console.log('It seems that you have already defined a DOM handler. I am overwriting it now for you ;)');
		}
		Veams.$ = VeamsQuery;
	}
};

export default VeamsDOM;