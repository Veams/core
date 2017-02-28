if (!window.Promise) {

	/**
	 * Represents a http service, which returns a promise.
	 *
	 * Polyfills: npm install promise-polyfill --save-exact
	 *
	 * @module http
	 * @author Sebastian Fitzner
	 */
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

	// Request lifecycle
	requestWillOpen(request, obj) {}
	requestDidOpen(request, obj) {}
	requestWillLoad(request, obj) {}
	requestDidLoad(request, obj) {}
	requestWillSend(request, obj) {}
	requestDidSend(request, obj) {}

	// Request function
	promiseRequest(obj) {
		return new Promise((resolve, reject) => {
			let request = new XMLHttpRequest();

			this.requestWillOpen(request, obj);
			request.open(obj.method, obj.url, true);
			this.requestDidOpen(request, obj);

			this.requestWillLoad(request, obj);
			request.onload = () => {
				if (request.status >= 200 && request.status < 400) {
					resolve(this.parser({
						request: request,
						type: obj.type
					}));

					this.requestDidLoad(request, obj);
				} else {
					reject({
						status: request.status,
						statusText: request.statusText
					});

					this.requestDidLoad(request, obj);
				}
			};

			request.onerror = function () {
				reject({
					status: request.status,
					statusText: request.statusText
				});
			};

			this.requestWillSend(request, obj);
			request.send(obj.data);
			this.requestDidSend(request, obj);
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