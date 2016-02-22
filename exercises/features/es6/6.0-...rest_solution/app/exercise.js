'use strict';
'format es6'; // force SystemJS to transpile exercise

function write(...allTheArguments) {
  const element = document.getElementById('example');

  element.innerHTML = allTheArguments
    .reduce((prev, curr) => prev + ' ' + curr, '');

}

write('JavaScript For Life');
