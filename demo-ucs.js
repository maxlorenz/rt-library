var express = require("express");
var ucs = require("./ucs");


console.log ("Loading OSM data...");

ucs.afterLoading(() => {
    var app = express();

    app.use((req, res, next) => {
    	res.header('Access-Control-Allow-Origin', '*');
    	next();
    });

    app.get('/from/:fromId/to/:toId', (req, res) => {
        ucs.route(req.params.fromId, req.params.toId, path => {
            res.json(path);
        });
    });

    console.log('Listening on localhost:6833');
    console.log('Try http://localhost:6833/from/25199246/to/25200449');

    app.listen(6833);
});