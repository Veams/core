/**
 * Const for events (pub/sub)
 *
 * @author: Sebastian Fitzner
 */
/**
* Events Global
*/
declare const EVENTS: {
    blur: string;
    change: string;
    click: string;
    dblclick: string;
    DOMchanged: string;
    DOMredirect: string;
    hashchange: string;
    input: string;
    keydown: string;
    keypress: string;
    keyup: string;
    mediachange: string;
    moduleCached: string;
    mousedown: string;
    mouseenter: string;
    mouseleave: string;
    mouseout: string;
    mouseover: string;
    mouseup: string;
    reset: string;
    resize: string;
    scroll: string;
    submit: string;
    swipe: string;
};
export default EVENTS;
export declare type EVENTSType = {
    [key: string]: string;
};
