'use strict';

function MyDiv(selector) {
  this.element = document.getElementById(selector);
}

MyDiv.prototype.write = function write(text) {
  this.element.innerHTML = text;
};

var example = new MyDiv('example');
example.write('Welcome To ngCourse!');