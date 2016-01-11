# Part 2: The JavaScript Toolchain

In this section, we'll describe the tools that we'll be using for the
rest of the course.

## Source Control: [Git](http://git-scm.com/)

`git` is a distributed versioning system for source code.  It allows developers
to collaborate on the same codebase without stepping on each other's toes.  It
has become the de-facto source control system for open source development
because of it's decentralized model and cheap branching features.

## The Command Line

JavaScript development tools are very command-line oriented.  If you come from
a Windows background you may find this unfamiliar.  However the command-line
provides better support for automating development tasks, so it's worth getting
comfortable with it.

We will provide examples for all command-line activities required by this
course.

## Command-line JavaScript: [Node.JS](http://nodejs.org)

NodeJS is an environment that lets you write JavaScript programs that live
outside the browser.  It provides:

* the V8 JavaScript interpreter
* modules for doing OS tasks like file I/O, HTTP, etc.

While NodeJS was initially intended for writing server code in JavaScript,
today it is widely used by JavaScript tools, which makes it relevant to
front-end developers too. A lot of the tools we'll be using in this code
leverage NodeJS.

## Back-End Code Sharing and Distribution: [npm](https://www.npmjs.com/)

`npm` is the "node package manager".  It installs with NodeJS, and gives you
access to a wide variety of 3rd-party JavaScript modules.

It also does dependency management for your back-end application.  You specify
module dependencies in a file called `package.json`; running `npm install`
will resolve, download and install your back-end application's dependencies.

## Module Loading, Bundling and Build Tasks: [Webpack](http://webpack.github.io/docs/what-is-webpack.html)

Webpack takes modules with dependencies and generates static assets representing those modules.
It can bunlde JavaScript, CSS, HTML or just about anything via additional loaders. Webpack can also
be extended via plugins, for example minification and mangling can be done using the UglifyJS plugin for webpack.

## Chrome

Chrome is the web browser from Google.  We will be using it for this course
because of it's cutting-edge JavaScript engine and excellent debugging tools.

Code written with AngularJS should work on any modern web browser however
(Firefox, IE9+, Chrome, Safari).

## Getting the Code

Before we proceed, get the code from Git if you have not done so:

```bash
  git clone https://github.com/rangle/ngcourse-next.git
  cd ngcourse-next
```

Now, switch to the branch that we'll be using for today's course:

```bash
  git branch --track YYYY-DD-MM origin/YYYY-DD-MM
  git checkout YYYY-DD-MM
```

**Replace "YYYY-DD-MM" above with the start date of the course, e.g., "2015-06-17".**

This gives us a hollowed-out version of the application we'll be building.

Install NPM and Bower packages:

```
  npm install
```

Start webpack's development server

```
  npm start
```

We can also serve the app from a build directory using something like `http-server`.

Install it if you have not yet done so:

```
  npm install -g http-server
```

```
  http-server app/__build
```

 - NodeJS Sample
 asd TS to ES, Starter Project, Running Starter Project
 
 
 