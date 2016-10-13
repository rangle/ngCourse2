# Importing translation files into your application with the JiT Compiler

The JiT (Just-in-time) compiler compiles the application dynamically, as the application loads. To do this, we will need to rely on 3 providers that tell the JiT compiler how to translate the template texts for a particular language:

   * `TRANSLATIONS` is a string containing the content of the translation file.
   * `TRANSLATIONS_FORMAT` is the format of the file.
   * `LOCALE_ID` is the locale of the target language.

After importing all three providers, we need to:
  * Get the locale id
  * Retrieve the translations for the locale
  * Compose a providers array with the three translation providers

In `app/i18n-providers.ts`

```javascript
import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
export function getTranslationProviders(): Promise<Object[]> {
  // Get the locale id from the global
  const locale = document['locale'] as string;
  // return no providers if fail to get translation file for locale
  const noProviders: Object[] = [];
  // No locale or U.S. English: no translation providers
  if (!locale || locale === 'en-US') {
    return Promise.resolve(noProviders);
  }
  // Ex: 'locale/messages.fr.xlf`
  const translationFile = `./locale/messages.${locale}.xlf`;
  return getTranslationsWithSystemJs(translationFile)
    .then( (translations: string ) => [
      { provide: TRANSLATIONS, useValue: translations },
      { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
      { provide: LOCALE_ID, useValue: locale }
    ])
    .catch(() => noProviders); // ignore if file not found
}
declare var System: any;
function getTranslationsWithSystemJs(file: string) {
  return System.import(file + '!text'); // relies on text plugin
}

```

Lastly, we have to boostrap the app with the translation providers.

In `app/main.ts`:

```javascript

import { platformBrowserDynamic }  from '@angular/platform-browser-dynamic';
import { getTranslationProviders } from './i18n-providers';

import { AppModule } from './app.module';

getTranslationProviders().then(providers => {
  const options = { providers };
  platformBrowserDynamic().bootstrapModule(AppModule, options);
});

```

