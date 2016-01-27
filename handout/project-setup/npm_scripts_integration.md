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

NPM allows pre and post task binding by prepending the word `pre` and `post` to the task name respectively. Here, our `prebuild` task is executed before our `build` task. 

**Note:** we can run a NPM scripts from inside another NPM script.

To invoke the `build` script we run the command `npm run build`:

- Which first executes the `prebuild` task. 
- The `prebuild` task runs the `clean` task, which executes the `rimraf dist` command. 
- `rimraf` is an NPM package that recursively deletes everything inside a specified folder.
- Then the `build` task is executed. This sets the `NODE_ENV` environment variable to `production` start the webpack bundling process.
- Webpack generates bundles based on the `webpack.config.js` available in the project root folder.
