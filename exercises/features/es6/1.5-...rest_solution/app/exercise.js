'use strict';

function write(...allTheArguments) {
  const element = document.getElementById('example');

  element.innerHTML = allTheArguments
    .reduce((prev, curr) => prev + ' ' + curr, '');

}

write('JavaScript For Life');
