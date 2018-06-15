# What is Veams?

__Veams is one of the most flexible and efficient system to build scalable Web Apps, HTML5 web interfaces and Prototypes. It is extremely extensible and efficiently architected.__

Veams contains various (pluggable) instruments which are controlled by our custom command line interface.

## Overview

1. [Veams as Framework](#veams-as-framework)
    - Core Framework with plugins, helpers and common classes and services
1. [Veams-Cli](#veams-cli)
    - Generator for projects, components, services and more
1. [Veams-Components](#veams-components)
    - Configurable Veams Components with documentation
1. [Veams-Methodology](#veams-methodology)
    - Frontend Methodology to work with static site applications

------------

## Veams as Framework

Veams exposes a framework (`@veams/core`) which you can use as a simple starting point. This starting point can be enhanced and extended by an easy plugin system.

The purpose of Veams is to individually build up a __project based framework__ in a simple, fast, scalable and understandable way.

It is not opinionated, means use the stack which fits best to your project, for example Backbone, React, Foundation or something else.

### Table of Content

1. [Typical Use Cases for Veams](#typical-use-cases)
1. [Installation](#installation)
1. [Basic Usage](#basic-usage)
1. [Advanced Usage](#advanced-usage)
1. [Core](#veams-core)
    - [Options](#veams-core-options)
    - [Api](#veams-core-api)
1. [Helpers](#veams-helpers)
1. [Plugins](#plugins)
    - [Usage of Plugins](#usage-of-plugins)
    - [Creation of Plugins](#creation-of-plugins)
    - [Available Plugins](#available-plugins)
1. [Common Classes & Services](#common-classes-and-services)

### Typical Use Cases

#### Static Page Application

Veams is used in many projects in the agency I work for.

The majority of projects are portal like websites, they are mostly static (CMS) and get enhanced with (a lot of) JavaScript.

That's why all plugins or components are heavily optimised for that project type.

#### Single Page Application

Veams can also be used in SPA projects. With the new CLI you can scaffold React projects as well. There are a few blueprints which can be used to easily scaffold components.

Just take a look at: 
- [React Container Blueprint](https://github.com/Veams/bp-react-container)
- [Redux Blueprint](https://github.com/Veams/bp-redux)

----------------

### Installation

To install Veams as framework you have to work with the core library. 

#### NPM 

``` bash
npm install @veams/core --save
```

#### Yarn 

``` bash
yarn add @veams/core 
```

----------------

### Usage 

#### Basic Usage

To use Veams as framework just install and import the library: 

_JavaScript_

``` js
import Veams from '@veams/core';
```

This imports a starter kit which initialize the core. 

_SCSS_

``` scss
// Reset (veams-reset or veams-normalize)
@import "./node_modules/veams/scss/veams-reset";
@import "./node_modules/veams/scss/veams";
```

That's it. The framework is integrated.

#### Advanced Usage 

You can also create your own instance of the core by using the `Core` class. 

``` js
import Core from '@veams/core/lib/core';

let app = new Core({
    namespace: 'App',
    addToGlobal: false
});
```

----------

### Veams Core

The core of Veams is nothing more than a simple object (`Veams`). In general Veams comes with some empty and predefined objects and a basic API.

#### Veams Core Options

- _namespace_ {`String`} [`'Veams'`] - Add your custom namespace.
- _addToGlobal_ {`Boolean`} [`false`] - Add your previously defined namespace to the global window object.

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

The events object can be used to communicate between modules. 
It can be extended with further custom events. Just see [@veams/plugin-vent](https://github.com/Veams/plugin-vent).

##### Veams.base.version {`String`}

Display the current Veams version.

##### Veams.dectections {`Object`}

The detections object contains the current width and height, as well as if you are on a touch device or not.

The detections object will be updated when you use [@veams/plugin-media-query-handler](https://github.com/Veams/plugin-media-query-handler).

##### Veams.helpers {`Object`}

Veams has some helpers which you can use. But you should use [`@veams/helpers`](https://github.com/Veams/helpers) for usage.

##### Veams.Plugins {`Object`}

All named plugins will be saved in this object. In the beginning it is empty.

---------------

### Helpers

Veams has multiple helpers you can choose from. Therefore exists its own repository: https://github.com/Veams/helpers.

---------------

### Plugins

In general the plugin system is a really simple one. 

#### Usage of a plugin

When you want to use a plugin you first need to import the plugin and then just execute the `use` method of Veams: 

```js
import PluginXY from 'PluginXY';

// Add plugins to the Veams system
Veams.use(PluginXY);
```

You can pass in options to the plugin just by adding other parameters:

```js
import PluginXY from 'PluginXY';

// Add plugins to the Veams system
Veams.use(PluginXY, {
	// Options object
    my: 'option'
});
```

#### Creation of plugins

When you want to create a plugin you only need to export an object with an `initialize` method in it. It is really easy. 

Let's say you want to add jQuery as DOM handler in Veams and want to share one single instance in the project: 

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

That's it. You extended the general Veams object. Now you can just work with this instance by accessing it: 

``` js
import Veams from './app.js';

Veams.$('.page-wrapper').addClass('is-working');
```

#### Available plugins

There are multiple plugins available.

1. [Veams DOM Plugin](https://github.com/Veams/plugin-dom)
2. [Veams Vent Plugin](https://github.com/Veams/plugin-vent)
3. [Veams Logger Plugin](https://github.com/Veams/plugin-logger)
4. [Veams Modules Plugin](https://github.com/Veams/plugin-modules)
5. [Veams Media Query Handler Plugin](https://github.com/Veams/plugin-media-query-handler)
6. [Veams Templater Plugin](https://github.com/Veams/plugin-templater)
7. [Veams Mixins Plugin](https://github.com/Veams/plugin-mixins)
7. [Veams Store Plugin](https://github.com/Veams/plugin-store)

Please keep in mind that the order of the initialisation of your used plugins can be important. In general it makes sense to use the following order: 

```js
// Intialize core of Veams
Veams.onInitialize(() => {

    // Add plugins to the Veams system
    Veams.use(VeamsDOM, {
        DOM: $
    });
    Veams.use(VeamsLogger);
    Veams.use(VeamsVent); // VeamsVent enhances VeamsModules and VeamsMediaQueryHandler
    Veams.use(VeamsMediaQueryHandler);
    Veams.use(VeamsModules);
});

```

------------- 

### Common Classes and Services

Veams provide some more classes which are handled in its own repository.

1. [Veams Base](https://github.com/Veams/base)
1. [Veams Component](https://github.com/Veams/component)
1. [Veams Http Service](https://github.com/Veams/http-service)

## Veams-Cli

Veams-Cli is a command line interface for scaffolds and build processes.
The key benefit is the rapid setup time. You can easily create complex application setups with Veams-Cli in a few minutes.

#### Repository and Options

- Github: https://github.com/Veams/cli

## Veams-Generator

Veams-Cli uses Yeoman, Inserter, generator-veams and some other modules to provide a nice base.

Veams-Generator is a module based on Yeoman. We use this generator to scaffold applications or blueprints. You want to know more?

### Repository and Options

- Github: https://github.com/Veams/generator-veams

## Veams-Methodology

Veams-Methodology is a system for your whole frontend stack. Typical questions - which Veams-Methodology is solving - are:

1. How to scope and differentiate units (Components, Utilities, Regions) in your HTML?
2. How to bind JavaScript to your DOM elements?
3. How to structure layouts?
4. How to write your classes?
5. How to extend your project?

### Documentation

The documentation is outdated. After refactoring is done a new documentation will be released!

- http://www.veams.org/methodology/

## Veams Components

Veams Components is a building blocks library to speed up templating in projects.

All components can be found here: https://github.com/Veams

**Do you want to see the components in action? Here you go: http://examples.veams.org/**

## veams.org

The website is outdated. After refactoring is done a new website will be released!

The website is built with Veams, of course. Here ist the repository: https://github.com/Sebastian-Fitzner/veams.org

## Roadmap

There are many things left. So here you can see a short overview:

1. __Extend/Enhance Plugins Repository__
    - React Plugin
    - Lazyload Modules Handler Plugin
    - Extend Templater Plugin to support server side templates
2. __Enhance Commons and Services__
    - Create a native VeamsComponent
    - Create a11y service
3. __Write tests__

If you have other ideas, please open an issue on github, I would appreciate that!

## Contributors

Thanks for contributing to the project:

- [Andy Gutsche](https://github.com/andy-gutsche)
- [Sven Friedemann](https://github.com/3makkk)