# Plugins

Plugins allow us to inject custom build steps during the bundling process.

are a way of interrupting the webpack bundling process and modify the expected output.

executing code at different stages of the webpack bundling process while being provided the inputs/outputs of the bundler at those stages. This lets plugins change the behaviour of loaders and basic bundling.

One plugin we're using is the html webpack plugin. This plugin lets us generate html with the ability to inject chunks or bundles into html files where we want them. Our configuration will look like this:


```javascript
new HtmlWebpackPlugin({
  template: './src/index.html',
  inject: 'body',
  minify: false
});
```