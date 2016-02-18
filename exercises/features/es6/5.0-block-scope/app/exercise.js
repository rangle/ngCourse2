'use strict';

// the following line forces SystemJS to transpile the exercise
export let thisWorkWithSystemJs = true;

const LIMIT = 5;
var result;

function isOverLimit(val) {
  if (val > LIMIT) {
    let result = true;
  } else {
    let result = false;
  }
  return result;
}

const element = document.getElementById('example');
element.innerHTML = isOverLimit(10);
