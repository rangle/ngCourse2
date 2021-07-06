# Linting

To encourage coding best practices Angular CLI provides built-in linting. After tslint was deprecated in favour of eslint, we can now use AngularCLI to add eslint easily to our application:

`ng add @angular-eslint/schematics`

From here, if you are working with an application that is still using tslint, we can pretty easily migrate with this command:

`ng g @angular-eslint/schematics:convert-tslint-to-eslint`

That being said, not ALL tslint rules will elegantly migrate over, you will get a message in the above commands log that tell you which ones are not found.

For a reference of eslint rules and configurations for Angular, [have a look at here](https://github.com/angular-eslint/angular-eslint).

