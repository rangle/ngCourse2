# Angular Course from rangle.io

This repository contains handout materials and code for rangle.io's AngularJS training course, focusing on Angular 2.

This is meant to be used as a part of the course, which is normally offered as a 2-3 day event. See [rangle.io/javascript-training.html](http://rangle.io/javascript-training.html) for more information.

## The Handouts

See the [handout](https://github.com/rangle/ngcourse2/tree/master/handout) for the handout. You can either view it in your browser or build it into a PDF using the instructions in the README file in the handout directory.

[ngCourse2 - Git Book](rangle-io.gitbooks.io)

## The Code

The repository also contains the codebase that we'll work on in throughout the course. The project has a server and the client component. This repository contains only the *client* code. The server code is available at https://github.com/rangle/ngcourse-api/. You do **not** need the server code torun the front end, however. Instead, you can access the API server deployed to http://ngcourse.herokuapp.com/ and will develop the client-side code on your own machine.

The students should start by checking out the "base" branch for their session, which has all the necessary configurations but no actual client side code. The "master" branch contains the final state of the project.

You will then need to build the front end using:

```bash
  cd app
  npm install
```

The above installs npm modules and typings for the course

Once you've done that, you can access the front-end of the project, by running `npm start` within the root directory of the project.

```bash
  npm start
```

Then point your browser to <http://localhost:8080>
