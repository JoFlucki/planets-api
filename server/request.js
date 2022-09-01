var express = require('express')
var app = express()
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("space");
    var myobj = { name: "name_val", diameter: 2342433 };
    dbo.collection("planets").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("ok!");
        db.close();
    });
});