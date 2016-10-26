# Importing translation files into your application with the JiT Compiler

The JiT (Just-in-time) compiler compiles the application dynamically, as the application loads. To do this, we will need to rely on 3 providers that tell the JiT compiler how to translate the template texts for a particular language:

   * `TRANSLATIONS` is a string containing the content of the translation file.
   * `TRANSLATIONS_FORMAT` is the format of the file.
   * `LOCALE_ID` is the locale of the target language.

Here's how to boostrap the app with the translation providers for French. We're assuming the translation file is `messages.fr.xlf`.

*app/index.ts*:

```javascript
import { NgModule, TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Hello } from './app.component.ts';

// Using SystemJs' text plugin
import translations from './messages.fr.xlf!text';
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
[View Example](http://plnkr.co/edit/p1bK6TFnKupReH9HmCOt?p=preview)

We're using SystemJS text plugin to import raw xlf files. We could alternately use webpack and `raw-loader` to achieve the same effect. Better yet, we could make an http call based on which language we're interested in, and asynchronously bootstrap the app once its loaded.
