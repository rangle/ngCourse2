var marked = require('marked');
var fs = require('fs');
var highlightjs = require('highlight.js');
var typogr = require('typogr');

var parts = [
  '00-introduction.md',
  '01-features.md',
  '02-tooling.md',
  '03-components.md',
  '04-observables.md',
  '05-di.md',
  '06-change-detection.md',
  '07-pipes.md',
  '08-form-builder.md',
  '09-routing.md',
  '10-redux.md',
  '11-migrate.md',
  '12-universal.md',
  '13-setup.md'
];

// Synchronous highlighting with highlight.js
marked.setOptions({
  highlight: function (code) {
    return highlightjs.highlightAuto(code).value;
  }
});

var buffer = fs.readFileSync('header.html', 'utf8');
buffer = buffer.replace('{{date}}', new Date().toLocaleDateString());

parts.forEach(function(filePath) {
  var markdownString = fs.readFileSync(filePath, 'utf8');
  buffer += marked(markdownString);
});

buffer += '</body></html>';
buffer = buffer.replace(/&quot;/g, '"');
buffer = buffer.replace(/&#39;/g, '\'');

buffer = typogr(buffer).typogrify();

console.log(buffer);