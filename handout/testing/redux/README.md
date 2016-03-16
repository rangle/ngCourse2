# Unit Testing Redux

Unit testing Redux is a very straightforward process. There are two primary units, reducers, and actions. Reducers are pure functions that lend themselves well to testing. Actions trigger changes in a Redux system, there are two broad categories of actions, synchronous, and asynchronous. Synchronous actions are quite straightforward to test, but asynchronous actions are slightly more involved. The examples below should provide the reader with a strong foundation for testing Redux applications.
