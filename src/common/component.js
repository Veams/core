if (!window.Veams) {
	throw new Error('Please initialize Veams!');
}

if (!window.Veams.helpers.mixin || !window.Veams.helpers.defaults) {
	throw new Error('The mixin or defaults helper is missing!');
}

if (!window.Veams.$) {
	throw new Error('Please add a Dom handler like jQuery to the window object!');
}

/**
 * Imports
 */
import stringHelpers from '../utils/internal-helpers/string';

/**
 * Variables
 */
const $ = window.Veams.$;

/**
 * Local functions
 */

/**
 * Get value out of variable string.
 *
 * @param {String} str - String which is a reference to a var.
 *
 * @return String
 */
const getStringVars = function (str) {
	if (str.indexOf('.') === -1) return str;
	let arr = str.split('.');
	let context = arr[0];
	let finalStr = context === 'this' ? this : window[context];
	let strReplacer = (el, prev) => {
		return prev[el];
	};

	arr.shift();
	arr.forEach((item) => {
		finalStr = strReplacer(item, finalStr);
		return finalStr;
	});

	if (typeof finalStr !== 'string') {
		throw new Error('The resulting variable for your evnts must be a string!');
	} else {
		return finalStr;
	}
};

/**
 * Simple template engine for event system.
 *
 * @param {String} tplStr - Template string.
 *
 * @return String
 */
const TemplateEngine = function (tplStr) {
	let reg = new RegExp('(\{\{\s?)(.+)(\s?\}\})');
	let match = reg.exec(tplStr);
	let returnVal = '';

	if (match) {
		returnVal = match[2];
	} else {
		returnVal = tplStr;
	}

	return returnVal;
};

class VeamsComponent {

	/**
	 * Constructor
	 *
	 * to save standard elements like el and options and
	 * execute initialize as default method
	 */
	constructor(obj = {}, options = {}) {
		this.el = obj.el;
		this.$el = $(obj.el);
		this.options = options;
		this.namespace = obj.namespace;
		this.evtNamespace = '.' + this.metaData.name;

		this.options = obj.options;
		this.initialize();

		if (window.Veams.modules) {
			Veams.modules.save(Veams.helpers.defaults(this.info || {}, this.metaData), this.el);
		}
	}

	// GETTER AND SETTER

	/**
	 * Return options
	 */
	get options() {
		return this._options;
	}

	/**
	 * Save options by merging default options with passed options
	 */
	set options(options) {
		this._options = Veams.helpers.defaults(options || {}, this._options);
	}

	/**
	 * Get module information
	 */
	get metaData() {
		return {
			name: stringHelpers.capitalizeFirstLetter(stringHelpers.toCamelCase(this.namespace))
		};
	}

	/**
	 * Get and set events object
	 */
	set events(obj) {
		this._events = obj;
	}

	get events() {
		return this._events;
	}

	/**
	 * Get and set subscribe object
	 */
	set subscribe(obj) {
		this._subscribe = obj;
	}

	get subscribe() {
		return this._subscribe;
	}

	// STANDARD METHODS

	/**
	 * Initialize your module class,
	 * save some references,
	 * optionally scaffold some templates and
	 * bind your events
	 */
	initialize() {
		this.preRender();
		this.registerEvents(this.events, false);
		this.registerEvents(this.subscribe, true);
		this.bindEvents();
	}

	/**
	 * Destroy component by unbinding events and
	 * removing element from dom
	 */
	destroy() {
		this.unbindEvents();
		this.$el.remove();
	}

	registerEvents(evts, global) {
		if (evts) {
			Object.keys(evts).forEach((key) => {
				this.registerEvent(key, evts[key], global);
			});
		}
	}

	registerEvent(evtKey, fn, global) {
		let evtKeyArr = evtKey.split(' ');
		let arrlen = evtKeyArr.length;
		let evtType = getStringVars.apply(this, [TemplateEngine(evtKeyArr[0])]);
		let bindFn = this[fn].bind(this);

		if (arrlen > 2) {
			throw new Error('It seems like you have more than two strings in your events object!');
		}

		// Bind on this.$el
		if (arrlen === 1 && !global) {
			this.$el.on(evtType + this.evtNamespace, bindFn);
		} else if (arrlen === 1 && global) {
			Veams.Vent.on(evtType, bindFn);
		} else {
			let delegate = getStringVars.apply(this, [TemplateEngine(evtKeyArr[1])]);

			this.$el.on(evtType + this.evtNamespace, delegate, bindFn);
		}
	}

	/**
	 * Bind local and global events
	 */
	bindEvents() {
	}

	/**
	 * Unbind events
	 */
	unbindEvents() {
		this.$el.off(this.evtNamespace);
	}

	/**
	 * Pre-Render templates
	 * which can be used to render content into it
	 */
	preRender() {
	}

	/**
	 * Render template with data
	 */
	renderTemplate(tplName, data) {
		// window[this.options.namespace].Templates[tplName](window[this.options.namespace].TemplateEngine)
	}

	/**
	 * Render your module
	 */
	render() {
	}
}

/**
 * Add mixin functionality to extend module class
 */
VeamsComponent.mixin = Veams.helpers.mixin;

export default VeamsComponent;