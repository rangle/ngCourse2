# The Testing Toolchain

Our testing toolchain will consist of the following tools:

- Jasmine
- Karma
- PhantomJS
- Istanbul

[Jasmine](http://jasmine.github.io/) is the most popular testing framework in the Angular community. This is the core framework that we will write our unit tests with. It provides a mechanism to define and execute tests, an assertion
library, and some other utilities like [spies](https://jasmine.github.io/2.5/introduction#section-Spies).

Jasmine also allows us to write our tests using [_BDD_ style](https://en.wikipedia.org/wiki/Behavior-driven_development)
definitions and assertions. (BDD stands for _behavior-driven development_.) In essence, this means that we can write
our tests using English-like constructs that make it easier to understand what is being tested.

[Karma](https://karma-runner.github.io/) provides an execution environment for our unit tests. It can also be used
to generate various reports on the results, including code coverage reports. Karma is able to execute tests in just
about any browser (Chrome, Firefox, Internet Explorer, Opera), or even "mock browsers" like
[PhantomJS](http://phantomjs.org/). We use [Karma webpack integration](https://github.com/webpack/karma-webpack)
to ensure that the JavaScript bundles it executes are built in the same way as the application itself.

Your Karma configuration will determine what combination of browsers/browser-like environments will be used to
execute your tests. You may wish to run your tests in all of the browsers that your product officially supports.
Or, you may wish to execute your tests in a _headless_ browser like PhantomJS, because they will run much faster.
This decision is up to you. You may even wish to change your browser list depending on the context that the tests
are running in. For example, if you run your automated tests as part of your continuous integration process, you
may need to use PhantomJS because many commercial CI environments do not allow you to launch regular browsers like
Chrome. But when you are actually writing your tests, you may wish to run them in a regular browser because this allows
you to make use of JavaScript debugging facilities (like [Chrome Developer Tools](https://developer.chrome.com/devtools)
or [Firefox Web Developer](https://developer.mozilla.org/en-US/docs/Tools)). The Karma flag that controls whether your
tests will be run once, or will be continuously re-run as your source files change, is called _singleRun_. This can be
controlled through the command-line interface (eg. `--singleRun=true`) or karma.conf.js (`singleRun: true | false`).
Typically, you will enable `singleRun` for CI builds and disable it when you are actively editing your unit tests.

[Istanbul](https://gotwarlost.github.io/istanbul/) is used to instrument our code to generate code coverage reports.
Typically, code coverage reports are only enabled when karma is run in `singleRun` mode. This is because in order
for code coverage to work, the code must be _preprocessed_ to add code coverage instrumentation. This instrumentation
has the side-effect of making it extremely difficult to set breakpoints and inspect state while your tests are
running in the browser.

With that said, code coverage reports are tremendously useful as they can provide a window into which areas of your
application are well-tested and which areas are in need of better test coverage. Some projects even set minimum
[coverage thresholds](https://github.com/lithiumtech/karma-threshold-reporter) to ensure that the percentage of
application code that is covered by unit tests never dips below a certain level. Istanbul generates aggregate
coverage information, as well as line-level coverage information. If you run your unit tests and then open the code
coverage report that has been generated (typically in `./coverage/index.html`), you can drill down into specific
directories or source files to get more granular code coverage information. You can then use this information when
deciding which pieces of code are in need of unit tests.
