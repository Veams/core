'use strict';

/**
 * Get value of parameter for given url
 *
 * @param {String} url - given url
 * @param {String} param - parameter (name)
 *
 * @return {String|Boolean} - value of parameter
 */
export default function getParamFromUrl(url, param) {
	let urlParts = url.split('?');
	let originalParams = urlParts.length > 1 ? urlParts[1].split('&') : [];
	let i = 0;

	for (i; i < originalParams.length; i++) {

		if (originalParams[i].indexOf(param) === 0) {
			let keyVal = originalParams[i].split('=');

			return keyVal.length > 1 ? keyVal[1] : true;
		}
	}
};