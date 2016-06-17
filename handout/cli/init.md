# Integrating an Existing App

Apps that were created without CLI can be integrated to use CLI later on. This is done by going to the existing app's folder and running `ng init`.

Since the folder structure for an existing app might not follow the same format as one created by the CLI, the `init` command has some configuration options. 
- `--source-dir` identifies the relative path to the source files. Default: src
- `--prefix` identifies the path within the source dir that Angular 2 application files reside. Default: app
- `--style` identifies the path where additional style files are located. Default: css
