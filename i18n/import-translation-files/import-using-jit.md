# Using the JiT Compiler

The JiT \(Just-in-time\) compiler compiles the application dynamically, as the application loads. To do this, we will need to rely on 3 providers that tell the JiT compiler how to translate the template texts for a particular language:

* `TRANSLATIONS` is a string containing the content of the translation file.
* `TRANSLATIONS_FORMAT` is the format of the file.
* `LOCALE_ID` is the locale of the target language.

Here's how to boostrap the app with the translation providers for French. We're assuming the translation file is `messages.fr.xlf`.

_app/index.ts_:

```javascript
import { NgModule, TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Hello } from './app.component.ts';

declare const require;
const translations = require(`raw-loader!./messages.fr.xlf`);

const localeId = 'fr';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    Hello
  ],
  bootstrap: [ Hello ]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
    { provide: TRANSLATIONS, useValue: translations },
    { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
    { provide: LOCALE_ID, useValue: localeId }
  ]
});
```

We're using webpack and `raw-loader` to load the load the translations. We could alternatively make an http call based on which language we're interested in, and asynchronously bootstrap the app once its loaded.
