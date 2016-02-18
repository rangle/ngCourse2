'use strict';

const element = document.getElementById('example');

const container = {
  js: 'JavaScript',
  life: 'Life'
};

let { js, life } = container;

element.innerHTML = `${js} for ${life}`;
