declare global  {
    interface Window {
        Veams: any;
        Promise: Promise<any>;
        CustomEvent: any;
        Event: any;
        msCrypto: any;
    }
}

/**
 * Imports
 */
import Veams from './generics/starter';

/**
 * Variables
 */
export default Veams;