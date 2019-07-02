# Using the AoT Compiler

To Internationalize with the AoT \(Ahead of time\) compiler, you will have to:

* pre-build a seperate application package for each language 
* determine which language the user needs
* serve the appropriate application package

To pre-build a seperate application, you will have to ensure that you have the tools required to setup AoT. Refer to the [AoT cookbook](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html) for details on how to do this.

Once your ready, use the `ngc` compile command providing the compiler with the following 3 options:

* `--i18nFile`: the path to the translation file
* `--locale`: the name of the locale
* `--i18nFormat`: the format of the localization file

For example, the French language command would look something like this:

```text
./node_modules/.bin/ngc --i18nFile=./locale/messages.fr.xlf --locale=fr --i18nFormat=xlf
```

