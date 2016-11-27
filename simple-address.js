let http = require('http');
let osmread = require("osm-read");

var matches = [];

let addressResolver = (req, res) => {
    let maxCount = 10;
    let input = req.url.substr(1);
    let result = {};

    res.writeHead(200, {'Content-Type': 'text/json'});

    for (var i = 0, len = matches.length; i < len && maxCount > 0; i++) {
        let line = matches[i];

        if (line[0].includes(input)) {
            result[line[0]] = line[1];
            maxCount--;
        }
    }

    res.end(JSON.stringify(result));
};

function createServer() {
    http.createServer(addressResolver).listen(6833);
    console.log('Listening on localhost:6833');
}

function addTags(node) {
    Object.getOwnPropertyNames(node.tags).forEach(key => {
        matches.push([node.tags[key], node.id]);
    });
}

osmread.parse({
    endDocument: () => createServer(),
    filePath: './test/monaco.osm.pbf',
    node: (n) => addTags(n)
});