/**
 * Represents VeamsCore.
 * @module VeamsCore
 *
 * @author Sebastian Fitzner
 */
import '../utils/polyfills/custom-event';
import { EVENTSType } from '../utils/events';
import { VeamsHelpersType } from '../plugins/helpers';
import { VeamsOptions } from './veamsOptions';
declare class VeamsCore {
    _initialized: any;
    /**
     * Current Veams Version
     */
    _version: any;
    /**
     *
     */
    detections: {
        width: number;
        height: number;
    };
    /**
     * Registered Veamshelpers
     */
    helpers: VeamsHelpersType;
    /**
     * Available Events
     */
    EVENTS: EVENTSType;
    Plugins: {};
    use: any;
    /**
     * Base information about veams
     */
    base: {
        name: string;
        version: string;
    };
    /**
     * Veams options
     */
    _options: VeamsOptions;
    constructor(opts: any);
    version: any;
    initialized: any;
    options: VeamsOptions;
    /**
     * Setup Veams core
     * @param opts
     */
    setup(opts: VeamsOptions): void;
    /**
     * Initialize veams core
     * @param opts Options
     */
    initialize(opts?: VeamsOptions): void;
    /**
     * On init lifecyle hook
     * @param cb
     */
    onInitialize(cb: () => any): any;
    /**
     * On DOM ready livecycle hook
     * @param cb
     */
    onDOMReady(cb: () => any): void;
}
export default VeamsCore;
