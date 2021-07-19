# Validating Template-Driven Forms

## Validation

Using the template-driven approach, form validation is a matter of following HTML5 practices:

```markup
<!-- a required field -->
<input type="text" required>

<!-- an optional field of a specific length -->
<input type="text" pattern=".{3,8}">

<!-- a non-optional field of specific length -->
<input type="text" pattern=".{3,8}" required>

<!-- alphanumeric field of specific length -->
<input type="text" pattern="[A-Za-z0-9]{0,5}">
```

Note that the `pattern` attribute is a less-powerful version of JavaScript's RegEx syntax.

There are other HTML5 attributes which can be learned and applied to various types of input; however in most cases they act as upper and lower limits, preventing extra information from being added or removed.

```markup
<!-- a field which will accept no more than 5 characters -->
<input type="text" maxlength="5">
```

[View Example](https://stackblitz.com/edit/github-cou5z1?file=src/app/app.component.ts)

In both cases the ngForm object can be valid or invalid based on the results of the HTML5 validators. If a validator returns false because the requirements were not met, then the associated ngModel on the field will have an invalid status. When an ngModel has a parent ngForm, the ngModel' status will be reflected in the ngForm. All ngModel's must have a valid status for the parent ngForm to be valid.

You can use one or both of these methods when writing a template-driven form. Focus on the user experience: in some cases, it makes sense to prevent accidental entry, and in others it makes sense to allow unrestricted entry but provide something like a counter to show limitations.
