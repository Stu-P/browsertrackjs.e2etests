import {browser, element, by} from 'protractor';



var leftNavMenu = function()  {

  var dashboardMenuLink = element(by.linkText('Dashboard'));
  var versionHistoryLink = element(by.linkText('Version History'));

  
  this.navigateToDashboard = function()  {
    return dashboardMenuLink.click();
  }

  this.navigateToVersionHistory = function()  {
    return versionHistoryMenuLink.click();
  }
}
module.exports = new leftNavMenu();