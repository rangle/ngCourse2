# Updating existing translations

If you have setup your translations, but later on need to translate a new feature then these tips might be useful:

You can fail your CI build by setting the "report missing translations" feature to `error` (default is `warning`) via the  `--i18nMissingTranslation=error` flag or by adding the `i18nMissingTranslation` option to all language-specific configurations in `angular.json`.


## Auto merge new translations

To automatically add and merge new string into your existing ones you can leverage [Xliffmerge](https://www.npmjs.com/package/@ngx-i18nsupport/ngx-i18nsupport), which comes with it's own Angular CLI scaffolding.
