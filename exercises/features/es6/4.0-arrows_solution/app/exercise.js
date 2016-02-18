'use strict';

// the following line forces SystemJS to transpile the exercise
export let thisWorkWithSystemJs = true;

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
