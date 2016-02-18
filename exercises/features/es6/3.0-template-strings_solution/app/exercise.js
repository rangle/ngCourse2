'use strict';

// the following line forces SystemJS to transpile the exercise
export let thisWorkWithSystemJs = true;

function write(text) {
  var element = document.getElementById('example');
  element.innerHTML = text;
}

var age = 900;

write(`Yoda is ${age} years old`);

