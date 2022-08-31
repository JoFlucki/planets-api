var express = require('express')
var app = express()
app.listen(3000)

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo-0.mongo,mongo-1.mongo,mongo-2.mongo";
var diameter = "500";


app.get('/home', function (req, res) {
    res.send(`
    <!DOCTYPE html>
    <html lang="fr-CH">
        <head>
            <meta charset="UTF-8">
            <title>Planets API</title>
        </head>
        <body>
            <h1>Planets API</h1>
            <p>Bienvenue sur l'API des plan&egrave;tes!</p>
        </body>
    </html>
    `);
});


app.get('/pi', function (req, res) {
    let i = 1n;
    let x = 3n * (10n ** 10000n);
    let pi = x;
    while (x > 0) {
        x = x * i / ((i + 1n) * 4n);
        pi += x / (i + 2n);
        i += 2n;
    }
    result = (pi / (10n ** 20n)).toString();
    res.send(result)
});


app.get('/planets', function (req, res) {
    let name_val = req.query.name;
    try {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("space");
            dbo.collection("planets").findOne({ name: name_val }, function (err, result) {
                if (err) { throw err; }
                else if (result===null) { throw "null result"}
                
                db.close();
                res.send(result.diameter);
            });
        });
    } catch (err) {
        res.sendStatus(500);
    }
});

app.post('/planets', function (req, res) {
    let name_val = req.query.name;
    let diameter_val = req.query.diameter;
    try {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("space");
            var myobj = { name: name_val, diameter: diameter_val };
            dbo.collection("planets").insertOne(myobj, function (err, res) {
                if (err) throw err;
                db.close();
            });
        });
    } catch (err) {
        res.sendStatus(500);
    }
    res.send("Ok!")
});