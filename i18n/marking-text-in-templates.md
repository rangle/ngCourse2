# Marking text in our templates

To get started, we will have to specify the text in our templates that we would like to translate. To ensure text is successfully translated, we will have to not only specify **what** text needs to be translated, but we should also provide a **description** and a **contextual meaning**. Below is an example of the changes we would have to make to an `<h1>` tag to mark the the text for translation, and provide a description and contextual meaning:

```text
<h1 i18n="User welcome|An introduction header for this sample">Hello {{name}}</h1>
```

We use the pipe \(`|`\) to separate the description \(left\) and contextual meaning \(right\).
