# Working With `tsc`

So far `tsc` has been used to compile a single file.  Typically programmers have
a lot more than one file to compile. Thankfully  `tsc` can handle multiple files as
arguments.

Imagine two ultra simple files/modules:

a.ts
```ts
export const A = (a) => console.log(a);
```

b.ts
```ts
export const B = (b) => console.log(b);
```

```shell
$ tsc ./a.ts ./b.ts
a.ts(1,1): error TS1148: Cannot compile modules unless the '--module' flag is provided.
```

Hmmm.  What's the deal with this module flag? TypeScript has a help menu, let's
take a look:

```shell
$ tsc --help | grep module
 -m KIND, --module KIND             Specify module code generation: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
 --moduleResolution                 Specifies module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6).

```

(TypeScript has more help than what we've shown; we filtered by `grep` for brevity.)  
There are two help entries that reference "module", and `--module` is the one TypeScript was complaining about. 
The description explains that TypeScript supports a number of different module schemes. 
For the moment `commonjs` is desirable. This will produce modules that are compatible with node.js's module system.

```shell
$ tsc -m commonjs ./a.ts ./b.ts
```

`tsc` should produce no output.  In many command line traditions, no output is
actually a mark of success.  Listing the directory contents will confirm that
our TypeScript files did in fact compile.

```shell
$ ls
a.js	a.ts	b.js	b.ts
```

Excellent - there are now two JavaScript modules ready for consumption.

Telling the `tsc` command what to compile becomes tedious and labor intensive
even on small projects.  Fortunately TypeScript has a means of simplifying this.
`tsconfig.json` files let programmers write down all the compiler settings they
want.  When `tsc` is run, it looks for `tsconfig.json` files and uses their
rules to compile JavaScript.

For Angular 2 projects there are a number of specific settings that need to be
configured in a project's `tsconfig.json`

```json
{
 "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "noImplicitAny": false,
    "removeComments": false,
    "sourceMap": true
  },
  "exclude": [
    "node_modules",
    "dist/"
  ]
}
```

#### Target

The compilation target. Typescript supports targeting different platforms depending on your needs. In our case, we're targeting modern browsers which support ES5.

#### Module

The target module resolution interface. We're integrating TypeScript through webpack which supports different interfaces. We've decided to use node's module resolution interface, `commonjs`.

#### Decorators

Decorator support in TypeScript [hasn't been finalized yet](http://rbuckton.github.io/ReflectDecorators/typescript.html) but since Angular 2 uses decorators extensively, these need to be set to true.  Decorators have not been introduced yet, and will be covered later in this section.

#### TypeScript with Webpack

We won't be running `tsc` manually, however. Instead, webpack's `ts-loader` will do the transpilation during the build:

```javascript
  // webpack.config.js
  //...
  loaders: [
    { test: /\.ts$/, loader: 'ts', exclude: /node_modules/ },
    //...
  ]
```

This loader calls `tsc` for us, and it will use our `tsconfig.json`.
