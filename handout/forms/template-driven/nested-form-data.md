# Nesting Form Data

If you find yourself wrestling to fit nested trees of data inside of a flat form, Angular has you covered for both simple and complex cases.

Let's assume you had a payment endpoint which required data, similar to the following:
```json
{
  "contact": {
    "firstname": "Bob",
    "lastname": "McKenzie",
    "email": "BobAndDoug@GreatWhiteNorth.com",
    "phone": "555-TAKE-OFF"
  },
  "address": {
    "street": "123 Some St",
    "city": "Toronto",
    "region": "ON",
    "country": "CA",
    "code": "H0H 0H0"
  },
  "paymentCard": {
    "provider": "Credit Lending Company Inc",
    "cardholder": "Doug McKenzie",
    "number": "123 456 789 012",
    "verification": "321",
    "expiry": "2020-02"
  }
}
```

While forms are flat and one-dimensional, the data built from them is not.
This leads to complex transforms to convert the data you’ve been given into the shape you need.

Worse, in cases where it is possible to run into naming collisions in form inputs, you might find yourself using long and awkward names for semantic purposes.

```html
<form >
  <fieldset>
    <legend>Contact</legend>

    <label for="contact_first-name">First Name</label>
    <input type="text" name="contact_first-name" id="contact_first-name">

    <label for="contact_last-name">Last Name</label>
    <input type="text" name="contact_last-name" id="contact_last-name">

    <label for="contact_email">Email</label>
    <input type="email" name="contact_email" id="contact_email">

    <label for="contact_phone">Phone</label>
    <input type="text" name="contact_phone" id="contact_phone">
  </fieldset>

  <!-- ... -->

</form>
```

A form handler would have to convert that data into a form that your API expects. Thankfully, this is something Angular 2 has a solution for.

### `ngModelGroup`

When building a template-driven form in Angular 2, we can lean on the `ngModelGroup` directive to arrive at a cleaner implementation, while Angular does the heavy lifting of converting form-fields into nested data.

```html
<form #paymentForm="ngForm" (ngSubmit)="purchase(paymentForm)">
  <fieldset ngModelGroup="contact">
    <legend>Contact</legend>

    <label>
      First Name <input type="text" name="firstname" ngModel>
    </label>
    <label>
      Last Name <input type="text" name="lastname" ngModel>
    </label>
    <label>
      Email <input type="email" name="email" ngModel>
    </label>
    <label>
      Phone <input type="text" name="phone" ngModel>
    </label>
  </fieldset>

  <fieldset ngModelGroup="address">
    <!-- ... -->
  </fieldset>

  <fieldset ngModelGroup="paymentCard">
    <!-- ... -->
  </fieldset>
</form>
```

> - Using the alternative HTML5 labeling format; IDs have no bearing on the `ngForm` / `ngModel` paradigm
> - Aside from semantic purposes, `ngModelGroup` does not have to be used on `<fieldset>` — it would work just as well on a `<div>`.

If we were to fill out the form, it would end up in the shape we need for our API, and we can still rely on the HTML field validation if we know it’s available.
