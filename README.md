[//]: # ({{#wrapWith "content-section"}})

[//]: #     ({{#wrapWith "grid-row"}})
[//]: #         ({{#wrapWith "grid-col" colClasses="is-col-mobile-l-8"}})

# Core of `VEAMS` framework

`VEAMS` provides a simple but extendable frontend framework. When you have scaffolded the project with the `@veams/cli`, it will be automatically integrated into your project.

> When you have scaffolded the project with the CLI you can skip the Installation and Usage section!

## Table of Content

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

----------------

## Installation without `@veams/cli`

To install `VEAMS` as framework you have to work with the core library. 

### NPM 

``` bash
npm install @veams/core --save
```

### Yarn 

``` bash
yarn add @veams/core 
```

----------------

## Usage 

### Basic Usage

To use `VEAMS` as framework just install and import the library: 

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

### Advanced Usage 

You can also create your own instance of the core by using the `Core` class. 

``` js
import Core from '@veams/core/lib/core';

let app = new Core({
    namespace: 'App',
    addToGlobal: false
});
```

----------

## `VEAMS` Core

The core of `VEAMS` is nothing more than a simple object (`Veams`). In general `VEAMS` comes with some empty and predefined objects and a basic API.

### Veams Core Options

- _namespace_ {`String`} [`'Veams'`] - Add your custom namespace.
- _addToGlobal_ {`Boolean`} [`false`] - Add your previously defined namespace to the global window object.

### `VEAMS` Core API

#### Veams.addHelper('name', helperFunction)

* @param {`String`} name - Helper name which will be used in the registration process.
* @param {`Function`} helperFunction - The helper function.

The method allows the registration of provided or custom helpers.

#### Veams.use(plugin)

* @param {`Object`} plugin - Plugin object which extends the `VEAMS` object.

This method provides the possibility to register a plugin, see section [Creation of plugins](creation-of-plugins).

### Veams Core Object

#### Veams.EVENTS {`Object`}

The events object can be used to communicate between modules. 
It can be extended with further custom events. Just see [@veams/plugin-vent](https://github.com/Veams/plugin-vent).

#### Veams.base.version {`String`}

Display the current `VEAMS` version.

#### Veams.dectections {`Object`}

The detections object contains the current width and height, as well as if you are on a touch device or not.

The detections object will be updated when you use [@veams/plugin-media-query-handler](https://github.com/Veams/plugin-media-query-handler).

#### Veams.helpers {`Object`}

`VEAMS` has some helpers which you can use. But you should use [`@veams/helpers`](https://github.com/Veams/helpers) for usage.

#### Veams.Plugins {`Object`}

All named plugins will be saved in this object. In the beginning it is empty.

---------------

## Helpers

`VEAMS` has multiple helpers you can choose from. Therefore exists its own repository: https://github.com/Veams/helpers.

------------- 

## Common Classes and Services

`VEAMS` provide some more classes which are handled in its own repository.

1. [Veams Base](https://github.com/Veams/base)
1. [Veams Component](https://github.com/Veams/component)
1. [Veams Http Service](https://github.com/Veams/http-service)

[//]: #         ({{/wrapWith}})
[//]: #     ({{/wrapWith}})

[//]: # ({{/wrapWith}})