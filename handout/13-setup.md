# Part 13: Project Setup #

## TypeScript

The TypeScript npm package comes bundled with the official compiler to compile to JavaScript. To allow for some flexibility, the compiler allows for some configuration which is passed through a json formatted `tsconfig.json` file. If you want a base json file to start off with, you can execute the command `tsc --init`.


## Webpack

### Why use another tool?

A modern JavaScript web application includes a lot of different packages and dependencies, and it's important to have something that makes sense of it all in a simple way.

Angular 2 takes the approach of breaking your application apart into many different components, each of which can have several files. Separating application logic this way is good for the developer, but can detract from user experience since doing this can increase page loading time. HTTP2 aims to solve this problem in one way, but until we've gotten a better feel for it, we will need a way to bundle different parts of your application together and compress it.

The most common platform, the browser, must continue to provide backwards compatibility for all existing code and this necessitates slow movement of additions to the base functionality of html/css/js. To avoid binding themselves to the constraints of the web platform, the community has created different compilation tools that transform their preferred syntax and feature set to what the browser supports.  This is especially evident in this course where we leverage [TypeScript](http://www.typescriptlang.org/) heavily. Projects may also involve different css preprocessors (sass, stylus) or templating engines (jade, Mustache, EJS) that need to be integrated.


### Webpack to the rescue

- Why webpack?
  - works with different types of files in different contexts, brings js, css, template compilers together
  - provides minification and source maps
  - provides common interface/workflow that solves above issues meaning limited config, dont need to spend time gathering different packages
  - hot code reloading (just mention)


streamlines that integration into your workflows.


- How to get?
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


## Angular CLI##

**Introduction**

The Angular CLI is a new CLI tool built by the Angular team to help developers set up their projects. It is based on the well-regarded Ember CLI used by the Ember community; for that reason you may find references to Ember in the code or commands while the tool is still under development.

The Angular CLI consists of a set of commands with blueprints attached to them.

**Prerequisites**

To make the angular cli work you must have node version 4 or greater installed on your system. To check the version of node you have on your system run `node -v` command and check the console output you should see the version there.
```shell
% node -v
v4.1.0
% npm -v
3.3.9
```
**Installation**

The Angular CLI can be installed as an npm package by running `npm install -g angular-cli`. This will take a few minutes. Once the installation has completed, you can check the CLI version as follows.
```shell
npm install -g angular-cli // installing angular-cli

% ng --version
version: 1.13.13 // checking the version
Could not find watchman, falling back to NodeWatcher for file system events.
Visit http://www.ember-cli.com/user-guide/#watchman for more info.
node: 4.1.0
npm: 2.14.10
os: darwin x64
```

**Usage**

To create a project using the Angular CLI go to your destination folder and enter the command below. It will install the project template and its dependencies. This might take some time based on your network.

```shell
% ng new ng-test2
warning: An ember-addon has attempted to override the core command "new". The addon command will be used as the overridding was explicit.
version: 1.13.13
Could not find watchman, falling back to NodeWatcher for file system events.
Visit http://www.ember-cli.com/user-guide/#watchman for more info.
installing ng2
  create ember-cli-build.js
  create .gitignore
  create karma-test-shim.js
  create karma.conf.js
  create package.json
  create src/app/ng-test2.html
  create src/app/ng-test2.spec.ts
  create src/app/ng-test2.ts
  create src/app.ts
  create src/favicon.ico
  create src/index.html
  create src/tsconfig.json
Successfully initialized git.
Installing packages for tooling via npm...
```

To launch the application navigate to the application directory just created by the angular-cli and run the serve command. You should see the successful launch message in console. Navigate to URL `http://localhost:4200/` you should see the message `ng-test Works!` in the browser.

```shell
% cd ng-test
% ng serve
version: 1.13.13
Could not find watchman, falling back to NodeWatcher for file system events.
Visit http://www.ember-cli.com/user-guide/#watchman for more info.
Livereload server on http://localhost:49152
Serving on http://localhost:4200/

Build successful - 4150ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
DiffingTSCompiler                             | 3726ms
BroccoliMergeTrees                            | 224ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
DiffingTSCompiler (1)                         | 3726ms
BroccoliMergeTrees (1)                        | 224ms
```

Once you open the project in your text editor you should see the file structure as shown below.

![File Structure](angular-cli-file-structure.png)

Now try to change the text in the file `ng-test.html` and you should see application compiles and auto reloads the browser. Also you would see below output in the console.

```shell
file changed app/ng-test.html

Build successful - 20ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
BroccoliMergeTrees                            | 5ms
Funnel                                        | 4ms
DiffingTSCompiler                             | 1ms
CustomReplace                                 | 1ms
TreeStabilizer                                | 1ms
Funnel                                        | 1ms
Funnel                                        | 1ms
Funnel: index.html                            | 1ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
Funnel (4)                                    | 7ms (1 ms)
BroccoliMergeTrees (1)                        | 5ms
DiffingTSCompiler (1)                         | 1ms
CustomReplace (1)                             | 1ms
TreeStabilizer (1)                            | 1ms
Funnel: index.html (1)                        | 1ms
```

**Generating Scaffolds**

The Angular CLI comes with scaffolding options to generate few angular 2 things using command line.
To generate the angular2 components with angular-cli:

```shell
% ng generate component my-comp
version: 1.13.13
Could not find watchman, falling back to NodeWatcher for file system events.
Visit http://www.ember-cli.com/user-guide/#watchman for more info.
installing component
  create src/app/components/my-comp/my-comp.css
  create src/app/components/my-comp/my-comp.html
  create src/app/components/my-comp/my-comp.ts
installing component-test
  create src/app/components/my-comp/my-comp.spec.ts
```

In a similar way you can generate pipe and service also for angular2. To see what are all the blueprints available to generate use help command. (You might see some content from ember cli here)

```shell
% ng generate --help
version: 1.13.13
Could not find watchman, falling back to NodeWatcher for file system events.
Visit http://www.ember-cli.com/user-guide/#watchman for more info.
Requested ember-cli commands:

ember generate <blueprint> <options...>
  Generates new code from blueprints.
  aliases: g
  --dry-run (Boolean) (Default: false)
    aliases: -d
  --verbose (Boolean) (Default: false)
    aliases: -v
  --pod (Boolean) (Default: false)
    aliases: -p
  --classic (Boolean) (Default: false)
    aliases: -c
  --dummy (Boolean) (Default: false)
    aliases: -dum, -id
  --in-repo-addon (String) (Default: null)
    aliases: -in-repo <value>, -ir <value>


  Available blueprints:
    ng2:
      component <name>
      component-test <name>
      ng2 <name>
      pipe <name>
      service <name>
    ember-cli:
      acceptance-test <name>
.......
```

**Production Build**

To create the distribution build just use the `build` command. It will generate the distribution folder and the compiled version of the application.

```shell
% ng build
version: 1.13.13
Could not find watchman, falling back to NodeWatcher for file system events.
Visit http://www.ember-cli.com/user-guide/#watchman for more info.
Built project successfully. Stored in "dist/".
```

**Running Tests**

The Tests can only run on the distribution build so make sure you build the project before you run the tests.
Once build is done you can just run `karma start` to run the tests.

In the future, there will only be one command for this: `ng test`.

* Angular CLI is still in development and will change over time
* There are still lot of references to Ember
* Addons like angular-cli-github-pages can be useful
* It generates all blueprints based on Typescript only
