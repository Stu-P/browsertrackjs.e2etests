
var topNavMenu = require("../pages/topNavMenu.js");
var leftNavMenu = require("../pages/leftNavMenu.js");

var dashboardPage = function (){
    this.topNavMenu = topNavMenu;
    this.leftNavMenu = leftNavMenu;

  var gridList = element(by.css('div.BrowserGridList'));
  var chromeTile = element(by.css('md-grid-tile.Chrome'));
  var versionCheckSwitch = element(by.id('rp-update-switch'));
  var warningIcon = element(by.id('warning-button'));
  var warningPanel = element(by.id('warning-panel'));
  var statusPanelCloseButton = element(by.buttonText('Close'));

    this.successfullyLoaded = function() {
        return browser.wait( () => {
            return gridList.isPresent();
        });
    }
 
    this.alertVisable = function() { 
        return warningIcon.isPresent();
    }

    this.openOverdueAlert = function()  {
        warningIcon.click();
        browser.sleep(1000)
    }

    this.selectBrowser = function(name)  {
        element(by.css('md-grid-tile.'+ name)).click();
    }


    this.alertMessage = function()  {
        return warningPanel.getText();
    }
//disabled="disabled"
    this.versionCheckSwitchDisabled = function()  {
       return versionCheckSwitch.getAttribute("disabled");
    }

   this.browserGridContents = function()  {

        return element.all(by.css('md-grid-tile')).map(function(el){
            return Promise.all([
                el.element(by.css('md-grid-tile-header')).getText(),
                el.element(by.css('md-grid-tile-footer')).getText()
            ]).then (function(txtArray){
                console.log([txtArray[0],txtArray[1]])
               return [txtArray[0],txtArray[1]];
               })
            })
    }

    this.closeStatusPanel = function()  {
        
        statusPanelCloseButton.click();
        browser.sleep(500);

    }

}

module.exports = new dashboardPage();
