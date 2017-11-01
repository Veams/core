/**
 * Represents a simple http service, which returns a promise.
 *
 * @module http
 * @author Sebastian Fitzner
 */

// Imports
import VeamsBase from '../common/base';

class VeamsHttp extends VeamsBase {
	constructor(options = {}) {
		let namespace = 'http';
		let opts = {
			url: false,
			type: 'text',
			method: 'GET',
			fetchOnInit: false,
			headers: null
		};

		super({namespace, options}, opts);

		this.data = {};
		this.initialize();
	};

	initialize() {
		if (!window.Promise) {
			console.error('Veams-Http :: You should add a lightweight promise library like promise-polyfill!');
		}

		if (this.options.fetchOnInit) {
			return this.promiseRequest();
		}
	};

	// Request lifecycle
	requestWillOpen(request, obj) {
	}

	requestDidOpen(request, obj) {
		if (this.options.headers) {
			for (let header in this.options.headers) {
				if (this.options.headers.hasOwnProperty(header)) {
					request.setRequestHeader(header, this.options.headers[header]);
				}
			}
		}
	}

	requestWillLoad(request, obj) {
	}

	requestDidLoad(request, obj) {
	}

	requestWillSend(request, obj) {
	}

	requestDidSend(request, obj) {
	}

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
			request.send(JSON.stringify(obj.data));
			this.requestDidSend(request, obj);
		});
	};

	get(url = false) {
		let requestObject = {};

		this.options.method = requestObject.method = 'GET';
		this.options.url = requestObject.url = url || this.options.url;
		this.options.type = requestObject.type = this.options.type;

		return this.promiseRequest(requestObject);
	};

	remove(url = false) {
		let requestObject = {};

		requestObject.method = 'DELETE';
		requestObject.url = url || this.options.url;
		// requestObject.type = this.options.type;

		return this.promiseRequest(requestObject);
	}

	post(url = false, data) {
		let requestObject = {};

		requestObject.data = data ? data : null;
		requestObject.method = 'POST';
		requestObject.url = url || this.options.url;
		requestObject.type = this.options.type;

		if (this.options.type === 'json' && this.options.headers === null) {
			this.options.headers = {
				'content-type': 'application/json'
			};
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