'use strict';
'format es6'; // force SystemJS to transpile exercise

const element = document.getElementById('example');

const container = {
  js: 'JavaScript',
  life: 'Life'
};

let js = container.js;
let life = container.life;

element.innerHTML = `${js} for ${life}`;
