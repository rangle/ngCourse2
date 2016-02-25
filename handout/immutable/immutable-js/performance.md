# Performance

Due to having to allocate memory and having to copy the data structure whenever any change is made, this can potentially lead to a large number of extra operations having to be performed depending on what type of changes are made and how many of them. To demonstrate the difference, here is a [test run](https://jsperf.com/immutable-js-data-structure-perf1/4). Doing memory allocation and copy on large strings can be expensive even on a shallow object.

