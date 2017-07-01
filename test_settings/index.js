

let sut = process.env.TestEnv
let testSettings = undefined;

if (!sut) { 
    testSettings = require('./dev.json');
} else if (sut==='QA'){
    testSettings = require('./qa.json');
} else if (sut==='DEV')
{
    testSettings = require('./dev.json');
}
 else if (sut==='SAND')
{
    testSettings = require('./sand.json');
}
module.exports = {
  testSettings : testSettings
 }
