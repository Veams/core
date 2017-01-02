/**
 * Represents a very simple DOM API for Veams-JS (incl. ajax support)
 *
 * @module VeamsQuery
 * @version v1.6.0
 *
 * @author Andy Gutsche
 */


var classListSupport = 'classList' in document.documentElement;


/**
 * VeamsQuery selector function
 *
 * @param {String | Object} selector - selector (string, VeamsQuery object, element)
 * @param {Object} [context] - context (VeamsQuery object, element)
 */
var VeamsQuery = function (selector, context) {
	return new VeamsQueryObject(selector, context);
};


// VeamsQuery version
VeamsQuery.version = 'v1.6.0';

/**
 * Return DOM element created from given HTML string
 *
 * @param {String} htmlString - html string to parse
 * @return {Object} - DOM node
 */
VeamsQuery.parseHTML = function (htmlString) {
	var parser = new DOMParser();
	var content = 'text/html';
	var DOM = parser.parseFromString(htmlString, content);

	// return element
	return DOM.body.childNodes[0];
};


/**
 * Send XMLHttpRequest
 *
 * @param {Object} opts - options
 * @param {String} [opts.type='GET'] - an alias for method
 * @param {String} opts.url - a string containing the URL to which the request is sent
 * @param {String} [opts.dataType='text'] - a string containing the URL to which the request is sent
 * @param {Function} [opts.success] - success callback
 * @param {Function} [opts.error] - error callback
 */
VeamsQuery.ajax = function (opts) {
	var request;
	var response;
	var options = {
		type: opts.type || 'GET',
		url: opts.url,
		dataType: opts.dataType || 'text',
		success: opts.success || function () {
		},
		error: opts.error || function () {
		}
	};

	request = new XMLHttpRequest();
	request.open(options.type, options.url, true);

	request.onload = function () {
		if (request.status >= 200 && request.status < 400) {

			if (options.dataType === 'json') {
				response = JSON.parse(request.responseText);
			}
			else {
				response = request.responseText;
			}

			options.success(response);
		} else {
			options.error(request.status, request.statusText)
		}
	};

	request.onerror = function (e) {
		options.error(e.target.status);
	};

	request.send();
};


/**
 * VeamsQuery DOM wrapper object
 *
 * @param {String | Object} selector - selector (string, VeamsQuery object, element)
 * @param {Object} [context] - context (VeamsQuery object, element)
 */
