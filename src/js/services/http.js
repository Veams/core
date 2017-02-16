/**
 * Represents a http service, which returns a promise.
 * @module http
 *
 * Polyfills: npm install promise-polyfill --save-exact
 *
 * @author Sebastian Fitzner
 */

if (!window.Promise) {
	console.error('Veams-Http :: You should add a lightweight promise library like promise-polyfill!');
}

class VeamsHttp {
	constructor(opts = {}) {
		let options = {
			url: false,
			type: 'text',
			method: 'GET',
			fetchOnInit: false
		};

		this.options = Veams.helpers.defaults(opts, options);
		this.data = {};

		this.initialize();
	};

	initialize() {
		if (this.options.fetchOnInit) {
			return this.promiseRequest();
		}
	};

	promiseRequest(obj) {
		if (obj) {
			this.options.method = obj.method || this.options.method;
			this.options.url = obj.url || this.options.url;
			this.options.type = obj.type || this.options.type;
		}

		return new Promise((resolve, reject) => {
			let request = new XMLHttpRequest();

			request.open(this.options.method, this.options.url, true);

			request.onload = () => {
				if (request.status >= 200 && request.status < 400) {
					resolve(this.parser({
						request: request,
						type: this.options.type
					}));
				} else {
					reject({
						status: request.status,
						statusText: request.statusText
					});
				}
			};

			request.onerror = function () {
				reject({
					status: request.status,
					statusText: request.statusText
				});
			};

			request.send();
		});
	};

	get(obj) {
		if (obj) {
			this.options.method = 'GET';
			this.options.url = obj.url || this.options.url;
			this.options.type = obj.type || this.options.type;
		}

		return this.promiseRequest();
	};

	post(obj) {
		if (obj) {
			this.options.method = 'POST';
			this.options.url = obj.url || this.options.url;
			this.options.type = obj.type || this.options.type;
		}

		return this.promiseRequest();
	}

	/**
	 * The default parser, which returns the response text.
	 * This method can be overridden.
	 *
	 * @param {Object} obj - Generic object.
	 * @param {Object} obj.req - Request object.
	 * @param {String} obj.dataType - Define a type for the response text.
	 *
	 */
	parser(obj) {
		this.data = obj.request.responseText;

		if (obj.type === 'json') {
			this.data = JSON.parse(this.data);
		}

		return this.data;
	}
}

export default VeamsHttp;