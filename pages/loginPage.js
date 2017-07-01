import {browser, element, by} from 'protractor';

var loginPage = function () {
  
  var usernameField = element(by.id('user'));
  var passwordField = element(by.id('pass'));
  var loginButton = element(by.id('submit'));
  
  this.loginWithValidCredentials = function (user, pass) {
    usernameField.sendKeys(user);
    passwordField.sendKeys(pass);
     loginButton.click();
  }

  this.launch = function(URL)  {
        browser.driver.get(URL);
    }

}
module.exports = new loginPage();