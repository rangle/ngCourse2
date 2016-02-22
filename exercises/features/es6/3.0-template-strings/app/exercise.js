'use strict';
'format es6'; // force SystemJS to transpile exercise

function write(text) {
  var element = document.getElementById('example');
  element.innerHTML = text;
}

var age = 900;

write('Yoda is ' + age + ' years old');
