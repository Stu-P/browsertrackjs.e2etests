import {fileSystem} from 'fs';
import {testSettings} from '../test_settings';

export class  CommonActions {

    waitForSpinner() {

        browser.driver.manage().timeouts().implicitlyWait(1000);

        browser.wait(function(){
            browser.sleep(250)
            return browser.isElementPresent(by.css("DIV.spinner")).then(function(displayed){
                console.log("Is spinner visible? " + displayed)
                if(!displayed) {
                    browser.driver.manage().timeouts().implicitlyWait(10000);
                }
                return !displayed;
            })
        },10000);
    }

    waitForSpinnerAlt() {
        EC = protractor.ExpectedConditions;
        browser.driver.manage().timeouts().implicitlyWait(1000);

        var spinner = $('div#SearchOptions-Loading');

        browser.driver.wait(EC.not(EC.visibilityOf(spinner)),30000 ).then(function(){
            browser.driver.manage().timeouts().implicitlyWait(1000);
        });

    }





    // ReactSelect element
    selectFromTypeAhead (el, textToType) {
        //click to open type ahead
        el.click()
        browser.actions().sendKeys(textToType).perform()
        browser.actions().sendKeys(protractor.Key.ENTER).perform()
    }

    selectFromCombobox (element, option) {
        element.click();
        var options = element.all(by.css('div.Select-option'))

        options.filter( (elm) =>{
            return elm.getText().then( (text) => {
                return (text.indexOf(option) !== -1)
            })
        }).first().click()
    }

    scrollToTop () {
        browser.executeScript("window.scrollTo(0,0);")
    }

    scrollIntoView (el) {
        browser.executeScript(function (el) {
            el.scrollIntoView()
        }, el.getWebElement())
    }

    waitUntilReady = function (elm) {
        browser.wait(function () {
            return elm.isPresent()
        }, 10000)
    }

    /* Table related methods  */

    getRow (table, rowIndex) {
        return table.all(by.tagName('tr')).get(rowIndex)
    }

    findRow (table, searchText) {
        var rows = table.all(by.css('tbody tr'));
        return rows.filter(function (elm) {
            return elm.getText().then(function (text) {
                return (text.indexOf(searchText) !== -1);
            });
        }).first();
    }

    findRowByColumnText = function (table, columnId, searchText) {

        var rows = table.all(by.css('tbody tr'));

        return rows.filter(function (row) {
            return row.all(by.tagName("td")).get(columnId).getText().then(function (text) {
                return (text === searchText)
            });
        }).first();
    }

    /* Returns promise containing string array containing the text of all cells */
    getCellsText = function (row) {
        return row.all(by.tagName('td')).map(function (cell) {
            return cell.getText()
        }).then(function (arr) {
            return arr
        })
    }

    /* Returns a particular cell in a spectified row */
    findColumnTextinaParticularRow = function (table, rowId, columnId) {
        var rows = table.all(by.tagName('tr')).get(rowId)
        return rows.all(by.tagName("td")).get(columnId).getText();
    }

    //example
    /*    it("Example table row comparison ", function () {

           var expectedRecord = ['','AcceptanceTests - Workflow for TestData','AUS','06 Feb 2017 10:33:09','','06 Feb 2017 10:37:45','0',''];
           expect(workflowsPage.getWorkflowRecord(1)).toEqual(expectedRecord);
        
        });

            //this.getWorkflowCard = function(index) {
        // var row = common.getRow(workflowsGrid,index);
        //  var cells = common.getCellsText(row).then(function(cells){console.log(cells);})

        //    return  common.getCellsText(row);
        // }

                //  var row = common.findRow(workflowsGrid, workflowName);
            //row.element(by.className("glyphicon-folder-open")).click()
        
        */

    /* Cards related methods */
        getCard (name) {
        var allCards = element.all(by.css('div.card'))
        return allCards.filter(function (elm) {
            return elm.element(by.css("div.card-heading")).getText().then(function (text) {
                return (text===name);
            })
        }).first();
    }

    selectCard  (name) {
        var card = this.getCard(name);
        return card.element(by.css("div.card-heading")).click();
    }

    cardsLoaded (name) {
        return browser.wait(function () {
            return element.all(by.css('div.card')).count().then(function (c) {
                return c > 0;
            })
        }, 10000)
    }
}


