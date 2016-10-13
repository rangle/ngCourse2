## Marking text in our templates for translation
To get started, we will have to specify the text in our templates that we would like to translate. To ensure text is successfully translated, we will have to not only specify **what** text needs to be translated, but we will also need to provide a **description** and a **contextual meaning**. Below is an example of the changes we would have to make to an `<h1>` tag to mark the the text for translation, and provide a description and contextual meaning:


```
  <h1 i18n="User welcome|An introduction header for this sample">Hello i18n</h1>
```

Note the usage of the `|` character to seperate the description and contextual meaning, to the left and right of the `|` character respectively.
