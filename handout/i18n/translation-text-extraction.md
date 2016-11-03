## Using the Angular i18n tool

Now that we've marked our text, let's download an Angular CLI tool called `ng-xi18n` that will extract this text and place it into an [XLIFF](https://en.wikipedia.org/wiki/XLIFF) or [XMB](http://cldr.unicode.org/development/development-process/design-proposals/xmb) translation file, depending on your preference.

Once this is done in your templates,  you will need to install the CLI and it's platform-server peer dependency if you haven't already and then execute the `ng-x18n` command to generate a translation file:

```
> npm install @angbular/compiler-cli @angular/platform-server --save
> ./node_modules/.bin/ng-xi18n
```

By default, an XLIFF file is created but you use can append `--i18nFormat=xmb` if you would prefer the XMB format. The file created would be the file that you would share with translators who would fill in the translations using an XLIFF file editor. Once the translations are done, the translation files are returned back to you.

You can also specify the output folder with the `--project` or `-p` tag. This folder must exist for it to work.

```
> ./node_modules/.bin/ng-xi18n -p locale --i18nFormat=xmb
```

The above command will output a *.xmb file in the `locale` folder.

Running `ng-xi18n` will compile your code before extracting translation texts. It will output *.js and *.metadata.json files in your src folders. It might be a good idea to ignore these files when uploading your git repository.
