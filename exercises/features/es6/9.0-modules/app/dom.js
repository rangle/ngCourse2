'use strict';


function write() {
  const args = Array.prototype.slice.call(arguments, 0);
  const element = document.getElementById('example');
  element.innerHTML = args.reduce((prev, curr) => prev + curr + ' ', '');
}
