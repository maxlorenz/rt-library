let express = require("express")
let ucs = require("./ucs");


console.log ("Loading OSM data...");

ucs.afterLoading(() => {
    let app = express()

    app.get('/from/:fromId/to/:toId', (req, res) => {
        ucs.route(req.params.fromId, req.params.toId, path => {
            res.json(path);
        });
    });

    console.log('Listening on localhost:6833');
    console.log('Try http://localhost:6833/from/25199246/to/25200449');

    app.listen(6833);
});