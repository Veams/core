if (!window.Veams) {
	throw new Error('Please initialize Veams!');
}

if (!window.Veams.helpers.mixin || !window.Veams.helpers.defaults) {
	throw new Error('The mixin or defaults helper is missing!');
}

if (!window.Veams.$) {
	console.info('Please add a Dom handler like jQuery to the window object!');
}

/**
 * Imports
 */
import stringHelpers from '../utils/internal-helpers/string';
import getStringValue from '../utils/internal-helpers/get-string-value';
import tplEngine from '../utils/internal-helpers/template-engine';

/**
 * Variables
 */
const $ = window.Veams.$;

class VeamsComponent {

	/**
	 * Constructor
	 *
	 * to save standard elements like el and options and
	 * execute initialize as default method.
	 *
	 * @param {Object} obj [{}] - Object which contains el, options from the DOM and namespace.
	 * @param {Object} options [{}] - Object which contains options of the extended class.
	 */
	constructor(obj = {}, options = {}) {
		this.el = obj.el;
		this.options = options;
		this.namespace = null;
		this.evtNamespace = '.' + this.metaData.name;
		this._options = obj.options;

		if (window.Veams.$) {
			this.$el = $(obj.el);
		}

		if (!obj.namespace) {
			console.log('You should pass an object with a namespace for your component!');
		} else {
			this.namespace = obj.namespace;
		}

		this.initialize(obj, options);
		this._create();

		if (window.Veams.modules && this.namespace !== null) {
			Veams.modules.save(Veams.helpers.defaults(this.info || {}, this.metaData), this.el);
		}
	}

	// GETTER AND SETTER

	/**
	 * Return options
	 */
	get _options() {
		return this.options;
	}

	/**
	 * Save options by merging default options with passed options
	 */
	set _options(options) {
		this.options = Veams.helpers.defaults(options || {}, this.options);
	}

	/**
	 * Get module information
	 */
	get metaData() {
		return {
			name: typeof this.namespace === 'string' ? stringHelpers.capitalizeFirstLetter(stringHelpers.toCamelCase(this.namespace)) : ''
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

	set subscribers(obj) {
		if (!this._subscribers) {
			this._subscribers = {};
		}

		this._subscribers[obj.id] = {
			event: obj.event,
			handler: obj.handler
		};
	}

	get subscribers() {
		return this._subscribers;
	}

	// STANDARD METHODS

	/**
	 * Private method to create all necessary elements and bindings.
	 *
	 * @private
	 */
	_create() {
		this.preRender();
		this.registerEvents(this.events, false);
		this.registerEvents(this.subscribe, true);
		this.bindEvents();
	}

	/**
	 * Initialize your module class and
	 * save some references.
	 */
	initialize() {
		return this;
	}

	/**
	 * Destroy component by unbinding events and
	 * removing element from dom
	 */
	destroy() {
		this.unbindEvents();
		this.$el.remove();
	}

	/**
	 * Register multiple events which are saved in an object.
	 *
	 * TODO: Clean up global flag
	 *
	 * @param {Object} evts - Events object which contains an object with events as key and functions as value.
	 * @param {Boolean} global - Flag to switch between global and local events.
	 *
	 */
	registerEvents(evts, global = false) {
		if (evts) {
			Object.keys(evts).forEach((key) => {
				this.registerEvent(key, evts[key], global);
			});
		}
	}

	/**
	 * Register an event by using a simple template engine and
	 * a key/value pair.
	 *
	 * TODO: Clean up global flag
	 *
	 * @param {String} evtKey - Event key which contains event and additionally a delegated element.
	 * @param {String} fn - Function defined as string which will be bound to this.
	 * @param {Boolean} global - Flag if global or local event .
	 *
	 * @example:
	 *
	 * this.registerEvent('click .btn', 'render');
	 * this.registerEvent('click {{this.options.btn}}', 'render');
	 * this.registerEvent('{{App.EVENTS.custom.event', 'render');
	 */
	registerEvent(evtKey, fn, global = false) {
		let evtKeyArr = evtKey.split(' ');
		let arrlen = evtKeyArr.length;
		let evtType = getStringValue.apply(this, [tplEngine(evtKeyArr[0])]);
		let bindFn = this[fn].bind(this);
		let id = evtType + fn;

		if (arrlen > 2) {
			throw new Error('It seems like you have more than two strings in your events object!');
		}

		// Bind on this.$el
		if (arrlen === 1 && !global) {
			this.$el.on(evtType + this.evtNamespace, bindFn);
		} else if (arrlen === 1 && global) {
			this.subscribers = {
				id: id,
				event: evtType,
				handler: bindFn
			};

			Veams.Vent.on(evtType, bindFn);
		} else {
			let delegate = getStringValue.apply(this, [tplEngine(evtKeyArr[1])]);

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
	 *
	 * TODO: Update local event handling to support the same as global event handling
	 */
	unbindEvents() {
		// Local events which are bounded by this.events
		this.$el.off(this.evtNamespace);

		// Global events which are bounded to Veams.Vent
		for (let key in this.subscribers) {
			if (this.subscribers.hasOwnProperty(key)) {
				let obj = this.subscribers[key];

				Veams.Vent.off(obj.event, obj.handler);
			}
		}
	}

	/**
	 * Pre-Render templates
	 * which can be used to render content into it
	 */
	preRender() {
		return this;
	}

	/**
	 * Render template with data
	 *
	 * @param {String} tplName - Template name which gets returned as rendered element.
	 * @param {Object} data - Data which gets handled by the template.
	 */
	renderTemplate(tplName, data) {
		if (!window[this.options.namespace].Templates || !window[this.options.namespace].Templates[tplName]) {
			console.error(`It seems that you haven\'t defined any template ${tplName} yet!`);
		} else {
			return window[this.options.namespace].Templates[tplName](data);
		}
	}

	/**
	 * Render your module
	 */
	render() {
		return this;
	}
}

/**
 * Add mixin functionality to extend module class
 */
VeamsComponent.mixin = Veams.helpers.mixin;

export default VeamsComponent;