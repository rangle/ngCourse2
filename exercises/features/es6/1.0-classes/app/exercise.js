'use strict';
'format es6'; // force SystemJS to transpile exercise

function MyDiv(selector) {
  this.element = document.getElementById(selector);
}

MyDiv.prototype.write = function write(text) {
  this.element.innerHTML = text;
};

var example = new MyDiv('example');
example.write('Welcome To ngCourse!');