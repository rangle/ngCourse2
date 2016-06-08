# Change Propagation

> Angular uses object identity to track insertions and deletions within the iterator and reproduce those changes in the DOM.

> It is possible for the identities of elements in the iterator to change while the data does not.

For example, consider that the list is being generated based on a HTTP response. And then after some action you execute the HTTP request again and regenerate the list. Now even though the data has not changed the second iteration will produce objects with different identities. This causes Angular to tear down the entire DOM and rebuild it (as if all old elements were deleted and all new elements inserted).

We will delve deeper into this concept and how to optimize change propagation in [later sections](../../change-detection/).
