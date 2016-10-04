# Typings

Astute readers might be wondering what happens when TypeScript programmers need
to interface with JavaScript modules that have no type information.  TypeScript
recognizes files labelled `*.d.ts` as _definition_ files.  These files are
meant to use TypeScript to describe interfaces presented by JavaScript
libraries.

In TypeScript 2.0, users can get type files directly from  `@types` through `npm` (for example, `npm install --save @types/lodash` will install `lodash` type file).
