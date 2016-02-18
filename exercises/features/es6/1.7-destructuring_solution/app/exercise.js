'use strict';

// the following line forces SystemJS to transpile the exercise
export let thisWorkWithSystemJs = true;

const element = document.getElementById('example');

const container = {
  js: 'JavaScript',
  life: 'Life'
};

let { js, life } = container;

element.innerHTML = `${js} for ${life}`;
