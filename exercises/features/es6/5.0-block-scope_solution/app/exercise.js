'use strict';
'format es6'; // force SystemJS to transpile exercise

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
