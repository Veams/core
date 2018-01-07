'use strict';

/**
 * Represents a component constructor which supports
 * options merging,
 * binding and unbinding of events and subscriptions with template strings,
 * rendering of templates
 * and a destroy behaviour.
 *
 * Keep in mind, that this class is a dependent of Veams.
 *
 * TODO: Make a native one which does not need any Veams specific stuff.
 *
 * @module VeamsComponent
 * @author Sebastian Fitzner
 */

/**
 * Imports
 */
import VeamsBase, { VeamsBaseConfig } from './base';
import getStringValue from '../utils/internal-helpers/get-string-value';
import tplEngine from '../utils/internal-helpers/template-engine';
import { VeamsCollection } from '../utils/internal-helpers/collection';

export interface VeamsComponentConfig extends VeamsBaseConfig {
	appInstance?: any; // @TODO: Check type
}

export interface VeamsSubscriber {
	id?: string;
	delegate?: any;
	type: any;
	event: any;
	handler: any;
}

/**
 * Custom Functions
 */
function buildEvtId(evtKeyArr, fnName) {
	return evtKeyArr.join('_') + '_' + fnName;
}

abstract class VeamsComponent extends VeamsBase {
	_events: {
		[key: string]: string
	};

	_subscribe: {
		[key: string]: string
	}

	__subscribers: VeamsCollection<VeamsSubscriber>;

	private appInstance: any;
	$el: JQuery;

	/**
	 * Constructor
	 *
	 * to save standard elements like el and options and
	 * execute initialize as default method.
	 *
	 * @param {Object} obj [{}] - Object which contains el, options from the DOM and namespace.
	 * @param {Object} options [{}] - Object which contains options of the extended class.
	 */
	constructor(obj: VeamsComponentConfig = {}, options = {}) {
		super(obj, options);
		this.appInstance = obj.appInstance || window.Veams;

		if (!this.appInstance) {
			throw new Error('VeamsComponent :: Please provide your app instance!');
		}

		if (!this.appInstance.$) {
			console.info('VeamsComponent :: Please add a DOM handler like jQuery to the app instance!');
		}

		if (this.appInstance.$) {
			this.$el = this.appInstance.$(obj.el);
		}

		this.initialize(obj, options);
		this._create();
	}

	// ----------------------------------------------------------
	// GETTER & SETTERS
	// ----------------------------------------------------------

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

	addSubscriber(obj: VeamsSubscriber) {
		if (!this.__subscribers) {
			this.__subscribers = {};
		}

		this.__subscribers[obj.id] = {
			delegate: obj.delegate,
			type: obj.type,
			event: obj.event,
			handler: obj.handler
		};
	}

	get _subscribers(): VeamsCollection<VeamsSubscriber> {
		return this.__subscribers;
	}

	// ----------------------------------------------------------
	// STANDARD METHODS
	// ----------------------------------------------------------
	abstract initialize(...args);

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
	 * Bind local and global events
	 *
	 * @public
	 */
	abstract bindEvents();

	/**
	 * Unbind events
	 *
	 * @public
	 */
	abstract unbindEvents();

	/**
	 * Pre-Render templates
	 * which can be used to render content into it
	 *
	 * @public
	 */
	preRender() {
		return this;
	}

	/**
	 * Render your module
	 *
	 * @public
	 */
	render() {
		return this;
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
	 * Render template with data
	 *
	 * @param {String} tplName - Template name which gets returned as rendered element.
	 * @param {Object} data - Data which gets handled by the template.
	 */
	renderTemplate(tplName, data) {
		if (!this.appInstance.templater) {
			console.error(`
				VeamsComponent :: It seems that you haven\'t added the VeamsTemplater plugin. In order to work with 'renderTemplate()' you need to add it!
			`);
		} else {
			return this.appInstance.templater.render(tplName, data);
		}
	}

	// ----------------------------------------------------------
	// MOUNT PROCESS METHODS
	// Mount process methods will be handled by the VeamsModules plugin
	// ----------------------------------------------------------

	/**
	 * This method will be executed after initialise
	 */
	abstract willMount();

	/**
	 * This method will be executed before unregistering events
	 */
	abstract willUnmount();

	/**
	 * This method will be executed after render
	 */
	abstract didMount();

	/**
	 * This method will be executed after unregistering events
	 */
	abstract didUnmount();

	// ----------------------------------------------------------
	// EVENTS METHODS
	// ----------------------------------------------------------

	/**
	 * Register multiple events which are saved in an object.
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
		let evtType = getStringValue.apply(this, [tplEngine(evtKeyArr[0]), this.appInstance]);
		let bindFn = this[fn].bind(this);
		let id = buildEvtId(evtKeyArr, fn);

		if (arrlen > 2) {
			throw new Error('It seems like you have more than two strings in your events object!');
		}

		// Bind on this.$el
		if (arrlen === 1 && !global) {
			this.$el.on(evtType, bindFn);

			this.addSubscriber({
				type: 'event',
				id: id,
				event: evtType,
				handler: bindFn
			});

		} else if (arrlen === 1 && global) {
			this.appInstance.Vent.subscribe(evtType, bindFn);

			this.addSubscriber({
				type: 'globalEvent',
				id: id,
				event: evtType,
				handler: bindFn
			});
		} else {
			let delegate = getStringValue.apply(this, [tplEngine(evtKeyArr[1])]);

			this.$el.on(evtType, delegate, bindFn);

			this.addSubscriber({
				type: 'delegatedEvent',
				delegate: delegate,
				id: id,
				event: evtType,
				handler: bindFn
			});
		}
	}

	/**
	 * Delete all registered events.
	 */
	unregisterEvents() {
		for (let key in this.addSubscriber) {
			if (this.addSubscriber.hasOwnProperty(key)) {
				let obj = this.addSubscriber[key];

				if (obj.type === 'globalEvent') {
					this.appInstance.Vent.unsubscribe(obj.event, obj.handler);
				} else if (obj.type === 'delegatedEvent') {
					this.$el.off(obj.event, obj.delegate, obj.handler);
				} else {
					this.$el.off(obj.event, obj.handler);
				}
			}
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

		if (this.addSubscriber[id]) {
			let obj = this.addSubscriber[id];

			if (obj.type === 'globalEvent') {
				this.appInstance.Vent.unsubscribe(obj.event, obj.handler);
			} else if (obj.type === 'delegatedEvent') {
				this.$el.off(obj.event, obj.delegate, obj.handler);
			} else {
				this.$el.off(obj.event, obj.handler);
			}
		}
	}
}

export default VeamsComponent;