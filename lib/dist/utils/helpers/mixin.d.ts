/**
 * Merge method functions.
 *
 * @param {Object} from - Mixin object which will be merged via Helpers.defaults with the methods of our class
 * @param {Array} methods - Array of method names which will be extended.
 */
export default function mixin(from: any, methods?: string[]): void;
export declare type mixinType = (from: {}, methods: string[]) => any;
