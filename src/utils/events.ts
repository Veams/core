'use strict';

/**
 * Const for events (pub/sub)
 *
 * @author: Sebastian Fitzner
 */

/**
 * Events Global
 */
const EVENTS = {
    blur: 'blur',
    change: 'change',
    click: 'click',
    dblclick: 'dblclick',
    DOMchanged: 'dom:changed',
    DOMredirect: 'dom:redirect',
    focus: 'focus',
    hashchange: 'hashchange',
    input: 'input',
    keydown: 'keydown',
    keypress: 'keypress',
    keyup: 'keyup',
    mediachange: 'mediachange',
    moduleCached: 'module:cached',
    mousedown: 'mousedown',
    mouseenter: 'mouseenter',
    mouseleave: 'mouseleave',
    mousemove: 'mousemove',
    mouseout: 'mouseout',
    mouseover: 'mouseover',
    mouseup: 'mouseup',
    reset: 'reset',
    resize: 'resize',
    resizeFull: 'resizeFull',
    resizeVertical: 'resizeVertical',
    scroll: 'scroll',
    submit: 'submit',
    swipe: 'swipe',
    touchstart: 'touchstart',
    touchmove: 'touchmove',
    touchend: 'touchend'
};

export default EVENTS;

export type EVENTSType = {
    [key: string]: string
};
