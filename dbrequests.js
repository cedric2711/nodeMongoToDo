exports = module.exports = dbrequests;

function dbrequests() {
    console.log("Yahiooooooooo");
    var operations = {
        createConnection: function() {
            // Use connect method to connect to the server
            MongoClient.connect(url, function(err, client) {
                assert.equal(null, err);
                console.log("Connected successfully to server");

                const db = client.db(dbName);

                client.close();
            });
        },
        insertCollection: function(Data) {
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db(dbName);
                var myobj = Data;
                dbo.collection(dbCollection).insertOne(myobj, function(err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
                });
            });
        },
        getAllData: function() {
            var reqResult;
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db(dbName);
                dbo.collection(dbCollection).find({}).toArray(function(err, result) {
                    if (err) throw err;
                    reqResult = result;
                    app;
                    console.log(result);
                    db.close();
                });
            });
        },
        updateBlock: function() {

        }
    }
    return operations;
}

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myTask';
const dbCollection = 'allTask';
