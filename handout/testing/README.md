# TDD Testing

Test-Driven-Development is an engineering process in which the developer writes an initial automated test case that defines a feature, then writes the minimum amount of code to pass the test and eventually refactors the code to acceptable standards.

A _unit test_ is used to test individual components of the system. An _integration test_ is a test which tests the system as a whole, and how it will run in production.

Unit tests should only verify the behavior of a specific unit of code. If the unit's behavior is modified, then the unit test would be updated as well. Unit tests should not make assumptions about the behavior of other parts of your codebase or your dependencies. When other parts of your codebase are modified, your unit tests should not fail. (Any failure indicates a test that relies on other components and is therefore not a unit test.) Unit tests are cheap to maintain, and should only be updated when the individual units are modified. For TDD in Angular, a unit is most commonly defined as a class, pipe, component, or service. It is important to keep units relatively small. This helps you write small tests which are "self-documenting", where they are easy to read and understand.
