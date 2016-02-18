'use strict';

function write() {
  const args = Array.prototype.slice.call(arguments, 0);
  console.log.apply(console, args);
}
