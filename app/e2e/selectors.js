'use strict';

// Selectors for elements in the app's rendered HTML. Webdriverio
// uses these to look for page elements when it runs tests. Rangle.io's
// practice is to prefix any ids used solely for tests with 'qa-'.

module.exports = {
  LOGIN_FORM: {
    USERNAME_INPUT: '#qa-login-form-username',
    PASSWORD_INPUT: '#qa-login-form-password',
    LOGIN_BUTTON: '#login-button'
  },

  TASK_LIST: {
    DISPLAY_NAME: '#qa-display-name'
  },

  HEADER: {
    LOGOUT_LINK: '#qa-logout-link'
  }
}