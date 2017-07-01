exports.config = {
  directConnect: true,
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'jasmine2',
  capabilities: {
    browserName: 'chrome',
      chromeOptions: {
      args: ['--no-sandbox', '--disable-extensions']
    }
    /* ,'proxy': {
              'proxyType': 'manual',
              'httpProxy': 'http://localhost:8888',
              'noProxy':'*.browsertrack.io' 
    }*/
  },
  specs: ['js/test_spec/**/*.js'],
  suites: {
      regression: [
          '../test_spec/dashboardSpec.js',
          '../test_spec/versionHistorySpec.js'

      ],
      dashboard: ['../test_spec/dashboardSpec.js'],
      versionHistory: ['../test_spec/versionHistorySpec.js']
  },
  allScriptsTimeout: 100000,
  jasmineNodeOpts: {
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 10000
  },
  onPrepare: function () {
        require("babel-register")
        var SpecReporter = require('jasmine-spec-reporter');
        var jasmineReporters = require('jasmine-reporters');
        var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
        // add jasmine spec reporter
        jasmine.getEnv().addReporter(new SpecReporter({
            displayStacktrace: true,
            displayFailuresSummary: false,
        }));
        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            savePath: './reports/',
            takeScreenshots: true,
            takeScreenshotsOnlyOnFailures: true
        }));

        jasmine.getEnv().addReporter(new jasmineReporters.TeamCityReporter());

      /* For non-angular websites */ 
     //   browser.ignoreSynchronization = true;
      //  browser.waitForPageLoading = waitForPageLoading;

        browser.driver.manage().timeouts().pageLoadTimeout(60000);
        browser.driver.manage().timeouts().implicitlyWait(10000);

        //browser.driver.manage().window().maximize();
        browser.driver.manage().window().setSize(1024, 768);

  }
};

// non angular websites
// function waitForPageLoading() {
//     browser.driver.wait(function(){
//          return browser.executeAsyncScript('return jQuery.active ==0').then(function(result) {
//              return result;
//          })
//     })
// }