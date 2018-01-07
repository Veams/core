/// <reference types="jquery" />
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
import { VeamsCollection } from '../utils/internal-helpers/collection';
export interface VeamsComponentConfig extends VeamsBaseConfig {
    appInstance?: any;
}
export interface VeamsSubscriber {
    id?: string;
    delegate?: any;
    type: any;
    event: any;
    handler: any;
}
declare abstract class VeamsComponent extends VeamsBase {
    _events: {
        [key: string]: string;
    };
    _subscribe: {
        [key: string]: string;
    };
    __subscribers: VeamsCollection<VeamsSubscriber>;
    private appInstance;
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
    constructor(obj?: VeamsComponentConfig, options?: {});
    /**
     * Get and set events object
     */
    events: {
        [key: string]: string;
    };
    /**
     * Get and set subscribe object
     */
    subscribe: {
        [key: string]: string;
    };
    addSubscriber(obj: VeamsSubscriber): void;
    readonly _subscribers: VeamsCollection<VeamsSubscriber>;
    abstract initialize(...args: any[]): any;
    /**
     * Private method to create all necessary elements and bindings.
     *
     * @private
     */
    _create(): void;
    /**
     * Bind local and global events
     *
     * @public
     */
    abstract bindEvents(): any;
    /**
     * Unbind events
     *
     * @public
     */
    abstract unbindEvents(): any;
    /**
     * Pre-Render templates
     * which can be used to render content into it
     *
     * @public
     */
    preRender(): this;
    /**
     * Render your module
     *
     * @public
     */
    render(): this;
    /**
     * Destroy component by unbinding events and
     * removing element from DOM
     */
    destroy(): void;
    /**
     * Render template with data
     *
     * @param {String} tplName - Template name which gets returned as rendered element.
     * @param {Object} data - Data which gets handled by the template.
     */
    renderTemplate(tplName: any, data: any): any;
    /**
     * This method will be executed after initialise
     */
    abstract willMount(): any;
    /**
     * This method will be executed before unregistering events
     */
    abstract willUnmount(): any;
    /**
     * This method will be executed after render
     */
    abstract didMount(): any;
    /**
     * This method will be executed after unregistering events
     */
    abstract didUnmount(): any;
    /**
     * Register multiple events which are saved in an object.
     *
     * @param {Object} evts - Events object which contains an object with events as key and functions as value.
     * @param {Boolean} global - Flag to switch between global and local events.
     *
     * @private
     */
    registerEvents(evts: any, global?: boolean): void;
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
    registerEvent(evtKey: any, fn: any, global?: boolean): void;
    /**
     * Delete all registered events.
     */
    unregisterEvents(): void;
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
    unregisterEvent(evtKey: any, fn: any): void;
}
export default VeamsComponent;
