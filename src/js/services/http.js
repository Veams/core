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
	promiseRequest(options) {
		return new Promise((resolve, reject) => {
			let request = new XMLHttpRequest();

			request.open(options.type, options.url, true);

			request.onload = () => {
				if (request.status >= 200 && request.status < 400) {
					resolve(this.parser({
						request: request,
						dataType: options.dataType
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
		return this.promiseRequest({
			type: 'GET',
			url: obj.url,
			dataType: obj.dataType || 'text'
		});
	};

	post(obj) {
		return this.promiseRequest({
			type: 'POST',
			url: obj.url,
			dataType: obj.dataType || 'text'
		});
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
		let response = obj.request.responseText;

		if (obj.dataType === 'json') {
			response = JSON.parse(response);
		}

		return response;
	}
}

export default VeamsHttp;