# Part 13: Project Setup #

## TypeScript

The TypeScript npm package comes bundled with the official compiler that compiles to JavaScript. To allow for some flexibility, the compiler allows for some configuration which is passed through a json formatted `tsconfig.json` file. If you want a base json file to start off with, you can execute the command `tsc --init`, however, we'll use the following for our project:

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

We'll go over some of the more relevant properties in short detail:

#### target
The compilation target. Typescript supports targeting different platforms depending on your needs. In our case, we're targeting modern browsers so this is `es5`.

#### module
The target module resolution interface. We're integrating TypeScript through Webpack which provides support for different interfaces so in our case we want to use node's module resolution interface, commonjs, since that makes it easier for us to understand what's happening.

### emitDecoratorMetadata, experimentalDecorators
Decorator support in TypeScript [hasn't been finalized yet](http://rbuckton.github.io/ReflectDecorators/typescript.html) but since Angular 2 uses decorators extensively, these need to be set to true.

#### exclude
The TypeScript compiler recursively searches the file tree for files with the `.ts` extension, using its path as the root. We want to add node_modules and any other path that could cause problems.

## Webpack

### Why use another tool?

A modern JavaScript web application includes a lot of different packages and dependencies, and it's important to have something that makes sense of it all in a simple way.

Angular 2 takes the approach of breaking your application apart into many different components, each of which can have several files. Separating application logic this way is good for the developer, but can detract from user experience since doing this can increase page loading time. HTTP2 aims to solve this problem in one way, but until we've gotten a better feel for it, we will need a way to bundle different parts of your application together and compress it.

Our platform, the browser, must continue to provide backwards compatibility for all existing code and this necessitates slow movement of additions to the base functionality of html/css/js. To avoid binding themselves to the constraints of the web platform, the community has created different tools that transform their preferred syntax/feature set to what the browser supports. This is especially evident in this course where we leverage [TypeScript](http://www.typescriptlang.org/) heavily. Although we don't do this in our course, projects may also involve different css preprocessors (sass, stylus) or templating engines (jade, Mustache, EJS) that need to be integrated.


### Webpack to the rescue

  - works with different types of files in different contexts, brings js, css, template compilers together
  - provides minification and source maps
  - provides common interface/workflow that solves above issues meaning limited config, dont need to spend time gathering different packages
  - hot code reloading (just mention)


streamlines that integration into your workflows.


### Installation
  - npm install --saveDev
      webpack ts-loader html-webpack-plugin
      tslint-loader (optional? do we want to make reference to linting?)
  - (self note) need more info RE serve-webpack-client, relevant?
  - open source so github available: https://github.com/webpack/webpack

- How to setup?
  - default to execute webpack.config.js
  - what are entry points
  - setup separate entry points for external resources and internal resources, important RE angular2
  - integrate with npm tasks
  - (self note) non-entry chunks as specified by chunkFilename?
  - plugin basics
  - loader basics

- Examples/Use cases of it in action
  - necessary? may be covered through the rest of the course?
  - go through ng2-redux repo config

- Link reference for more information
  - mention features not covered and link docs for more info
  - http://webpack.github.io/docs/
