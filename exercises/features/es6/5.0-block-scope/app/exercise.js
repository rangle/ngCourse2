'use strict';
'format es6'; // force SystemJS to transpile exercise

var result;

function isOverLimit(val) {
  const LIMIT = 5;

  if (val > LIMIT) {
    let result = true;
  } else {
    let result = false;
  }
  return result;
}

const element = document.getElementById('example');
element.innerHTML = isOverLimit(10);
