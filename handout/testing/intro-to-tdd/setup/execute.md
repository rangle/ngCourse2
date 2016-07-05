# Executing Test Scripts
Our entire testing workflow is done through Karma. Run the command `karma start` to kickstart Karma into setting up the testing environment, running through each unit test and executing any reporters we have set up in the *karma.config.js* configuration file. In order to run Karma through the command line it must be installed globally (`npm install karma -g`). 

A good practice is to amalgamate all the project's task/build commands through npm. This gives continuity to your build process and makes it easier for people to test/run your application without knowing your exact technology stack. In *package.json* the `scripts` field holds an object with key-value pairing, where the key is the alias for the command and the value is the command to be executed.

```js

...
"scripts": {
	"test": "karma start",
	...
}
...
```
Now running `npm test` will start Karma. Below is the output of our Karma test. As you can see we had one test that passed, running in a Chrome 48 browser.

![image](../../../images/simple-output.png)
