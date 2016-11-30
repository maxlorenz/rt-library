'use strict';

var express = require("express");
var ucs = require("./ucs");
var searcher = require('./searcher');
var loader = require('./lib/loader');

var app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

loader.afterLoading(cache => {
    var route = ucs.ucs(cache);
    var search = searcher.searcher(cache);

    app.get('/from/:fromId/to/:toId', (req, res) => {
        route(req.params.fromId, req.params.toId, path => res.json(path));
    });

    app.get('/search/:keyword', (req, res) => {
        res.json(search(req.params.keyword.toLowerCase()));
    });
});

console.log('Listening on localhost:6833');
console.log('Try http://localhost:6833/from/25199246/to/25200449');

app.listen(6833);