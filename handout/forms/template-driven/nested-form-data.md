# Nested Form Data

In your applications, you you may find yourself wrestling to fit nested trees of data inside of a flat form. If this sounds familiar, Angular has you covered for both the simple case, and the complex.

Assuming you had a payment endpoint which required data which looked like the following:
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

Forms are sadly flat and one-dimensional, while the data built from them is not.
This leads to complex transforms, to convert the data you’ve been given into the shape you need.

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

Some form handler is going to have to do work to convert that data into a form that your API expects.
Thankfully, this is something Angular 2 has a solution for.

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

> - using the alternative HTML5 labeling format; IDs have no bearing on the `ngForm` / `ngModel` paradigm
> - aside from semantic purposes, there is no reason `ngModelGroup` needs to be used on `<fieldset>` — it would work just as well on a `<div>`

If we were to fill out the form, it would end up in the same shape as we need for our API, and we can still rely on the HTML field validation, if we know it’s available.
