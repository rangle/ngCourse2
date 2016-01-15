# Part 13: Project Setup #

We're integrating a large part of our application with Webpack and TypeScript, so it's important to go over how those are setup and configured to get a good understanding of what gets generated client-side.

## TypeScript Configuration

The TypeScript npm package comes bundled with the official compiler that compiles to JavaScript. To allow for some flexibility, the compiler allows for some configuration which is passed through a json formatted _tsconfig.json_ file. If you want a base json file to start off with, you can execute the command `tsc --init`, however the defaults don't really fit our project so we're using the following:

```javascript
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "noImplicitAny": false,
    "removeComments": false,
    "sourceMap": true
  },
  "exclude": [
    "node_modules",
    "app/__build"
  ]
}
```

We'll go over some of the more relevant properties in short detail:

#### target
The compilation target. Typescript supports targeting different platforms depending on your needs. In our case, we're targeting modern browsers which provides `es5`.

#### module
The target module resolution interface. We're integrating TypeScript through Webpack which provides support for different interfaces. We've decided to use node's module resolution interface, `commonjs`, since that makes it easier for us to understand what's happening.

#### emitDecoratorMetadata, experimentalDecorators
Decorator support in TypeScript [hasn't been finalized yet](http://rbuckton.github.io/ReflectDecorators/typescript.html) but since Angular 2 uses decorators extensively, these need to be set to true.

#### exclude
The TypeScript compiler recursively searches the file tree for files with the **.ts** extension, using its path as the root. We want to avoid parsing _node_modules_ and any other path that could cause problems.

## Webpack

### Why use another tool?

A modern JavaScript web application includes a lot of different packages and dependencies, and it's important to have something that makes sense of it all in a simple way.

Angular 2 takes the approach of breaking your application apart into many different components, each of which can have several files. Separating application logic this way is good for the developer, but can detract from user experience since doing this can increase page loading time. HTTP2 aims to solve this problem in one way, but until more is known about its effects, we will want to bundle different parts of our application together and compress it.

Our platform, the browser, must continue to provide backwards compatibility for all existing code and this necessitates slow movement of additions to the base functionality of html/css/js. The community has created different tools that transform their preferred syntax/feature set to what the browser supports to avoid binding themselves to the constraints of the web platform. This is especially evident in Angular 2 applications, where [TypeScript](http://www.typescriptlang.org/) is used heavily. Although we don't do this in our course, projects may also involve different css preprocessors (sass, stylus) or templating engines (jade, Mustache, EJS) that need to be integrated.

Webpack solves these problems by providing a common interface to integrate all of these tools and that allows us to streamline our workflow and avoid complexity.

### Installation

The easiest way to include webpack is through npm. This is how we've included it - along with a couple of other packages that it involves. The following packages should be a part of your devDependencies: `webpack`, `ts-loader`. `html-webpack-plugin`, `tslint-loader`.


### Setup and Usage

The main way to use webpack is through the cli. By default, running the command executes _webpack.config.js_, so we'll put our configuration in there.

The core concept of webpack is the **bundle**. Each bundle represents a specific set of logical boundaries that we define. For the purposes of this project, we have two main bundles: one for client side logic specific to our application, and another for 3rd party libraries.

Bundles are configured through webpack using **entry points**. Webpack starts by treating each entry point as the root node of a graph and resolves all referenced modules as nodes of that graph, identifying which modules will be included in that bundle. We then configure how each bundle is prepared and outputted.

This section of our configuration file will look like this:

```javascript
{
  ...
  entry: {
    app: './src/index.ts',
    vendor: [
      'es6-shim',
      'angular2/bundles/angular2-polyfills',
      'angular2/bootstrap',
      'angular2/platform/browser',
      'angular2/platform/common_dom',
      'angular2/core',
      'angular2/router',
      'angular2/http',
      'redux',
      'redux-thunk',
      'ng2-redux',
      'redux-logger'
    ]
  }
  ...
}
```

### Output configuration

File output can also be configured. Many of the configuration settings can be defined based on different parameters of the input bundle. When referencing these parameters in a property string, they will be wrapped in square brackets. Each setting has a different set of parameters depending on its context.

#### path
Often, we'll want to reroute where files are saved into a separate _bin_ or _dist_ folder so we don't mix up files needed for the application to run and files used solely for development. This lets us easily ignore deployment files in source control as well.

#### filename
The files that are generated by webpack are known as chunks. Each bundle that is created may be split up into different chunks for optimization purposes. Since there may be many of these, we will want to set some naming conventions for us to be able to identify these chunks.

#### publicPath
The general interface for referencing files in a running web app is through file routes. This property identifies the path where the chunks can be accessed if any references are made to these files during webpack processing.

#### sourceMapFilename
We want to be able to debug files not by the chunks that have been generated, but by how we've organized them in development. This is done by generating something called source maps. There are a few options for how source maps are generated, here we're going to have source maps stored in a different file and we're specifying the file name for each source map.

#### chunkFilename
The file specified in the filename property is known as the entry chunk. If there is more than one chunk in a bundle that means we have non-entry chunks as well. Non-entry chunks can have their own naming convention as specified in this property.

Our output configuration will look like this:

```javascript
{
  ...
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: "/",
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].chunk.js'
  }
  ...
}
```

### Loaders

TypeScript isn't core JavaScript so webpack needs a bit of extra help to parse the **.ts** files. It does this through the use of **loaders**. Loaders are a way of configuring how webpack transforms the outputs of specific files in our bundles. Our `ts-loader` package is handling this transformation for TypeScript files.

Loaders are configured in webpack as loader tasks, each of which can have the following properties

#### test
The file path must match this condition to be handled. This is commonly used to test file extensions eg. `/\.ts$/`

#### loader
The loaders that will be used to transform the input. More than one loader can be added here. Loaders are specified by a '!' separated string and executed in a chain from right to left. *eg.* `style!css`. Loaders can also be passed arguments. This is done using query parameters. *eg.* `style!css?sourceMap`. Note that although the packages are named `ts-loader`, `css-loader`, `style-loader`, we don't need to include the `-loader` part in our config.

#### exclude
The file path must not match this condition to be handled. This is commonly used to exclude file folders. eg. `/node_modules/`

#### include
The file path must match this condition to be handled. This is commonly used to include file folders.  eg. `path.resolve(__dirname, 'app/src')`.


Each setting can be specified as a string, regular expression (in the form of `RegExp`), function with signature `(absolutePath: string): bool` or an array of any of these, which are tested and combined with `&&`.

Our TypeScript loader task will look like this:

```javascript
{
  test: /\.ts$/,
  loader: 'ts-loader',
  exclude: /node_modules/
}
```

This runs the typescript compiler which respects our configuration settings as specified above. We want to be able to handle other files and not just TypeScript files, so we need to specify a list of loaders. This is done by creating an array of tasks. Tasks specified in this array are chained, so if a file matches multiple conditions, it will be processed using each task in order.

Our task array for this project looks like this:

```javascript
{
  ...
  module: {
    preLoaders: [{
      test: /\.ts$/,
      loader: 'tslint'
    }],
    loaders: [
      { test: /\.ts$/, loader: 'ts', exclude: /node_modules/ },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loader: 'style!css?sourceMap' },
      { test: /\.svg/, loader: 'url' },
      { test: /\.eot/, loader: 'url' },
      { test: /\.woff/, loader: 'url' },
      { test: /\.woff2/, loader: 'url' },
      { test: /\.ttf/, loader: 'url' },
    ],
    noParse: [ /zone\.js\/dist\/.+/, /angular2\/bundles\/.+/ ]
  }
  ...
}
```

There are a few things that should jump out, one being the preLoaders array. The preLoaders array works just like the loaders array only that it is a separate task chain that is executed before the loaders task chain.

Another thing is the references to css, svg, eot, ... files. We're asking webpack to process non-JavaScript files, but only JavaScript files have been specified as entry points. We connect these two by importing these other file types in your JavaScript. At the top of your file you'll have something like this:

```javascript
import './styles/style.css';
```

You also see a few other loaders:

#### raw-loader
Returns the file content as a string.

#### url-loader
Returns a base64 encoded data url if the file size is under a certain threshold, otherwise it just returns the file.

#### css-loader
Resolves `@import` and `url` references in css files as modules.

#### style-loader
Injects a style tag with bundled css in the head tag. This is appended as a child element of the head tag using on page javascript.


### Plugins

Plugins are a way of executing different code at different stages of the webpack bundling process while being provided the inputs/outputs of the bundler at those stages. This lets plugins change the behaviour of loaders and basic bundling.

One plugin we're using is the html webpack plugin. This plugin lets us generate html with the ability to inject chunks or bundles into html files where we want them. Our configuration will look like this:


```javascript
new HtmlWebpackPlugin({
  template: './src/index.html',
  inject: 'body',
  minify: false
});
```

### Summary

When we put everything together, our complete file will look something like this:

```javascript
'use strict';

const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const basePlugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: 'body',
    minify: false
  })
];

const envPlugins = {
    production: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    development: []
};

const plugins = basePlugins.concat(envPlugins[process.env.NODE_ENV] || []);

module.exports = {
  entry: {
    app: './src/index.ts',
    vendor: [
      'es6-shim',
      'angular2/bundles/angular2-polyfills',
      'angular2/bootstrap',
      'angular2/platform/browser',
      'angular2/platform/common_dom',
      'angular2/core',
      'angular2/router',
      'angular2/http',
      'redux',
      'redux-thunk',
      'ng2-redux',
      'redux-logger'
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: "/",
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].chunk.js'
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },

  plugins: plugins,

  module: {
    preLoaders: [{
      test: /\.ts$/,
      loader: 'tslint'
    }],
    loaders: [
      { test: /\.ts$/, loader: 'ts', exclude: /node_modules/ },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loader: 'style!css?sourceMap' },
      { test: /\.svg/, loader: 'url' },
      { test: /\.eot/, loader: 'url' },
      { test: /\.woff/, loader: 'url' },
      { test: /\.woff2/, loader: 'url' },
      { test: /\.ttf/, loader: 'url' },
    ],
    noParse: [ /zone\.js\/dist\/.+/, /angular2\/bundles\/.+/ ]
  }
}
```

Webpack also does things like hot code reloading and code optimization which we haven't covered. For more information you can check out the [official documentation](http://webpack.github.io/docs/). The source is also available on [Github](https://github.com/webpack/webpack).
