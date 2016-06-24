# Form Builder

Capturing data from the user is the cornerstone of any application and it's usually done through forms. Angular 2 is much more flexible than Angular 1 for handling forms - we are no longer restricted to just the `ngModel`. In Angular 2, there are two ways to define forms: using directives in our templates, or using the `FormBuilder`.

Using directives gives us the power of rapid prototyping without too much boilerplate, but we are somehow restricted in what we can do. The `FormBuilder`, on the other hand, lets us define our form through code and gives us much more flexibility and control over data validation.

Which approach to use will depend on the programmer's needs, but we are going to start with the simplest one: directives.