var VeamsQueryObject = function (selector, context) {
	var classes;
	var scope;
	var queryRes = [];
	var i = 0;
	var j = 0;

	if (!selector) {
		this.length = 0;

		return;
	}

	// element or window object
	if (selector.nodeType || selector === window) {
		this[0] = selector;
		this.length = 1;

		return;
	}

	// VeamsQuery object
	if (selector[0] && selector[0].nodeType) {

		for (var prop in selector) {
			if (selector.hasOwnProperty(prop)) {
				this[prop] = selector[prop];
			}
		}

		return;
	}

	if (context) {

		// context is element
		if (context.nodeType) {
			scope = [context]
		}
		else if (context[0] && context[0].nodeType) { // context is VeamsQuery object
			scope = context;
		}
	}
	else {
		scope = [document];
	}

	for (i; i < scope.length; i++) {

		try {
			if (/^(#?[\w-]+|\.[\w-.]+)$/.test(selector)) {
				switch (selector.charAt(0)) {
					case '#':
						queryRes = [document.getElementById(selector.substr(1))];
						break;
					case '.':
						classes = selector.substr(1).replace(/\./g, ' ');
						queryRes = queryRes.concat([].slice.call(scope[i].getElementsByClassName(classes)));
						break;
					default:
						queryRes = queryRes.concat([].slice.call(scope[i].getElementsByTagName(selector)));
				}
			}
			else {
				queryRes = queryRes.concat([].slice.call(scope[i].querySelectorAll(selector)));
			}
		} catch (e) {
			console.warn('VeamsQuery says: "', e, '"');
		}
	}

	for (j; j < queryRes.length; j++) {
		this[j] = queryRes[j];
	}

	this.length = queryRes.length;
};


/**
 * Get the descendants of each element in the current set of matched elements, filtered by a selector,
 * VeamsQuery object, or element
 *
 * @param {String|Object} selector - selector (string, VeamsQuery object, element)
 * @return {Object} - VeamsQuery object
 */
VeamsQueryObject.prototype.find = function (selector) {

	return new VeamsQueryObject(selector, this);
};


/**
 * For each element in the set, get the first element that matches the selector by testing
 * the element itself and traversing up through its ancestors in the DOM tree
 *
 * @param {String} selector - selector
 * @return {Object} - VeamsQuery object
 */
VeamsQueryObject.prototype.closest = function (selector) {
	var i = 0;
	var j = 0;
	var k = 0;
	var returnObj = VeamsQuery();
	var matchesSelector;

	if (!selector) {
		return false;
	}

	for (i; i < this.length; i++) {
		matchesSelector = this[i].matches || this[i].webkitMatchesSelector || this[i].mozMatchesSelector ||
			this[i].msMatchesSelector;

		while (this[i]) {
			if (matchesSelector.call(this[i], selector)) {
				break;
			}
			this[i] = this[i].parentElement;
		}
	}

	for (j; j < this.length; j++) {
		if (this[j]) {
			returnObj[k] = this[j];
			k++;
		}
	}

	returnObj.length = k;

	return returnObj;
};


/**
 * Check if element has given class
 *
 * @param {String} className - name of class to check
 * @return {Boolean} - element has class (true/false)
 */
VeamsQueryObject.prototype.hasClass = function (className) {
	if (classListSupport) {
		return this[0].classList.contains(className);
	} else {
		return new RegExp("(^|\\s+)" + className + "(\\s+|$)").test(this[0].className);
	}
};


/**
 * Check the current matched set of elements against a selector, element, or VeamsQuery object and return true if
 * at least one of these elements matches the given arguments
 *
 * @param {String} selector - a string containing a selector expression to match elements against
 * @return {Boolean} - at least one element matches selector (true/false)
 */
VeamsQueryObject.prototype.is = function (selector) {
	var i = 0;

	if (!selector) {
		return false;
	}

	for (i; i < this.length; i++) {
		if ((this[i].matches || this[i].matchesSelector || this[i].msMatchesSelector ||
			this[i].mozMatchesSelector || this[i].webkitMatchesSelector ||
			this[i].oMatchesSelector).call(this[i], selector)) {
			return true;
		}
	}

	return false;
};


/**
 * Add the specified class(es) to each element in the set of matched elements.
 *
 * @param {String} classNames - name(s) of class(es) to add
 * @return {Object} - VeamsQuery object
 */
VeamsQueryObject.prototype.addClass = function (classNames) {
	var i = 0;
	var classes = classNames && classNames.split(' ');

	if (!classes) {
		return false;
	}

	for (i; i < this.length; i++) {

		for (var j = 0; j < classes.length; j++) {

			if (classListSupport) {
				this[i].classList.add(classes[j]);
			} else {
				if (this[i].className.split(' ').indexOf(classes[j]) === -1) {
					this[i].className = this[i].className + ' ' + classes[j];
				}
			}

		}

	}

	return this;
};


/**
 * Remove a single class, multiple classes, or all classes from each element in the set of matched elements
 *
 * @param {String} [classNames] - name(s) of class(es) to remove
 * @return {Object} - VeamsQuery object
 */
VeamsQueryObject.prototype.removeClass = function (classNames) {
	var i = 0;
	var classes = classNames && classNames.split(' ');

	for (i; i < this.length; i++) {

		if (!classes) {
			this[i].removeAttribute('class');
		}
		else {

			for (var j = 0; j < classes.length; j++) {

				if ('classList' in document.documentElement) {
					this[i].classList.remove(classes[j]);
				}
				else {
					this[i].className =
						this[i].className.replace(new RegExp("(^|\\s+)" + classes[j] + "(\\s+|$)"), ' ');
				}

				if (!this[i].className.length) {
					this[i].removeAttribute('class');
				}

			}
		}
	}

	return this;
};


/**
 * Get the HTML contents of the first element in the set of matched elements
 * Set the HTML contents of each element in the set of matched elements
 *
 * @param {String} [htmlStr] - html string
 * @return {String|Object} - html contents | VeamsQuery object
 */
VeamsQueryObject.prototype.html = function (htmlStr) {
	var i = 0;

	if (!htmlStr) {
		return this[0].innerHTML;
	}

	for (i; i < this.length; i++) {
		this[i].innerHTML = htmlStr;
	}

	return this;
};


/**
 * Insert content, specified by the parameter, to the end of each element in the set of matched elements
 *
 * @param {String|Object} element - html string | VeamsQuery object | element
 * @return {Object} - VeamsQuery object
 */
VeamsQueryObject.prototype.append = function (element) {
	var i = 0;

	for (i; i < this.length; i++) {
		if (typeof element === 'string') {
			this[i].insertAdjacentHTML('beforeend', element);
		}
		else {
			this[i].appendChild(element && element[0] || element);
		}
	}

	return this;
};


/**
 * Insert content, specified by the parameter, to the beginning of each element in the set of matched elements
 *
 * @param {String|Object} element - html string | VeamsQuery object | element
 * @return {Object} - VeamsQuery object
 */
VeamsQueryObject.prototype.prepend = function (element) {
	var i = 0;

	for (i; i < this.length; i++) {
		if (typeof element === 'string') {
			this[i].insertAdjacentHTML('afterbegin', element);
		}
		else {
			this[i].insertBefore(element && element[0] || element, this[i].firstChild);
		}
	}

	return this;
};


/**
 * Insert content, specified by the parameter, before each element in the set of matched elements
 *
 * @param {String|Object} element - html string | VeamsQuery object | element
 * @return {Object} - VeamsQuery object
 */
VeamsQueryObject.prototype.before = function (element) {
	var i = 0;

	for (i; i < this.length; i++) {
		if (typeof element === 'string') {
			this[i].insertAdjacentHTML('beforebegin', element);
		}
		else {
			this[i].parentNode.insertBefore(element && element[0] || element, this[i]);
		}
	}

	return this;
};

/**
 * Insert content, specified by the parameter, after each element in the set of matched elements
 *
 * @param {String|Object} element - html string | VeamsQuery object | element
 * @return {Object} - VeamsQuery object
 */
VeamsQueryObject.prototype.after = function (element) {
	var i = 0;

	for (i; i < this.length; i++) {
		if (typeof element === 'string') {
			this[i].insertAdjacentHTML('afterend', element);
		}
		else {
			this[i].parentNode.insertBefore(element && element[0] || element,
				this[i].nextElementSibling);
		}
	}

	return this;
};


/**
 * Remove the set of matched elements from the DOM
 *
 * @return {Object} - VeamsQuery object
 */
VeamsQueryObject.prototype.remove = function () {
	var i = 0;

	for (i; i < this.length; i++) {
		this[i].parentNode.removeChild(this[i]);
	}

	return this;
};


/**
 * Remove all child nodes of the set of matched elements from the DOM
 *
 * @return {Object} - VeamsQuery object
 */
VeamsQueryObject.prototype.empty = function () {
	var i = 0;

	for (i; i < this.length; i++) {
		while (this[i].firstChild) {
			this[i].removeChild(this[i].firstChild);
		}
	}

	return this;
};


/**
 * Reduce the set of matched elements to the one at the specified index
 *
 * @param {Number} index - index of element in node list
 * @return {Object} - VeamsQuery object containing node at given index of original node list
 */
VeamsQueryObject.prototype.eq = function (index) {
	return new VeamsQueryObject(this[index]);
};


/**
 * Get the value of an attribute for the first element in the set of matched elements
 * Set value of an attribute for the set of matched elements
 *
 * @param {String} attrName - attribute name
 * @param {String|Number|Boolean} [attrVal] - attribute value
 * @return {String|Number|Boolean|Object} - attribute value | VeamsQuery object
 */
VeamsQueryObject.prototype.attr = function (attrName, attrVal) {
	var i = 0;

	if (typeof attrVal === 'undefined') {
		return this[0].getAttribute(attrName);
	}

	for (i; i < this.length; i++) {
		this[i].setAttribute(attrName, attrVal);
	}

	return this;
};


/**
 * Remove an attribute from each element in the set of matched elements
 *
 * @param {String} attrName - attribute name
 * @return {Object} - VeamsQuery object
 */
VeamsQueryObject.prototype.removeAttr = function (attrName) {
	var i = 0;

	if (!attrName) {
		return false;
	}

	for (i; i < this.length; i++) {
		this[i].removeAttribute(attrName);
	}

	return this;
};


/**
 * Get the combined text contents of each element in the set of matched elements.
 * Set the content of each element in the set of matched elements to the specified text
 *
 * @param {String} [text] - text
 * @return {String|Object} - text | VeamsQuery object
 */
VeamsQueryObject.prototype.text = function (text) {
	var i = 0;
	var combinedText = '';

	for (i; i < this.length; i++) {

		if (!text) {
			combinedText += this[i].innerText;
		}
		else {
			this[i].innerText = text;
		}
	}

	if (!text) {
		return combinedText;
	}

	return this;
};


/**
 * Get the computed style properties for the first element in the set of matched elements.
 * Set the content of each element in the set of matched elements to the specified text
 *
 * @param {String|Object} cssProp - css property
 * @param {String} [cssVal] - css value
 * @return {String|Object} - css value | VeamsQuery object
 */
VeamsQueryObject.prototype.css = function (cssProp, cssVal) {
	var i = 0;

	if (typeof cssProp === 'string') {

		if (typeof cssVal === 'undefined') {
			return this[0].style[cssProp];
		}
		else {

			for (i; i < this.length; i++) {
				this[i].style[cssProp] = cssVal;
			}
		}
	}
	else if (typeof cssProp === 'object') {

		for (i; i < this.length; i++) {
			for (var prop in cssProp) {
				if (cssProp.hasOwnProperty(prop)) {
					this[i].style[prop] = cssProp[prop];
				}
			}
		}
	}

	return this;
};


/**
 *  Get the current computed height for the first element in the set of matched elements, including padding,
 *  border and optionally margin
 *
 * @param {Boolean} [includeMargin=false] - include the element's margin in the calculation (true/false)
 * @return {Number} - height
 */
VeamsQueryObject.prototype.outerHeight = function (includeMargin) {
	var height = this[0].offsetHeight;
	var style;

	if (!includeMargin || includeMargin && typeof includeMargin !== 'boolean') {
		return height;
	}

	style = getComputedStyle(this[0]);
	height += parseInt(style.marginTop) + parseInt(style.marginBottom);

	return height;
};


/**
 * Get the current computed width for the first element in the set of matched elements, including padding,
 * border and optionally margin
 *
 * @param {Boolean} [includeMargin=false] - include the element's margin in the calculation (true/false)
 * @return {Number} - width
 */
VeamsQueryObject.prototype.outerWidth = function (includeMargin) {
	var width = this[0].offsetWidth;
	var style;

	if (!includeMargin || includeMargin && typeof includeMargin !== 'boolean') {
		return width;
	}

	style = getComputedStyle(this[0]);
	width += parseInt(style.marginLeft) + parseInt(style.marginRight);

	return width;
};


/**
 *  Get the current coordinates of the first element in the set of matched elements,
 *  relative to the document
 *
 * @return {Object} - offset (offset.top, offset.left)
 */
VeamsQueryObject.prototype.offset = function () {
	var rect = this[0].getBoundingClientRect();

	return {
		top: rect.top + document.body.scrollTop,
		left: rect.left + document.body.scrollLeft
	};
};


/**
 * Create a deep copy of the first element in the set of matched elements (without data and events)
 *
 * @param {Boolean} [withChildren=false] - clone with children (true/false)
 * @return {Object} - clone of dom node
 */
VeamsQueryObject.prototype.clone = function (withChildren) {
	return new VeamsQueryObject(this[0].cloneNode(withChildren));
};


/**
 * Return an integer indicating the position of the first element in the set of matched elements relative
 * to its sibling elements
 *
 * @return {Number} - index of element among its siblings
 */
VeamsQueryObject.prototype.index = function () {
	return [].slice.call(this[0].parentNode.children).indexOf(this[0]);
};


/**
 * Get the value of a property for the first element in the set of matched elements
 * Set value of a property for the set of matched elements
 *
 * @param {String} propName - property name
 * @param {String|Number|Boolean} [propVal] - property value
 * @return {String|Number|Boolean|Object} - property value | VeamsQuery object
 */
VeamsQueryObject.prototype.prop = function (propName, propVal) {
	var i = 0;

	if (typeof propVal === 'undefined') {
		return this[0][propName];
	}

	for (i; i < this.length; i++) {
		this[i][propName] = propVal;
	}

	return this;
};


/**
 * Get the current value of the first element in the set of matched elements.
 * Set the value of each element in the set of matched elements
 *
 * @param {String} [val] - value
 * @return {String|Number|Array|Object} - value | VeamsQuery object
 */
VeamsQueryObject.prototype.val = function (val) {
	var i = 0;

	if (!val) {
		return this[0].value;
	}

	for (i; i < this.length; i++) {
		this[i].value = val;
	}

	return this;
};


/**
 * Encode a set of form elements as a string for submission.
 *
 * @return {String} - serialized form data
 */
VeamsQueryObject.prototype.serialize = function () {
	var field = [];
	var l = [];
	var s = [];

	if (typeof this[0] === 'object' && this[0].nodeName === 'FORM') {
		var len = this[0].elements.length;

		for (var i = 0; i < len; i++) {
			field = this[0].elements[i];

			if (field.name && !field.disabled && field.type !== 'file' && field.type !== 'reset' &&
				field.type !== 'submit' && field.type !== 'button') {

				if (field.type === 'select-multiple') {
					l = this[0].elements[i].options.length;

					for (var j = 0; j < l; j++) {
						if (field.options[j].selected) {
							s[s.length] =
								encodeURIComponent(field.name) + '=' + encodeURIComponent(field.options[j].value.trim());
						}
					}
				} else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
					s[s.length] = encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value.trim());
				}
			}
		}
	}

	return s.join('&');
};


