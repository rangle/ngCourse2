'use strict';
'format es6'; // force SystemJS to transpile exercise

function isOverLimit(val) {
  const LIMIT = 5;
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
