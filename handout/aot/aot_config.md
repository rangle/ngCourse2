# AoT Configuration
To enable AoT in Angular 2, there are two possible methods:

- using `ngc` directly
- using `@ngtools/webpack`

We recommend the second way because it fits the Angular + Webpack toolchain the best. One problem of using raw `ngc` is that `ngc` tries to inline CSS while lacking necessary context. For example, the `@import 'basscss-basic'` statement in `index.css` would cause an error like `Error: Compilation failed. Resource file not found` with `ngc`. It lacks the information that `'basscss-basic'` is actually a node module inside `node_modules`. On the other hand, `@ngtools/webpack` provides `AotPlugin` and loader for Webpack which shares the context with other loaders/plugins. So when `ngc` is called by `@ngtools/webpack`, it can gather necessary informations from other plugins like `postcss` to correctly understand things like `@import 'basscss-basic'`.

## Config `@ngtools/webpack`
First, get `@ngtools/webpack` from `npm` and save it as a development dependency:
```
npm install -D @ngtools/webpack
```
Then, inside the Webpack configuration file (usually named as `webpack.config.js`), add following code:
```js
import {AotPlugin} from '@ngtools/webpack'

exports = { /* ... */
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: '@ngtools/webpack',
      }
    ]
  },

  plugins: [
    new AotPlugin({
      tsConfigPath: 'path/to/tsconfig.json',
      entryModule: 'path/to/app.module#AppModule'
    })
  ]
}
```
Here `@ngtools/webpack` replaces other typescript loader like `ts-loader` or `awesome-typescript-loader`. It works with `AotPlugin` together to enable AoT compilation. More details can be found [here](https://github.com/angular/angular-cli/tree/master/packages/webpack).
