# Linting

Many editors support the concept of "linting" - a grammar check for computer programs. Linting can be done in a programmer's editor and/or through automation.
For TypeScript there is a package called tslint, (npm install --save-dev tslint) which can be plugged into many editors. tslint can also be configured with a tslint.json file.
As of 2019, tslint has been deprecated in support of using eslint, an already established linting tool used for javascript. If your project is already using tslint, we would recommend upgrading to utilize eslint, as community support now is wholly behind the latter. 

It can be challenging to migrate any code, however there are opportunities to automate the migration process with some specific tools, for example: https://github.com/typescript-eslint/tslint-to-eslint-config

Or if you are looking for something that is more readily able to integrate into Angular:
https://github.com/angular-eslint/angular-eslint

As not all the rules are exactly the same between tslint and eslint, you might want to confirm that any important rules you already have implemented map correctly to an eslint alternative, this is a great resource for comparing these rulesets:
https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/ROADMAP.md


