# ToolChain

Our testing toolChain will consist of the following tools.

- Jasmine
- Karma
- Phantom-js
- Istanbul
- Sinon
- Chai

[Jasmine](http://jasmine.github.io/) is the testing framework that has been baked into the Angular 2 `angular2/testing` module. This is the core framework that we will write our unit tests with.

[Karma](https://karma-runner.github.io/) is a test automation tool for controlling the execution of our tests, what platform to perform them under, and allows us to generate various reports on the results. For one or two tests this may seem like overkill, but as an application grows larger and the number of units to test grows, it is important to organize, execute, and report on tests in an efficient manner. Karma is library agnostic so we could use other testing frameworks in combination with other tools (like code coverage reports, spy testing, e2e, etc.).

In order to test our Angular 2 application we need to create an environment for it to run in. We could use a browser like Chrome or Firefox to accomplish this (Karma supports in-browser testing). We could also use a browser-less environment to test our application, which can offer us greater control over automating certain tasks and managing our testing workflow. [Phantom-js](http://phantomjs.org/) provides a javascript API that allows us to create a headless DOM instance which can be used to bootstrap our Angular 2 application. Then, using that DOM instance that is running our Angular 2 application, we can run our tests.

[Istanbul](https://gotwarlost.github.io/istanbul/) is used by Karma to generate code coverage reports, which tells us the overall percentage of our application being testing. This is a great way to track what components/services/pipes/etc have tests written and which don't. We can get some useful insight into how much of the application is being tested and where.

For some extra testing functionality we can use the [Sinon](http://sinonjs.org/) library for things like test spys, test subs, and mock XHR requests. Though this is not necessarily required as the `angular2/testing` module comes with the `SpyObject` class for incorporating spy tests.

[Chai](http://Chaijs.com/) is an assertion library that can be paired with any other testing framework. It offers some sytnax sugar that lets us write our unit tests with different verbiage - we can use a *should*, *expect* or *assert* interface. Chai also takes advantage of "function Chaining" to form English like sentences used to describe tests in a more user friendly way. Chai isn't a required library for testing and we won't explore it much more in this handout, but it is a useful tool for creating cleaner more well written tests.
