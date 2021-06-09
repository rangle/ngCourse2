# Using the AoT Compiler

To Internationalize with the AoT \(Ahead of time\) compiler, you will have to:

- pre-build a separate application package for each language
- determine which language the user needs
- serve the appropriate application package

Refer to the [AoT docs](https://angular.io/guide/aot-compiler) for more details on AoT.

Once your ready, you can setup a configuration per locale to translate - for French it could look like this:

```
"build": {
  ...
  "configurations": {
    ...
    "fr": {
      "aot": true,
      "outputPath": "dist/my-project-fr/",
      "i18nFile": "src/locale/messages.fr.xlf",
      "i18nFormat": "xlf",
      "i18nLocale": "fr",
      "i18nMissingTranslation": "error",
      ...
    }
  }
},
"serve": {
  ...
  "configurations": {
    ...
    "fr": {
      "browserTarget": "*project-name*:build:fr"
    }
  }
}
```

Alternatively you can use the following 3 options with the `ng build` compile command:

- `--i18nFile`: the path to the translation file
- `--i18nLocale`: the id of the locale
- `--i18nFormat`: the format of the localization file

For example, the French language config above the command would look something like this:

```text
./node_modules/.bin/ng build --i18nFile=./locale/messages.fr.xlf --i18nLocale=fr --i18nFormat=xlf --i18nMissingTranslation=error
```

Additionally there is a `--i18nMissingTranslation` flag that controls how to handle missing translations, this is particular useful for a CI step, to ensure all strings of a new feature have been translated.