/**
 * Attach an event handler function for one or more events to the selected elements
 *
 * @param {String} eventNames - name(s) of event(s) to be registered for matched set of elements
 * @param {String} [selector] - selector string to filter descendants of selected elements triggering the event
 * @param {Function} handler - event handler function
 * @return {Object} - VeamsQuery object
 */
VeamsQueryObject.prototype.on = function (eventNames, selector, handler) {
	var i = 0;
	var j = 0;
	var events = eventNames.split(' ');
	var evtHandler = typeof selector === 'function' ? selector : handler;
	var delegateTarget;

	for (i; i < this.length; i++) {

		for (j; j < events.length; j++) {

			this[i].addEventListener(events[j], function (e) {

				if (typeof selector === 'string') {
					delegateTarget = VeamsQuery(e.target).closest(selector);

					if (delegateTarget && delegateTarget.length) {
						evtHandler(e, delegateTarget[0]);
					}
				}
				else {
					evtHandler(e, e.currentTarget);
				}
			});
		}
	}

	return this;
};


/**
 * Detach an event handler for one or more events from the selected elements
 *
 * @param {String} eventNames - name(s) of event(s) to be unregistered for matched set of elements
 * @param {Function} handler - event handler function
 * @return {Object} - VeamsQuery object
 */
VeamsQueryObject.prototype.off = function (eventNames, handler) {
	var i = 0;
	var j = 0;
	var events = eventNames.split(' ');

	for (i; i < this.length; i++) {

		for (j; j < events.length; j++) {
			this[i].removeEventListener(events[j], handler);
		}
	}

	return this;
};


/**
 * Execute all handlers and behaviors attached to the matched elements for the given event type
 *
 * @param {String} eventNames - name(s) of event(s) which will be trigger on the set of matched elements
 * @param {Object} [customData] - custom data to pass with the event (accessible via event.detail)
 * @return {Object} - VeamsQuery object
 */
VeamsQueryObject.prototype.trigger = function (eventNames, customData) {
	var i = 0;
	var j = 0;
	var events = eventNames.split(' ');

	for (i; i < this.length; i++) {

		for (j; j < events.length; j++) {

			if (typeof this[i][events[j]] === 'function') {
				this[i][events[j]]();
			}
			else {
				this[i].dispatchEvent(new CustomEvent(events[j], {detail: customData}));
			}
		}
	}

	return this;
};

export default VeamsQuery;