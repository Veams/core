declare global  {
    interface Window {
        Veams: any;
        Promise: Promise<any>;
        CustomEvent: any;
        Event: any;
    }
}

/**
 * Imports
 */
import Veams from './generics/starter';
import Core from './generics/core';

/**
 * Variables
 */
export default Veams;
export { Core };