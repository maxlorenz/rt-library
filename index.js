'use strict';

// routing
let searcher = require('./tools/searcher');
let ucs = require('./algorithms/ucs');
let loader = require('./lib/loader');

// server
let app = require('express')();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

loader.afterLoading('./example/monaco.osm.pbf', cache => {
    var route = ucs.ucs(cache);
    var search = searcher.searcher(cache);

    app.get('/from/:fromId/to/:toId', (req, res) => {
        route(req.params.fromId, req.params.toId, path => res.json(path));
    });

    app.get('/search/:keyword', (req, res) => {
        search(req.params.keyword, results => res.json(results));
    });
});

console.log('Listening on localhost:6833');
console.log('Try http://localhost:6833/from/25199246/to/25200449');

app.listen(6833);