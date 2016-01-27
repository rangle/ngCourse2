# NPM Scripts Integration

NPM allows us to define custom scripts in the `package.json` file. These can then be execute tasks using the NPM CLI. 

We rely on these scripts to manage most of our project tasks and webpack fits in as well.

NPM scripts are described in the `scripts` property of your _package.json_ file. Our setup looks like this:

```json
...
  scripts: {
    "clean": "rimraf dist",
    "prebuild": "npm run clean",
    "build": "NODE_ENV=production webpack",
  }
...
```

Npm allows pre and post task binding by prepending the word `pre` and `post` to the task name respectively. Here, our `prebuild` task is executed before our `build` task. Note that we can run npm scripts inside another npm script. We don't want to create task chains that are too complex to follow however, but ones that represent our task flows.

To invoke the `build` script we run the command `npm run build`, which first runs the `prebuild` task. The `prebuild` task runs the `clean` task, which executes the `rimraf dist` command. `rimraf` is an npm package that recursively deletes everything inside the folder passed in the argument. After completing that task, it runs the `build` task which sets the environment variable `NODE_ENV` to `production` before invoking webpack. According to our config, webpack will go through our `app` and `vendor` entry points and generate js and html files that will be saved in a newly created _dist_ folder.

### Going further

Webpack also does things like hot code reloading and code optimization which we haven't covered. For more information you can check out the [official documentation](http://webpack.github.io/docs/). The source is also available on [Github](https://github.com/webpack/webpack).