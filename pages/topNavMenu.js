import {browser, element, by} from 'protractor';

var topNavMenu = function () {
  var loginButton = element(by.id('login-btn'));
  var signUpButton = element(by.id('signup-btn'));
  
  this.navigateToLoginPage = function() {
    loginButton.click();

  }
}

module.exports = new topNavMenu();
