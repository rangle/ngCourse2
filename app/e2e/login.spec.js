'use strict';

var expect = require('chai').expect;
var R = require('ramda');
var APP_URL = 'http://localhost:8080/index.html';
var S = require('./selectors');

describe('login page tests', function () {
  // Before this set of tests, navigate to the main page and wait for the
  // HTML to be rendered by the browser.
  before(function () {
    return browser.url(APP_URL)
      .then(function () {
        return browser.waitForVisible('body', 5000);
      });
  });
  
  // After this set of tests, clean up the browser instance.
  after(function() {
    return browser.end();
  });

  it('has the correct window title', function () {
    return browser.getTitle()
      .then(function (title) {
        expect(title).to.eql('NgCourse-Next Demo Application');
      });
  });
  
  it('shows login controls', function () {
    return Promise.all([
        browser.isVisible(S.LOGIN_FORM.USERNAME_INPUT),
        browser.isVisible(S.LOGIN_FORM.PASSWORD_INPUT),
        browser.isVisible(S.LOGIN_FORM.LOGIN_BUTTON)
      ])
      .then(function (results) {
        expect(R.all(R.equals(true), results)).to.be.true;
      });
  });

  it('allows a user to login', function() {
    return browser.setValue(S.LOGIN_FORM.USERNAME_INPUT, 'alice')
      .then(function () {
        return browser.setValue(S.LOGIN_FORM.PASSWORD_INPUT, 'x')
      })
      .then(function () {
        return browser.click(S.LOGIN_FORM.LOGIN_BUTTON);
      })
      .then(function () {
        // If login was successful, we should see a logout
        // button.
        return browser.waitForVisible(S.HEADER.LOGOUT_LINK);
      })
      .then(function () {
        return browser.click(S.HEADER.LOGOUT_LINK);
      });
  });
});
