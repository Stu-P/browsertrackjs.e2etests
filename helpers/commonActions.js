
var CommonAction = function () {

/* Some helper methods */

    this.waitForSpinner = function () {

        browser.driver.manage().timeouts().implicitlyWait(1000);

        browser.wait(function(){
            browser.sleep(250)
            return browser.isElementPresent(by.css("DIV.spinner")).then(function(displayed){
                if(!displayed) {
                    browser.driver.manage().timeouts().implicitlyWait(10000);
                }
                return !displayed;
            })
        },10000);


    }


    /* react select component */
    this.selectFromTypeAhead = function (el, textToType) {
        //click to open type ahead
        el.click()
        browser.actions().sendKeys(textToType).perform()
        browser.actions().sendKeys(protractor.Key.ENTER).perform()
    }

    this.selectFromCombobox = function (element, option) {
        element.click();
        var options = element.all(by.css('div.Select-option'))

        options.filter(function (elm) {
            return elm.getText().then(function (text) {
                return (text.indexOf(option) !== -1)
            })
        }).first().click()
    }

    this.scrollToTop = function () {
        browser.executeScript("window.scrollTo(0,0);")
    }

    this.scrollIntoView = function (el) {
        browser.executeScript(function (el) {
            el.scrollIntoView()
        }, el.getWebElement())
    }


    this.waitUntilReady = function (elm) {
        browser.wait(function () {
            return elm.isPresent()
        }, 10000)
    }

    /* Table related methods  */

    this.getRow = function (table, rowIndex) {
        return table.all(by.tagName('tr')).get(rowIndex)
    }

    this.findRow = function (table, searchText) {

        var rows = table.all(by.css('tbody tr'));
        return rows.filter(function (elm) {
            return elm.getText().then(function (text) {
                return (text.indexOf(searchText) !== -1);
            });
        }).first();
    }

    this.findRowByColumnText = function (table, columnId, searchText) {

        var rows = table.all(by.css('tbody tr'));

        return rows.filter(function (row) {
            return row.all(by.tagName("td")).get(columnId).getText().then(function (text) {
                return (text === searchText)
            });
        }).first();
    }


    /* Returns promise containing string array containing the text of  all cells */
    this.getCellsText = function (row) {
        return row.all(by.tagName('td')).map(function (cell) {
            return cell.getText()
        }).then(function (arr) {
            return arr
        })
    }

    /* Returns a particular cell in a spectified row */
    this.findColumnTextinaParticularRow = function (table, rowId, columnId) {
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



    /* card related methods */

    this.getCard = function (name) {
        var allCards = element.all(by.css('div.card'))
        return allCards.filter(function (elm) {
            return elm.getText().then(function (text) {
                return (text.indexOf(name) !== -1);
            });
        }).first();
    }

        this.getCard = function (name) {
        var allCards = element.all(by.css('div.card'))
        return allCards.filter(function (elm) {
            return elm.element(by.css("div.card-heading")).getText().then(function (text) {
                return (text===name);
            })
        }).first();
    }


    this.selectCard = function (name) {
        var card = this.getCard(name);
        return card.element(by.css("div.card-heading")).click();
    }

    this.cardsLoaded = function (name) {
        return browser.wait(function () {
            return element.all(by.css('div.card')).count().then(function (c) {
                return c > 0;
            })

        }, 10000)

    }

}
module.exports = new CommonAction();