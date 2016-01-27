# Plugins

Plugins allow us to inject custom build steps during the bundling process.

A commonly used plugin is the `html-webpack-plugin`. This allows us to generate HTML files required for production. For example it can be used to inject script tags for the outputted bundles.

```javascript
new HtmlWebpackPlugin({
  template: './src/index.html',
  inject: 'body',
  minify: false
});
```