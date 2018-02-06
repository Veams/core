/**
 * Represents a simple http service, which returns a promise.
 *
 * @module http
 * @author Sebastian Fitzner
 */
import VeamsBase from '../common/base';
export interface RequestObject {
    method?: string;
    url?: string;
    type?: string;
    data?: string;
}
declare class VeamsHttp extends VeamsBase {
    data: any;
    constructor(options?: {});
    initialize(): Promise<{}>;
    requestWillOpen(request: XMLHttpRequest, obj: any): void;
    requestDidOpen(request: XMLHttpRequest, obj: any): void;
    requestWillLoad(request: XMLHttpRequest, obj: any): void;
    requestDidLoad(request: XMLHttpRequest, obj: any): void;
    requestWillSend(request: XMLHttpRequest, obj: any): void;
    requestDidSend(request: XMLHttpRequest, obj: any): void;
    promiseRequest(obj?: RequestObject): Promise<{}>;
    get(url?: boolean): Promise<{}>;
    delete(url?: boolean): Promise<{}>;
    post(url: boolean, data: any): Promise<{}>;
    put(url: boolean, data: any): Promise<{}>;
    /**
     * The default parser, which returns the response text.
     * This method can be overridden.
     *
     * @param {Object} obj - Generic object.
     * @param {Object} obj.req - Request object.
     * @param {String} obj.dataType - Define a type for the response text.
     *
     */
    parser(obj: any): any;
}
export default VeamsHttp;
