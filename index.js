'use strict';

let osmread = require('osm-read');

let count = {
    bounds: 0,
    nodes: 0,
    ways: 0,
    relations: 0
}

osmread.parse({
    filePath: './test/monaco.osm.pbf',

    bounds: (b) => count.bounds++,
    node: (n) => count.nodes++,
    way: (w) => count.ways++,
    relation: (r) => count.relations++,

    endDocument: () => console.log(count),
    error: (msg) => console.log('error: ' + msg) 
});