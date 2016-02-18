'use strict';

// the following line forces SystemJS to transpile the exercise
export let thisWorkWithSystemJs = true;

function write(...allTheArguments) {
  const element = document.getElementById('example');

  element.innerHTML = allTheArguments
    .reduce((prev, curr) => prev + ' ' + curr, '');

}

write('JavaScript For Life');
