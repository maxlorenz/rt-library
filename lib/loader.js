'use strict';

var osmread = require("osm-read")

module.exports.afterLoading = callback => {
    var cache = {
        nodes: {},
        ways: {},

        addNode: node => cache.nodes[node.id] = node,

        addWay: way => {
            for (let i = 1; i < way.nodeRefs.length; i++) {
                var lastNode = way.nodeRefs[i - 1];
                var currentNode = way.nodeRefs[i];

                if (!(lastNode in cache.ways)) {
                    cache.ways[lastNode] = {};
                }

                cache.ways[lastNode][currentNode] = true;
            }
        },

        getNextNodes: (node, callback) => {
            var nextNodes = [];
            for (var id in cache.ways[node.id]) {
                callback(cache.nodes[id]);
            }
        }
    };

    osmread.parse({
        filePath: './test/monaco.osm.pbf',

        node: (n) => cache.addNode(n),
        way: (w) => cache.addWay(w),

        endDocument: () => callback(cache),
        error: (msg) => console.log('error: ' + msg)
    });
}