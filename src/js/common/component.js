if (!Veams) {
	throw new Error('Please initialize Veams!');
}

if (!Veams.helpers.mixin || !Veams.helpers.extend) {
	throw new Error('The mixin or extend helper is missing!');
}

if (!Veams.$) {
	console.info('Please add a DOM handler like jQuery to the window object!');
}

/**
 * Imports
 */
import makeIdHelper from '../utils/helpers/make-id';
import stringHelpers from '../utils/internal-helpers/string';
import getStringValue from '../utils/internal-helpers/get-string-value';
import tplEngine from '../utils/internal-helpers/template-engine';

/**
 * Custom Functions
 */
function buildEvtId(evtKeyArr, fnName) {
	return evtKeyArr.join('_') + '_' + fnName;
}

/**
 * Variables
 */
const $ = Veams.$;

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
		if (!obj.namespace) {
			console.log('You should pass an object with a namespace for your component!');
		} else {
			this.namespace = obj.namespace;
		}
		this.instanceId = this.namespace;
		this.el = obj.el;
		this.options = options;
		this.namespace = null;
		this.evtNamespace = '.' + this.metaData.name;
		this._options = obj.options;

		if (Veams.$) {
			this.$el = $(obj.el);
		}

		this.initialize(obj, options);
		this._create();
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
		this.options = Veams.helpers.extend(this.options, options || {});
	}

	/**
	 * Get module information
	 */
	get metaData() {
		return {
			name: typeof this.namespace === 'string' ? stringHelpers.capitalizeFirstLetter(stringHelpers.toCamelCase(this.namespace)) : ''
		};
	}

	get instanceId() {
		return this._instanceId;
	}

	set instanceId(id) {
		this._instanceId = `${id}_` + Date.now() + '_' + makeIdHelper();
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

	set _subscribers(obj) {
		if (!this.__subscribers) {
			this.__subscribers = {};
		}

		this.__subscribers[obj.id] = {
			type: obj.type,
			event: obj.event,
			handler: obj.handler
		};
	}

	get _subscribers() {
		return this.__subscribers;
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

	// MOUNT PROCESSES
	// ------------------------------------------------
	willMount() {
	}

	willUnmount() {
	}

	didMount() {
	}

	didUnmount() {
	}

	/**
	 * Destroy component by unbinding events and
	 * removing element from DOM
	 */
	destroy() {
		this.unregisterEvents();
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
	 * @private
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
	 * @public
	 *
	 * @example
	 * this.registerEvent('click .btn', 'render');
	 * this.registerEvent('click {{this.options.btn}}', 'render');
	 * this.registerEvent('{{App.EVENTS.custom.event', 'render');
	 * this.registerEvent('{{App.EVENTS.resize', 'render', true);
	 */
	registerEvent(evtKey, fn, global = false) {
		if (typeof evtKey !== 'string') {
			console.error('VeamsComponent :: Your event is not a string!');
			return;
		}

		if (typeof fn !== 'string') {
			console.error('VeamsComponent :: Your event handler function is not a string!');
			return;
		}

		let evtKeyArr = evtKey.split(' ');
		let arrlen = evtKeyArr.length;
		let evtType = getStringValue.apply(this, [tplEngine(evtKeyArr[0])]);
		let bindFn = this[fn].bind(this);
		let id = buildEvtId(evtKeyArr, fn);

		if (arrlen > 2) {
			throw new Error('It seems like you have more than two strings in your events object!');
		}

		// Bind on this.$el
		if (arrlen === 1 && !global) {
			this.$el.on(evtType + this.evtNamespace, bindFn);

			this._subscribers = {
				type: 'event',
				id: id,
				event: evtType,
				handler: bindFn
			};

		} else if (arrlen === 1 && global) {
			Veams.Vent.subscribe(evtType, bindFn);

			this._subscribers = {
				type: 'globalEvent',
				id: id,
				event: evtType,
				handler: bindFn
			};
		} else {
			let delegate = getStringValue.apply(this, [tplEngine(evtKeyArr[1])]);

			this.$el.on(evtType, delegate, bindFn);

			this._subscribers = {
				type: 'delegatedEvent',
				id: id,
				event: evtType,
				handler: bindFn
			};
		}
	}

	/**
	 * Unregister an event by using the saved subscribers and
	 * a key/value pair.
	 *
	 *
	 * @param {String} evtKey - Event key which contains event and additionally a delegated element.
	 * @param {String} fn - Function defined as string which will be unbound to this.
	 *
	 * @public
	 *
	 * @example
	 * this.unregisterEvent('click .btn', 'render');
	 * this.unregisterEvent('click {{this.options.btn}}', 'render');
	 * this.unregisterEvent('{{App.EVENTS.custom.event', 'render');
	 * this.unregisterEvent('{{App.EVENTS.resize', 'render');
	 */
	unregisterEvent(evtKey, fn) {
		let evtKeyArr = evtKey.split(' ');
		let id = buildEvtId(evtKeyArr, fn);

		if (this._subscribers[id]) {
			let obj = this._subscribers[id];

			if (obj.type === 'globalEvent') {
				Veams.Vent.unsubscribe(obj.event, obj.handler);
			} else {
				this.$el.off(obj.event, obj.handler);
			}
		}
	}

	unregisterEvents() {
		for (let key in this._subscribers) {
			if (this._subscribers.hasOwnProperty(key)) {
				let obj = this._subscribers[key];

				if (obj.type === 'globalEvent') {
					Veams.Vent.unsubscribe(obj.event, obj.handler);
				} else {
					this.$el.off(obj.event, obj.handler);
				}
			}
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
	 * @public
	 *
	 */
	unbindEvents() {
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
		if (!Veams.templater) {
			console.error(`It seems that you haven\'t added the VeamsTemplater plugin. In order to work with 'renderTemplate()' you need to add it!`);
		} else {
			return Veams.templater.render(tplName, data);
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