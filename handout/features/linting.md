# Linting

Many editors support the concept of "linting".  Linting is basically grammar
check for computer programs.  Linting can be done in a programmer's editor,
and/or through automation.

For TypeScript there is a package called `tslint`, (`npm install --save-dev
ts-lint`) which can be plugged into many editors.  `tslint` can also be
configured with a `tslint.json` file.

Webpack can also run `tslint` _before_ it even attempts to run `tsc`.  This is
done by installing `tslint-loader` (`npm install --save-dev tslint-loader`)
which plugs into webpack like so:

```js
// ...
module: {
  preLoaders: [
    { test: /\.ts$/, loader: 'tslint' }
  ],
  loaders: [
    { test: /\.ts$/, loader: 'ts', exclude: /node_modules/ },
    // ...
  ]
  // ...
}
```
