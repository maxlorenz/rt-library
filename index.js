'use strict';

// routing
let loader = require('./lib/loader');
let searcher = require('./tools/searcher');

let astar = require('./algorithms/a-star');
let dijkstra = require('./algorithms/dijkstra');

// server
let app = require('express')();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

loader.afterLoading('./example/monaco.osm.pbf', cache => {
    var routeAstar = astar.astar(cache);
    var routeDijkstra = dijkstra.dijkstra(cache);

    var search = searcher.searcher(cache);

    app.get('/astar/from/:fromId/to/:toId', (req, res) => {
        routeAstar(req.params.fromId, req.params.toId, path => res.json(path));
    });
    
    app.get('/dijkstra/from/:fromId/to/:toId', (req, res) => {
        routeDijkstra(req.params.fromId, req.params.toId, path => res.json(path));
    });

    app.get('/search/:keyword', (req, res) => {
        search(req.params.keyword, results => res.json(results));
    });
});

console.log('Listening on localhost:6833');
console.log('Try http://localhost:6833/astar/from/25199246/to/25200449');

app.listen(6833);