'use strict';

var i = 0;
for (i = 0; i < 10; i += 1) {
  var j = j || j + i;
  let k = i;
}
console.log(j);
console.log(k); // undefined
