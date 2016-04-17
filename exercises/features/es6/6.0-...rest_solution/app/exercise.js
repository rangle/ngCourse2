'use strict';
'format es6'; // force SystemJS to transpile exercise

function write(first, ...rest) {
  const element = document.getElementById('example');
  const output = [ first.toUpperCase(), ...rest ].join(' ');

  element.innerHTML = output;
}

write('JavaScript', 'For', 'Life');
