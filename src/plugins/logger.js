const VeamsLogger = {
	pluginName: 'Logger',
	initialize: function (Veams) {
		/**
		 * Devmode and logger
		 */
		Veams.devmode = false;
		Veams.logger = false;

		if (document.location.search.indexOf('devmode') > -1) {
			Veams.devmode = true;
		}

		if (document.location.search.indexOf('logger') > -1) {
			Veams.logger = true;
		}

		// hide all warnings and logs if not in devmode
		if (!Veams.devmode) {
			console.log = console.warn = function () {
			};
		}

		// add console output element (triggered by parameter 'devmode' and 'logger' in url)
		if (Veams.devmode && Veams.logger) {
			let logger = document.createElement('pre');

			logger.setAttribute('id', 'logger');
			document.body.appendChild(logger);

			console.write = function () {
				for (let i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] === 'object') {
						logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '<br />';
					} else {
						logger.innerHTML += arguments[i] + '<br />';
					}
				}

				logger.innerHTML += '<br />';
				logger.scrollTop = logger.scrollHeight;
			};

			console.error = function () {
				logger.innerHTML += '[Error]<br />';
				console.write.apply(this, arguments);
			};

			console.warn = function () {
				logger.innerHTML += '[Warn]<br />';
				console.write.apply(this, arguments);
			};

			console.log = function () {
				logger.innerHTML += '[Log]<br />';
				console.write.apply(this, arguments);
			};
		}
	}
};

export default VeamsLogger;