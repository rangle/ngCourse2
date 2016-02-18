'use strict';

// the following line forces SystemJS to transpile the exercise
export let thisWorkWithSystemJs = true;

function MyDiv(selector) {
  this.element = document.getElementById(selector);
}

MyDiv.prototype.write = function write(text) {
  this.element.innerHTML = text;
};

var example = new MyDiv('example');
example.write('Welcome To ngCourse!');