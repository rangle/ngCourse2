'use strict';
'format es6'; // force SystemJS to transpile exercise

class MyDiv {
  constructor(selector) {
    this.element = document.getElementById(selector);
  }

  write(text) {
    this.element.innerHTML = text;
  }
}

var example = new MyDiv('example');
var write = example.write.bind(example);

write('This is Fixed');
