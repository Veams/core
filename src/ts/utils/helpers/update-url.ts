'use strict';

/**
 * Add/Update multiple parameters for given url
 *
 * @param {String} url - url on which parameters should be added / updated
 * @param {Object} params - parameters (name/value)
 *
 * @return {String} - resulting url
 */
export default function updateUrl(url, params) {
	let urlParts = url.split('?');
	let tmpParams = [];
	let originalParams = [];
	let newParams = [];
	let baseUrl = '';
	let property = '';
	let updated = false;
	let i = 0;
	let j = 0;

	for (property in params) {
		if (params.hasOwnProperty(property)) {
			tmpParams.push([property, '=', params[property]].join(''));
		}
	}

	baseUrl = urlParts[0];
	originalParams = urlParts.length > 1 ? urlParts[1].split('&') : [];

	for (i; i < tmpParams.length; i++) {
		updated = false;

		for (j = 0; j < originalParams.length; j++) {
			if (tmpParams[i] && originalParams[j].split('=')[0] === tmpParams[i].split('=')[0]) {
				originalParams[j] = tmpParams[i];
				updated = true;
				break;
			}
		}

		if (!updated) {
			newParams.push(tmpParams[i]);
		}
	}

	return ([baseUrl, '?', originalParams.concat(newParams).join('&')].join(''));
};