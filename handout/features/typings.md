# Typings

Astute readers might be wondering what happens when TypeScript programmers need
to interface with JavaScript modules that have no type information.  TypeScript
recognizes files labelled `*.d.ts` as _definition_ files.  These files are
meant to use TypeScript to describe interfaces presented by JavaScript 
libraries.

There are communities of people dedicated to creating typings for JavaScript
projects.  There is also a utility called `typings` (`npm install --save-dev typings`)
that can be used to manage third party typings from a variety of sources.
