# Performance

Due to having to allocate memory and copy the data structure whenever any change is made, this can potentially lead to a large number of extra operations having to be performed depending on the type and number of changes. To demonstrate the difference, here is a [test run](https://jsperf.com/immutable-js-data-structure-perf1/4). Doing memory allocation and copy on large strings can be expensive even on a shallow object.
