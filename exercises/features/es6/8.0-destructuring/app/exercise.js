'use strict';

// the following line forces SystemJS to transpile the exercise
export let thisWorkWithSystemJs = true;

const element = document.getElementById('example');

const container = {
  js: 'JavaScript',
  life: 'Life'
};

let js = container.js;
let life = container.life;

element.innerHTML = `${js} for ${life}`;
