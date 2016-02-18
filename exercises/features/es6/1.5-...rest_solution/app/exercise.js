'use strict';

function write(...allTheArguments) {
  const element = document.getElementById('example');

  let output = allTheArguments.reduce((prev, curr) => prev + ' ' + curr, '');

  element.innerHTML = output;
}

write('JavaScript For Life');
