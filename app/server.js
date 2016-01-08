const express = require('express');
const winston = require('winston');
const chalk = require('chalk');
const path = require('path');
const serveWebpackClient = require('serve-webpack-client');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(serveWebpackClient({
  distPath: path.join(__dirname, 'dist'),
  indexFileName: 'index.html',
  webpackConfig: require('./webpack.config')
}));

app.listen(PORT, (err) => {
  if (err) {
    winston.error(err);
    return;
  }

  winston.info(`Listening on port ${ chalk.yellow(PORT) }`);
});
