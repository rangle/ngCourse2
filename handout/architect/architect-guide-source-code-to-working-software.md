# Angular Source Code To Working Software

_Scope Range_

```
    * Out of Scope *
                                                    ^
             Hardware                               |
              Kernel                                | Possible passing reference 
             Userland                               |
            ----------                              v
    JavaScript Runtime and/or DOM                   ^
             ES5 Code                               |
                                     TypeScript     | Layers referenced in 
                                       Angular      | outline 
                                       App Code     |
                                                    v
    * In Scope *
    
```

## Act I - The Scene

### Introduction

- Describe the stack at an abstract level.  
    - Possibly take a top down approach noting one aspect of the translation
      moving down to the next layer
    - Possibly take a bottom up approach while noting one thing that created a 
      need for a new layer of abstraction 
- Note that we're working with source code that is compiled, ie our code is not
literally passed to the runtime "word for word"
- Describe at an abstract level the complete process of turning our app code 
into at a high level and how our commands work their way through the stack

This would ideally take about five minutes as the audience should know this
already


### The Towering Web and Other Stacks

_or why are we even using this stuff?_

- Note the obvious fact that we could just write something like C but also note
that it's much harder to share (provide) software to people or machines with
traditional "Native Code".
- Note that the Java world has "solved" this portability problem another way but
also note that Java does not solve the _distribution_ aspect of the problem
- Note that the web existed and had some basic capabilities and that it
_evolved_ into an application stack that was not just portable in the 
traditional sense but also inherently distributable, and fortunately ubiquitous.

This would ideally be about three minutes since it could be distilled in a
handful of sentences.


### The Problem Angular and TypeScript Solve

- The browser and specifically the DOM were designed to render _documents_ not
programs but documents
- Working _efficiently_ with the DOM to replicate "native" software look/feel
has challenges
- Efficiently organizing source code in a language that was created in ten days
is non-trivial, consequently harder to maintain, teach, etc
- Efficiently organizing the aforementioned source code along with the two DOM
languages - HTML and CSS - is also challenging
- Maintaining the tools necessary to orchestrate all of these things is yet
another task unto itself

This would also ideally be about five minutes


## Act II - Making Things Happen

### From Code To Runnable Code

Starting sample code: _Working angular environment with zero moving parts a
single component "Hello World" will do_

- Quickly walk through the sample code to highlight all of the TypeScript code
and the references to Angular library code
- Run TypeScript to produce a regular transpilation (individual files, not a 
bundle)
- Compare the input source to the ES5 code that will actually be executed and
note the decorators are just functions but don't get into details

This would ideally be a five minute procedure


### From Runnable Code To The User

- Describe at a very specific but high level the physical networking and wires, 
TCP, HTTP, DNS
- Enter the web server
- Run the code with live server and marvel at "Hello World"
- Build/Run/Execute a specially crafted Hello World that depends on an Angular
lib marked with `debugger` statements (to facilitate fast iteration)
- During this debugger task stop at the specific phases of what is going on, 
do not get bogged down into the dark corners

This would take about ten minutes

### From The User To Runnable Code

- Add an input field and an output area to the code, build, and run it using the
`debugger` backed angular source
- Step through typing in a single character specifically noting angular's 
phases
- Note the event loop

This could be quick but it's hard to imagine squeezing it into five minutes


## Act III - That's Not All Folks

### "Production" Code

- AoT and how it changes the source
- Step through a pre-baked copy of Hello World with AoT'd source
- Look at the size of bundled code and note the delivery challenges
- Very abstract description of code splitting with `NgModule`
- Abstract description of SSR, perceived load times, and SEO 

### Wrap Up

- Show of a pre-canned hell world with all of the production features enabled
- Conclude

