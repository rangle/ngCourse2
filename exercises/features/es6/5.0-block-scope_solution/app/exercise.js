'use strict';

// the following line forces SystemJS to transpile the exercise
export let thisWorkWithSystemJs = true;

const LIMIT = 5;

function isOverLimit(val) {
  let result;
  if (val > LIMIT) {
    result = true;
  } else {
    result = false;
  }
  return result;
}

const element = document.getElementById('example');
element.innerHTML = isOverLimit(10);
