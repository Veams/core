import { mixinType } from '../utils/helpers/mixin';
export interface VeamsBaseConfig {
    namespace?: string;
    el?: HTMLElement;
    options?: any;
}
declare class VeamsBase {
    options: any;
    _namespace: string;
    _instanceId: string | number;
    _el: HTMLElement;
    mixin: mixinType;
    /**
     * Constructor
     *
     * to save standard elements like el and options and
     * execute initialize as default method.
     *
     * @param {String} namespace - Add custom namespace to your class.
     * @param {Object} el - Save element in class.
     * @param {Object} options - Options passed by init process.
     * @param {Object} opts [{}] - Object which contains options of the extended class.
     */
    constructor({namespace, el, options}: VeamsBaseConfig, opts?: {});
    namespace: string;
    instanceId: string | number;
    _options: any;
    el: HTMLElement;
    /**
     * Get module information
     */
    readonly metaData: {
        name: string;
    };
}
export default VeamsBase;
