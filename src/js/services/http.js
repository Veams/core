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

		this.options = Veams.helpers.extend(options, opts);
		this.data = {};

		this.initialize();
	};

	initialize() {
		if (this.options.fetchOnInit) {
			return this.promiseRequest();
		}
	};

	promiseRequest(obj) {
		return new Promise((resolve, reject) => {
			let request = new XMLHttpRequest();

			request.open(obj.method, obj.url, true);

			request.onload = () => {
				if (request.status >= 200 && request.status < 400) {
					resolve(this.parser({
						request: request,
						type: obj.type
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

			request.send(obj.data);
		});
	};

	get(obj) {
		let requestObject = {};

		requestObject.data = obj.data ? obj.data : null;

		if (obj) {
			this.options.method = requestObject.method = 'GET';
			this.options.url = requestObject.url = obj.url || this.options.url;
			this.options.type = requestObject.type = obj.type || this.options.type;
		}

		return this.promiseRequest(requestObject);
	};

	post(obj) {
		let requestObject = {};

		requestObject.data = obj.data ? obj.data : null;

		if (obj) {
			this.options.method = requestObject.method = 'POST';
			this.options.url = requestObject.url = obj.url || this.options.url;
			this.options.type = requestObject.type = obj.type || this.options.type;
		}

		return this.promiseRequest(requestObject);
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