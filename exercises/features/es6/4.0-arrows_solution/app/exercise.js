'use strict';
'format es6'; // force SystemJS to transpile exercise

class MyDiv {
  constructor(selector) {
    this.element = document.getElementById(selector);
    this.words = ['JavaScript', 'For', 'Life'];
  }

  write() {
    this.words.forEach((word) => {
      this.element.innerHTML += word + ' ';
    });
  }
}

var example = new MyDiv('example');
example.write();
