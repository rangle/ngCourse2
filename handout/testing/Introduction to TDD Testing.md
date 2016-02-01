# Introduction to TDD Testing

What is Test-Driven-Development? Well, simply put, its an engineering process in which the developer writes an intial automated test case that defines a feature, then writes the minimum amount of code to pass the test and eventually refactors the code to acceptable standards. 

A **unit test** is used to test individual components of the system. An **integration test** is a test which tests the system as a whole, and how it will run in production.

Unit tests should only verify the behaviour of a specific unit of code. If the unit's behaviour is modified, then the unit test would be updated as well. Unit tests should not make assumptions about the behaviour of *other* parts of your codebase or your dependencies. When other parts of your codebase are modified, your unit tests **should not fail**. (If they do fail, you have written a test that relies on other components, it is therefore not a unit test.) Unit tests are cheap to maintain, and should only be updated when the individual units are modified. For TDD in Angular, a unit is most commonly defined as a class, pipe, component, or service. It is important to keep units relatively small, this keeps tests in a 'self-documenting' state, where they are easy to read and understand. 

## Toolchain

Our testing toolchain will consist of the following tools. 

- Jasmine
- Karma
- Phantom-js
- Istanbul
- Sinon
- Chia

[Jasmine](http://jasmine.github.io/) is the testing framework that has been baked into the Angular 2 `angular2/testing` module. This is the core framework that we will write our unit tests with. 

[Karma](https://karma-runner.github.io/) is a test automation tool for controlling the execution of our tests, what platform to perform them under, and allows us to generate various reports on the results. For one or two tests this may seem like overkill, but as an application grows larger and the number of units to test grows, it is important to organize, execute, and report on tests in an efficient manner. Karma is library agnostic so we could use other testing frameworks in combination with other tools (like code coverage reports, spy testing, e2e, etc.). 

In order to test our Angular 2 application we need create an environment for it to run in. We could use a browser like Chrome or Firefox to accomplish this (Karma supports in-browser testing). We could also use a browser-less environment to test our application, which can offer us greater control over automating certain tasks and managing our testing workflow. [Phantom-js](http://phantomjs.org/) provides a javascript api that allows us to create a headless DOM instance which can be used to bootstrap our Angular 2 application. Then, using that DOM instance that is running our Angular 2 application, we can run our tests. 

[Istanbul](https://gotwarlost.github.io/istanbul/) is used by Karma to generate code coverage reports, which will tell us to what overall percent our application is being tested. This is a great way to track what components/services/pipes/etc have tests written and which don't. We can get some useful insight into how much are application is being tested and where. 

For some extra testing functionality we can use the [Sinon](http://sinonjs.org/) library for things like test spys, test subs, and mock XHR requests. 

[Chia](http://chaijs.com/) is an assertion library that can be paired with any other testing framework. It offers some sytnax sugar that lets us write our unit tests with different verbage - we can use a *should*, *expect* or *assert* interface. Chia also takes advantage of function chaining to form english like sentences used to describe tests in a more user friendly way. Chia isn't a required library for testing and we won't explore it much more in this handout, but it is a useful tool for creating cleaner more well written tests. 

## Setup

The repo [ng2-redux-starter](https://github.com/rangle/angular2-redux-starter) is a basic webpack based Angular 2 application (with Redux) with the same testing toolchain outlined above. Lets take a look at how this project is setup. 

###Filename Conventions
Each unit test is put into its own separate file. The Angular 2 team recommends putting unit test scripts alongside the files they are testing and using a `.spec` filename extension to mark it as a testing script (this is a Jasmine convention). So if you had a component `/app/components/MyComponent.ts`, then your unit test for this component would be in `/app/components/MyComponent.spec.ts`. This is a matter of taste, you can put your testing scripts wherever you like, though keeping them close to your source files makes them easier to find and gives those who aren't familiar with the source code an idea of how that particular piece of code should work. 

### Karma Configuration
Karma is the foundation of our testing workflow, it brings together our other testing tools to define what framework we want to use, what environment to test under, what specific actions we want to perform, etc. In order to do this Karma relies on a configration file *karma.config.js*. You can seed a new configuration file though the `karma init` command, which will guide you through a few basic questions to get a bare minimum setup running. If we take a look at the *karma.config.js* file in ng2-redux-starter we'll see a few important points of interest. 

``` typescript
module.exports = function(config) {
	config.set({
      	frameworks: [
  		  'jaasmine',
          'chai',
          'simoma'
		],
      
      	files: [
  		  'node_modules/reflect-metadata/Reflect.js',
          './src/tests.entry.ts'
		],
      
      	exclude: [
          'node_modules/angular2/**/*.spec.js'
		],
		
		plugins: [
	      require('karma-jasmine'), 
	      require('karma-chai'),
	      require('karma-sinon'),
	      require('karma-chrome-launcher'),
	      require('karma-phantomjs-launcher'),
      	  require('karma-webpack'),
    	  require('karma-sourcemap-loader'),
	      require('karma-coverage')
		],
      
      	preprocessors: {
          '.src/tests.entry.ts': [
  			'webpack',
          	'sourcemap',
          	'coverage'
		  ]
		},
      
      	coverageReporter: {
        	dir: 'coverage/',
        	reporters: [
          		{type: 'html'},
          		{type: 'text'}
			]
		},
      
      	reporters: [
  		  'progress', 
          'coverage'
		],
      
      	webpack: {...},
      
      	port: 1999,
	    browsers: ['Chrome', 'PhantomJS'],
      	singleRun: true
	});
}
```

The configuration file is put together by exporting a function that accepts the configuration object that Karma is going to work with. Modifying certain properties on this object will tell Karma what it is we want to do. Lets go over some of the key properties used in this configuration file:

- `frameworks` is a list of the testing frameworks we want to use. We would need to have these frameworks installed as a dependency in our project or/and as a Karma plugin.
- `files` is a list of files to be loaded into the browser/testing environment. This can also take the form of a regular expression pattern as it becomes rather tedious to manually add in a new file for each new testing script created. In the ng2-redux-starter *karma.config.js* we have put the files we wish to include in a separate file - *src/tests.entry.js*, which includes several `requires` and regex commands for importing patterns. As a project grows larger and the number of files to include grows in complexity it is good practise to put file imports in its own separate file - this keeps the *karma.config.js* file cleaner and better organized. 
- `exclude` is a list of files/file patterns to ignore. There may be test scripts in the *node_module* directory that are of no use to use, so we tell Karma not to look there. 
- `plugins` imports a list of plugins to load. Karma plugins are used to extend the functionality of Karma and add support for additional libraries. These plugins are NPM modules and are installed via the projects *package.json* file. 
- `preprocessors` allow for some operation to be performed on the contents of a file before it is executed and tested. These operations are carried out through the use of Karma plugins and can be very useful. For example, since we are writing our unit tests in TypeScript they need to be transpired into plain Javascript in order to be run in a browser based testing environment. In ng2-redux-starter this process is done with webpack, so we explicitly invoke the `webpack` processor on all our testing files (those ending with .spec.ts). We also load any source map files originating from transpilation through the `sourcemap` processor. Both the `karma-webpack` plugin and `karma-sourcemap-loader` plugin need to be installed and imported in order for this preprocessing to work. 
- `coverageReporter` is used to configure the output of results of our code coverage tool (our toolchain uses Istanbul). Here we have specified to output the results in html and text to the *coverage/* folder. 
- `reporters` is a list of reporters to use in the test cycle. Reporters can be thought of as modular tools used to "report" on some aspect of the testing routine outside of the core unit tests. Code coverage is an example of a reporter - we want it to report on how much of our code is being tested. [There many more reporters available for Karma](https://www.npmjs.com/browse/keyword/karma-reporter) that can aid in crafting your testing workflow.  
- If the project uses webpack (and the `karma-webpack` plugin is installed), then the property `webpack` in the Karma configuration object is where we can configure webpack with Karma. Using webpack we can configure how to bundle our unit tests - whether to pack all tests into a single bundle, or each unit test in its own bundle, etc. Regardless, unit tests should not be bundled with the rest of the applications code (especially in production!). In ng2-redux-starter we have opted to bundle all unit tests together. 
- `port`, `browsers`, `singleRun` configures what sort of environment our unit tests will run under. The `browsers` property specifies which browser we want Karma to launch and capture output from. We can use Chrome (launcher comes pre-installed with Karma), Firefox, Safari, IE or Opera (requires additional Karma plugin). For a browser-less DOM instance we can use PhantomJS (as outlined in the toolchain section). We can also manually capture output from a browser by navigating to `http://localhost:port`, where port is the number specified in the `port` property (the default value is 9876 if not specified). The property `singleRun` controls how Karma executes, if set to `true`, Karma will start, launch configured browsers, run tests, and then exit with a code of either `0` or `1` depending on whether or not all tests passed.

This is just a sample of the core properties in *karma.config.js* being used by ng2-redux-starter project. There are many more properties that can be used to extend and configure the functionality of Karma, [take a look at the official documentation for the full API breakdown](http://karma-runner.github.io/0.13/config/configuration-file.html).

###Typings
Since our project and unit tests are written in TypeScript we need type definitions for the libraries we'll be writing our tests with - Chia and Jasmine. In ng2-redux-starter we have included these type definitions in *typings.json*. 

###Executing Test Scripts
Our entire testing workflow is done through Karma, running the command `karma start` will kickstart Karma into setting up the testing environment, running through each unit test, and executing any reporters we have set up in the *karma.config.js* configuration file. In order to run Karma through the command line it needs to be installed globally (`npm install karma -g`). A good practise is to amalgamate all of your projects task/build commands through npm. This gives continuity to your build process and makes it easier for people to test/run your application without knowing your technology stack. In *package.json* there is a field `scripts` that holds an object with key-value pairing, where the key is the alias for the command, and the value is the command to be executed. 

```
...
"scripts": {
	"test": "karma start",
	...
}
...
```
Now running `npm test` will start Karma. Below is the output of our Karma test, as you can see we had one test that passed, running in a Chrome 48 browser. 

![image](images/simple-output.png =700x)

## Simple Test

To begin, lets start by writing a simple test in Jasmine.

```typescript 
import {
  describe,
  expect,
  it
} from 'angular2/testing';

describe('Testing math', () => {

  it('multiplying should work', () => {
  
  		expect(4*4).toEqual(16));
  });
});
```

Though this test may be trivial, it illustrates the basic elements of a unit test. We explain what this test is for by using `describe`, and we use `it` to assert what kind of result we are expecting from our test. These are user defined so its a good idea to be as descriptive and as accurate in these messages as possible. Messages like "should work", or "testing service" don't really explain exactly whats going on and may be confusing when running multiple tests. 

Our actual test is basic, we use `expect` to formulate a scenario and use `toEqual` to assert the resulting condition we are expecting from such scenario. The test will pass if our assertion is equal to the resulting condition, and fail otherwise. You always want your tests to pass - do not write tests that have the results you want in a failed state. 

### Using Chia 
Chia is an assertion library with some tasty syntax sugar that can be paired with any other testing framework. It lets us write tests in a TDD (Test Driven Development) style or BDD (Behaviour Driven Development) style. We already know what TDD is (read the intro!), so what exactly is BDD? Well BDD is the combination of using TDD with natural language constructs (english like sentences) to express the behaviour and outcomes of unit tests. Jasmine already uses a TDD style, so we'll be using Chia for its BDD interfaces, mainly through the use of `should`, and `expect`. 

```typescript
import {
	describe,
	expect,
	it
} from 'angular2/testing';

describe('Testing math', () => {

	it('multiplying should work', () => {
		
        let testMe = 16;

		// Using the expect interface
        chai.expect(testMe).to.be.a('number');
        chai.expect(testMe).to.equal(16);

		// Using the should interface
        chai.should();
        testMe.should.be.a('number');
        testMe.should.equal(16);			
	});
});
```

The `expect` and `should` interface both take advantage of chaining to construct english like sentences for describing tests. Once you've decided on a style you should maintain that style for all your other tests. Each style has its own unique syntax, so once you've decided on a style refer to the [documentation for that specific api](http://chaijs.com/guide/styles/).