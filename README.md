<p align="center"><img src="http://veams.org/img/svg/icons/veams-std.svg"></p>
<p align="center">Head to the <a href="http://veams.org/">site</a> for detailed instructions.
<br><br>
<a href="https://gitter.im/Sebastian-Fitzner/Veams?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge"><img src="https://badges.gitter.im/Sebastian-Fitzner/Veams.svg" alt="Gitter Chat" /></a></p>


# What is Veams?

__Veams is one of the most flexible and efficient system to build scalable Web Apps, HTML5 web interfaces and Prototypes. It is extremely extensible and efficiently architected.__

Veams contains various (pluggable) instruments which are controlled by our custom command line interface.

## Overview

1. [Veams as Framework](#veams-as-framework)
2. [Veams-Cli](#veams-cli)
3. [Veams-Generator](#veams-generator)
4. [Veams-Methodology](#veams-methodology)
5. [Veams-Components](#veams-components)

------------

## Veams as Framework

Veams exposes a framework which you can use as a simple starting point. This starting point can be enhanced and extended by an easy plugin system.

The purpose of Veams is to individually build up a __project based framework__ in a simple, fast, scalable and understandable way.

It is not opinionated, means use the stack which fits best to your project, in example Backbone, React, Foundation or something else.

### Table of Content
1. [Typical Use Cases for Veams](#typical-use-cases)
2. [Usage](#usage)
  - [Installation](#installation)
  - [Import](#import)
3. [Core](#veams-core)
  - [General](#the-general-veams-object)
  - [Helpers](#helpers)
4. [Plugins](#plugins)
  - [Usage of Plugins](#usage-of-plugins)
  - [Creation of Plugins](#creation-of-plugins)
  - [Available Plugins](#available-plugins)
5. [Common](#common)
  - [VeamsComponent](#veamscomponent)
6. [Services](#services)
  - [VeamsHttp](#veamshttp)
7. [Roadmap of Veams](#roadmap)

### Typical Use Cases

Veams is used in many projects of the agency I work for.

The majority of projects are portal like websites, they are mostly static (CMS) and get enhanced with (a lot of) JavaScript.

That's why all plugins or components are heavily optimised for that project type.

### Usage 

To use Veams as framework just install and import the library: 

#### Installation

``` bash
npm install veams --save
```

#### Import

_JavaScript_

``` js
import Veams from 'veams';
```

Then initialize the core:

``` js
Veams.core.initialize();
```

_SCSS_

``` scss
// Reset (veams-reset or veams-normalize)
@import "../node-modules/veams/src/scss/veams-reset";
@import "../node-modules/veams/src/scss/veams";
```

That's it. The framework is integrated.

### Veams Core

The core of Veams is nothing more than a simple object (`Veams`). In general Veams comes with some empty and predefined objects and a basic API.

#### Veams Core API

##### Veams.addHelper('name', helperFunction)

* @param {`String`} name - Helper name which will be used in the registration process.
* @param {`Function`} helperFunction - The helper function.

The method allows the registration of provided or custom helpers.

##### Veams.use(plugin)

* @param {`Object`} plugin - Plugin object which extends the Veams object.

This method provides the possibility to register a plugin, see section [Creation of plugins](creation-of-plugins).

#### Veams Core Object

##### Veams.EVENTS {`Object`}

The events object can be used to communicate between modules. It can be extended with further custom events. Just see [VeamsVent](#veamsvent).

##### Veams.dectections {`Object`}

The detections object contains the current width and height, as well as if you are on a touch device or not.

The detections object will be updated when you use [VeamsMediaQueryHandler](#veamsmediaqueryhandler).

##### Veams.helpers {`Object`}

Veams has some helpers which you can use. Some of the helpers are optional, others are requirements, see [Veams Helpers](#helpers).

##### Veams.options {`Object`}

Veams provides some general options. These are:

- _`namespace`_ {String} ['App'] - The custom namespace of your application.

##### Veams.plugins {`Object`}

All named plugins will be saved in this object. In the beginning it is empty.

##### Veams.version {`String`}

Display the current Veams version.

### Veams Helpers

The helpers are saved in `src/js/utils/helpers/`.

__The following helper are provided as default helpers:__

- [Extend Helper](#veamshelpersextenda-b)
- [For Each Helper](#veamshelpersforeacharray-callback-scope)
- [Touch Helper](#veamshelpersistouch)
- [Method Extend Helper](#veamshelpersmethodextendto-from-methodname)
- [Mixin Helper](#veamshelpersmixinfrom-methods--initialize-render)
- [Selector Helper](#veamshelpersqueryselectorarraysel-context)
- [Throttle Helper](#veamshelpersthrottlefunc-wait-immediate)

__Additional helpers can be imported by you:__

These helpers need to be imported into your project and can be added to the Veams.helper object by using the provided `Veams.addHelper()` method.

- [Animation End Helper](#veamshelpersanimationendevent)
- [Check Element in Context Helper](#veamshelperscheckelementincontextelem-context)
- [Detect Swipe Helper](#veamshelpersdetectswipeel-threshold)
- [Get Param from URL Helper](#veamshelpersgetparamfromurlurl-param)
- [Index Of Helper](#veamshelpersindexofarray-item)
- [Is In Viewport Helper](#veamshelpersisinviewportelem-usebounds)
- [Make Id Helper](#veamshelpersmakeidsegments--1)
- [Transition End Helper](#veamshelperstransitionendevent)
- [Update URL Helper](#veamshelpersupdateurlurl-params)

_Example:_

```js
import makeIdHelper from 'veams/src/utils/helpers/make-id';

const helpers = {
    makeId: makeIdHelper
}

// Simple use a function and a helper name
Veams.addHelper('makeId', makeIdHelper);

// Or pass an object to the method with your helpers in it
Veams.addHelper(helpers);
```

---------------

#### Veams.helpers.extend(a, b)

* @param {Object} a - object which will be extended.
* @param {Object} b - object which extending a.

Simple extend method to extend the properties of the object `a` with `b`. It overrides existing values of `a`.

#### Veams.helpers.forEach(array, callback, scope)

* @param {Array} array - array of objects
* @param {function} callback - callback function
* @param {string} scope - scope of function

Simple forEach method which can be used to iterate over an array.

#### Veams.helpers.isTouch()

Touch detection helper which returns a boolean.

#### Veams.helpers.methodExtend(to, from, methodName)

* @param {Object} to - view which will be extended.
* @param {Object} from - methods which comes from mixin.
* @param {String} methodName - function name.

Helper method to extend an already existing method.

#### Veams.helpers.mixin(from, _methods_ = ['initialize', 'render'])

* @param {Object} from - Mixin object which will be merged via Helpers.defaults with the methods of our class
* @param {Array} [methods] - Array of method names which will be extended.

Merge method functions. As second paramater you can provide an array of method names which will be extended.

#### Veams.helpers.querySelectorArray(sel, _context_)

* @param {String} elem - Required: selector
* @param {Object} [context] - Optional: context

Get dom elements in an array in a specific context. If context is not provided it uses document as context.

#### Veams.helpers.throttle(func, wait, immediate)

* @param {function} func - Function which will be executed.
* @param {number} wait - number to wait in milliseconds.
* @param {boolean} immediate - execute function immediately.

Throttle method for resize events and more.

---------------

#### Veams.helpers.animationEndEvent()

Detect animationend event.

#### Veams.helpers.checkElementInContext(elem, context)

* @param {Object} elem - Element, which will be checked.
* @param {Object} context - Context element, in which our element could persists.

Check if element is in a specific context and return state as boolean.

#### Veams.helpers.detectSwipe(el, threshold)

* @param {Object} el - element to detect swipes on
* @param {Number} threshold - threshold for swipe (in px)

Detect swipe gestures.

#### Veams.helpers.getParamFromUrl(url, param)

* @param {String} url - given url
* @param {String} param - parameter (name)

Get value of parameter for given url.

#### Veams.helpers.indexOf(array, item)

* @param {Array} array - array in which we search for
* @param {Object} item - item which will be searched

Find index of a specific item in an array.

#### Veams.helpers.isInViewport(elem, useBounds)

* @param {Object} elem - Object, which we want to check
* @param {boolean} useBounds - if true, whole element must be visible

Check if element is in viewport.

#### Veams.helpers.makeId(segments = 1)

* @param {Number} [segments=1] - number of segments of generated id (segments consist of 10 digits, separated by '-').

Generates numeric id and returns a string.

#### Veams.helpers.transitionEndEvent()

Detect transition end event.

#### Veams.helpers.updateUrl(url, params)

* @param {String} url - url on which parameters should be added / updated
* @param {Object} params - parameters (name/value)

Add/Update multiple parameters for given url and returns a resulting URL string.

### Plugins

In general the plugin system is a really simple one. 

#### Usage of a plugin

When you want to use a plugin you first need to import the plugin and then just execute the `use` method of Veams: 

```js
import VeamsLogger from 'veams/lib/plugins/logger';

// Add plugins to the Veams system
Veams.use(VeamsLogger);
```

You can pass in options to the plugin just by adding other parameters:

```js
import VeamsMediaQueryHandler from 'veams/lib/plugins/media-query-handler';

// Add plugins to the Veams system
Veams.use(VeamsMediaQueryHandler, {
    delay: 200
});
```

#### Creation of plugins

When you want to create a plugin you only need to export an object with an `initialize` method in it. It is really easy. 

Let's say you want to add jQuery as DOM handler in Veams: 

1. First you need to import the jQuery library
2. Then you create a simple object 
    - The `pluginName` is optional
    - Into the `initialize` method there will be passed the Veams object
3. Execute `use` of Veams.

```js
import $ from 'jquery';

let DomPlugin = {
	pluginName: '$',
	initialize: function(Veams) {
        Veams.$ = $;
	}
};

Veams.use(DomPlugin);
```

That's it. You extended the general Veams object. 

#### Available plugins

There are multiple plugins available.

1. [VeamsDOM](#veamsdom)
2. [VeamsVent](#veamsvent)
3. [VeamsLogger](#veamslogger)
4. [VeamsModules](#veamsmodules)
5. [VeamsMediaQueryHandler](#veamsmediaqueryhandler)
6. [VeamsTemplater](#veamstemplater)
7. [VeamsMixins](#veamsmixins)

Please keep in mind that the order of the initialisation of your used plugins can be important. In general it makes sense to use the following order: 

```js
// Intialize core of Veams
Veams.core.initialize();

// Add plugins to the Veams system
Veams.use(VeamsDOM, {
    DOM: $
}); // VeamsDOM is important for VeamsVent
Veams.use(VeamsVent); // VeamsVent enhances VeamsModules and VeamsMediaQueryHandler
Veams.use(VeamsLogger);
Veams.use(VeamsModules);
Veams.use(VeamsMediaQueryHandler);
```

##### VeamsDOM

The VeamsDOM plugin is simple plugin for which you need to pass a DOM handler like jQuery. For many other plugins VeamsDOM is a requirement.

__How to__

```js
import $ from 'jquery';
import Veams from 'veams';
import VeamsDOM from 'veams/lib/plugins/dom';

// Intialize core of Veams
Veams.core.initialize();

// Add plugins to the Veams system
Veams.use(VeamsDOM, {
    DOM: $
});
```
_Options_

_DOM_ {`Function`} [`() => {}`] (required) - Add a DOM handler by using this option. It should have the same api like jQuery.

##### VeamsVent

The VeamsVent plugin is a global publish and subscribe object. You can use this plugin to communicate between modules independently.

Veams exposes a global event object (`Veams.EVENTS`) which can used and extended by this plugin.

__How to__

```js
import Veams from 'veams';
import VeamsVent from 'veams/lib/plugins/vent';
import EVENTS from './custom-events';

// Intialize core of Veams
Veams.core.initialize();

// Add plugins to the Veams system
Veams.use(VeamsVent, {
    furtherEvents: EVENTS
});
```

_Options_

- _furtherEvents_ {`Object`} [`false`] - Add your custom events to the global events object of Veams.

##### VeamsLogger

The VeamsLogger plugin disables `console` logs by default. You can provide parameters (`?devmode`) in the URL to show the logs in your console.

Furthermore it gives you the possibility to add a logger (`?logger`) which will be displayed on other devices.

__How to__

```js
import Veams from 'veams';
import VeamsLogger from 'veams/lib/plugins/logger';

// Intialize core of Veams
Veams.core.initialize();

// Add plugins to the Veams system
Veams.use(VeamsLogger);
```

##### VeamsModules

The VeamsModules plugin provides a whole system to initialize, render, save and destroy your modules.

It uses mutation observer to observe added and removed nodes and handles your components, as long as the component has the same API like [VeamsComponent](#veamscomponent).

__How to__

```js
import Veams from 'veams';
import VeamsModules from 'veams/lib/plugins/modules';

// Intialize core of Veams
Veams.core.initialize();

// Add plugins to the Veams system
Veams.use(VeamsModules, {
    useMutationObserver: true
});
```

_API_

When enabled you can register a module like that:

```js
import CustomModule from './modules/custom';

Veams.modules.register([
    domName: 'custom',
    module: CustomModule
]);
```

_Options_

- _attrPrefix_ {`String`} [`'data-js'`] - You can override the javascript module indicator in your markup which will be searched in the context.
- _logs_ {`Boolean`} [`false`] - Hide or print the logs to the console.
- _useMutationObserver_ {`Boolean`} [`false`] - You can set this option to true to use mutation observer for ajax handling. You can also use `Veams.EVENTS.DOMchanged` as before.

##### VeamsMediaQueryHandler

The VeamsMediaQueryHandler plugin provides to you a possibility to get the current media query name from your css.

If you want to use the media query support then just add the following lines to a custom scss file and modify it like you want:

``` scss
head {
	font-family: desktop;

	@include bp(1024px) {
		font-family: tablet-l;
	}

	@include bp(768px) {
		font-family: tablet-p;
	}

	@include bp(657px) {
		font-family: mobile-l;
	}

	@include bp(480px) {
		font-family: mobile-p;
	}

	@include bp(360px) {
		font-family: mobile-s;
	}
}
```

Then you only need to import and use the plugin from the Veams package: 

```js
import Veams from 'veams';
import VeamsModules from 'veams/lib/plugins/modules';

// Intialize core of Veams
Veams.core.initialize();

// Add plugins to the Veams system
Veams.use(VeamsMediaQueryHandler, {
    delay: 200
});
```

_Options:_

You can pass a second parameter with an options object. Available options are: 

- `mediaQueryProp` {String} ['font-family'] - Define a media query property which you have added to the head element.
- `delay` {Number} [300] - Define the delay value for the throttle handling which is responsible to trigger an event and set the `currentMedia` value.

##### VeamsMixins

The VeamsMixins plugin is something where you can save global mixins. Mixins are object with functions in it which can be used to extend methods in other classes/modules.

```js
import Veams from 'veams';
import VeamsMixins from 'veams/lib/plugins/mixins';

// Intialize core of Veams
Veams.core.initialize();

// Add plugins to the Veams system
Veams.use(VeamsMixins);
```

_API:_

When enabled the API provides a way to add a mixin to the container `Veams.mixins`.

###### Veams.addMixin('name', mixinFunction)

* @param {`String`} name - Mixin name which will be used in the registration process.
* @param {`Function`} mixinFunction - The mixin function should return an object with methods.

The method allows the registration of provided or custom mixins.

```js
import Veams from 'veams';
import VeamsMixins from 'veams/lib/plugins/mixins';

import imageLoader from './utils/mixins/image-loader';

// Intialize core of Veams
Veams.core.initialize();

// Add plugins to the Veams system
Veams.use(VeamsMixins);
Veams.addMixin('imageLoader', imageLoader);
```

Later you can use this specific mixin in other modules:

```js
myClass.mixin(Veams.mixins.imageLoader);
```

Here you see that you need to extend your custom class with the helper function `mixin`, which is available in `Veams.helpers`.

### Common

Veams provide some common classes.

#### VeamsComponent

* `import VeamsComponent from 'veams/lib/common/component'`

The class provides a base system to build components. It merges options, bind and unbind events without worrying about that, subscribe to global events and renders templates with data.

### Services

#### VeamsHttp

* `import VeamsHttp from 'veams/lib/services/http'`

The class provides a simple ajax system (`.get()`, `.post()`) which returns a promise.

### Roadmap

There are many things left. So here you can see a short overview:

1. __Extend/Enhance Plugins Repository__
  - React Plugin
  - Vue.js Plugin
  - Lazyload Modules Handler Plugin
  - Extend Templater Plugin to support server side templates
2. __Enhance Commons and Services__
  - Create a native VeamsComponent
  - Create a11y service
3. __Extend Helpers Repository__
  - Add more useful helpers
  - Update existing ones
4. __Write tests__

If you have other ideas, please open an issue on github, I would appreciate that!

---------

## Veams-Cli

Veams-Cli is a command line interface for scaffolds and build processes.
The key benefit is the rapid setup time. You can easily create complex application setups with Veams-Cli in a few minutes.

### Repository and Options

- Github: https://github.com/Sebastian-Fitzner/veams-cli
- NPM: https://www.npmjs.com/package/veams-cli

## Veams-Generator

Veams-Cli uses Yeoman, Inserter, generator-veams and some other modules to provide a nice base.

Veams-Generator is a module based on Yeoman. We use this generator to scaffold applications or blueprints. You want to know more?

### Repository and Options

- Github: https://github.com/Sebastian-Fitzner/generator-veams
- NPM: https://www.npmjs.com/package/generator-veams

## Veams-Methodology

Veams-Methodology is a system for your whole frontend stack. Typical questions - which Veams-Methodology is solving - are:

1. How to scope and differentiate units (Components, Utilities, Regions) in your HTML?
2. How to bind JavaScript to your DOM elements?
3. How to structure layouts?
4. How to write your classes?
5. How to extend your project?

### Documentation

- http://www.veams.org/methodology/

## Veams-Components

Veams-Components is a building blocks library to speed up templating in projects.

All components can be found here: https://github.com/Veams

**Do you want to see the components in action? Here you go: http://examples.veams.org/**

## veams.org

The website is built with Veams, of course. Here ist the repository: https://github.com/Sebastian-Fitzner/veams.org