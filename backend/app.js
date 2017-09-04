/*
 * Dylan Lettinga
 * 08/29/2017
 */
const mongo = require('./dbops');
var url = require('url');
var fs = require("fs");
var express = require('express');
var server = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var mustache = require('mustache');

var app = express();

var jsonParser = bodyParser.json()
//var path = path.join(__dirname, '../public');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

/** HTTP calls */

/* server collections page */
app.get('/', function (req, res) {
    console.log("[200] " + req.method + " to " + req.url);
    mongo.query("collection", {}, function(ret){
        var page = fs.readFileSync(path.join(__dirname, 'views/collections.html'), "utf8");
        var html = mustache.to_html(page, ret); // replace all of the data
        res.end(html);
    });
})

/* server artist page */
app.get('/collection/:cid', function (req, res) {
    console.log("[200] " + req.method + " to " + req.url);
    console.log( req.params.cid);
    mongo.query("artist", {cid: req.params.cid}, function(ret){
        var page = fs.readFileSync(path.join(__dirname, 'views/artists.html'), "utf8");
        var html = mustache.to_html(page, ret); // replace all of the data
        res.end(html);
    });
})

/** API calls */

/* query all collections */
app.get('/api/collection/', function (req, res) {
    console.log("[200] " + req.method + " to " + req.url);
    mongo.query("collection", {}, function(ret){
        res.json(ret);
    });
})

/* query content of a collection */
app.get('/api/artist/', function (req, res) {
    console.log("[200] " + req.method + " to " + req.url);
    mongo.query("artist", {}, function(ret){
        res.json(ret);
    });
})

/* delete collection */
app.delete('/api/collection/:cid', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log("[200] " + req.method + " to " + req.url);

    mongo.deletedoc("collection", {cid: req.params.cid});

    var status = { "status": "[200]", "cid": req.params.cid};
    res.end(JSON.stringify(status));
})

/* delete artist */
app.delete('/api/artist/', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log("[200] " + req.method + " to " + req.url);

    mongo.deletedoc("artist", req.body);

    var status = { "status": "[200]", "object": req.body};
    res.end(JSON.stringify(status));
})

/* add collection */
app.post('/api/collection/', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log("[200] " + req.method + " to " + req.url);

    mongo.insertdoc("collection", req.body);
    
    var status = { "status": "[200]", "object": req.body};
    res.end(JSON.stringify(status));
})

/* add artist to collection */
app.post('/api/artist/', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log("[200] " + req.method + " to " + req.url);

    mongo.insertdoc("artist", req.body);
    
    var status = { "status": "[200]", "object": req.body};
    res.end(JSON.stringify(status));
})

var server = app.listen(5678, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server started at http://%s:%s", host, port);
    //mongo.createcol("invoice");
})
