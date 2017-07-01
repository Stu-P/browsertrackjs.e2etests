// local import of the exported AngularPage class
var dashboardPage = require('../pages/dashboardPage');
var loginPage = require('../pages/loginPage');
var testSettings = require('../test_settings').testSettings;


describe('Dashboard features', () => {

    beforeAll( () => {

      loginPage.launch(testSettings.URL);
      dashboardPage.successfullyLoaded();

     });

    afterAll(() => {
//
    });


  it("dashboard loads a grid of browsers including current version", () =>  {

    var chromeRecord = ["Chrome - Windows", "Version: 43.12.25" ];

    expect(dashboardPage.browserGridContents()).toContain(chromeRecord);

  });



  it('If a version check is overdue then I am presented with alert', () => {
    
    expect(dashboardPage.alertVisable()).toBe(true)
    dashboardPage.openOverdueAlert();
    expect(dashboardPage.alertMessage()).toContain('Warning: version scan overdue for one or more browsers');

  });


  it('Unable to alter state of browser check setting if not logged in', () => {
    dashboardPage.selectBrowser('Chrome');
    expect(dashboardPage.versionCheckSwitchDisabled()).toBe('true');
   

  });


 it('After logging in I can enable bowser checking', () => {
   dashboardPage.closeStatusPanel();
   dashboardPage.topNavMenu.navigateToLoginPage();
   loginPage.loginWithValidCredentials('stutest','Password12');
   dashboardPage.successfullyLoaded();
   dashboardPage.selectBrowser('Chrome');
   expect(dashboardPage.versionCheckSwitchDisabled()).toBeFalsy();

  });


});
