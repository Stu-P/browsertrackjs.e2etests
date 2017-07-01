import { browser, element, by } from 'protractor';
import { MongoClient } from 'mongodb';
import {testSettings} from '../test_settings';

export class mongoUtil {

    deleteRule(name) {
        MongoClient.connect(testSettings.MongoURI, (err, db) => {
            if (!err)
                console.log("Connected successfully to server");

            var col = db.collection('RuleCollection');
            col.deleteMany({ Name: name }, (err, r) =>  {
                if (err)
                    console.log('Error deleting rule');
            });
        });
    }
}
