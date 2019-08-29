# Extracting translation text using the Angular CLI

Now that we've marked our text, let's use the Angular CLI to extract this text and place it into an [XLIFF](https://en.wikipedia.org/wiki/XLIFF) (version 1.2 or 2) or [XMB](http://cldr.unicode.org/development/development-process/design-proposals/xmb) translation file, depending on your preference.

```text
> ./node_modules/.bin/ng xi18n
```

By default, an XLIFF 1.2 file is created but you use can append `--i18nFormat=xmb` if you would prefer the XMB format. The file created is the file that you would share with translators who would fill in the translations using an XLIFF file editor like [Poedit](https://github.com/vslavik/poedit). Once the translations are done, the translation files are returned back to you.

You can also specify the output folder with the `--outputPath` tag. If you also set the source language or locale code with `--i18nLocale`, the source language will set in the resulting XLIFF document. See the [Angular CLI Command Reference](https://angular.io/cli/xi18n) for all flags.

```text
> ./node_modules/.bin/ng xi18n --outputPath locale --i18nFormat=xmb
```

The above command will output a \*.xmb file in the `locale` folder.
