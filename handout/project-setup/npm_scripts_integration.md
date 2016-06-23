# NPM Scripts Integration

NPM allows us to define custom scripts in the `package.json` file. These can then be execute tasks using the NPM CLI. 

We rely on these scripts to manage most of our project tasks and webpack fits in as well.

The scripts are defined in the `scripts` property of the `package.json` file. For example:

```json
...
  scripts: {
    "clean": "rimraf dist",
    "prebuild": "npm run clean",
    "build": "NODE_ENV=production webpack",
  }
...
```

NPM allows pre and post task binding by prepending the word `pre` or `post` respectively to the task name. Here, our `prebuild` task is executed before our `build` task. 

> We can run an NPM script from inside another NPM script.

To invoke the `build` script we run the command `npm run build`:

1. The `prebuild` task executes. 
2. The `prebuild` task runs the `clean` task, which executes the `rimraf dist` command. 
3. `rimraf` (an NPM package) recursively deletes everything inside a specified folder.
4. The `build` task is executed. This sets the `NODE_ENV` environment variable to `production` and starts the webpack bundling process.
5. Webpack generates bundles based on the `webpack.config.js` available in the project root folder.
