'use strict';

let osmread = require('osm-read');

module.exports.afterLoading = (file, callback) => {
    var cache = {
        nodes: {},
        ways: {},

        addNode: node => cache.nodes[node.id] = node,

        addWay: way => {
            for (let i = 1; i < way.nodeRefs.length; i++) {
                var lastNode = way.nodeRefs[i - 1];
                var currentNode = way.nodeRefs[i];

                if (!(lastNode in cache.ways))
                    cache.ways[lastNode] = {};

                if (!(currentNode in cache.ways))
                    cache.ways[currentNode] = {};

                cache.ways[lastNode][currentNode] = true;
                cache.ways[currentNode][lastNode] = true;
            }
        },

        getNextNodes: (node, callback) => {
            for (var id in cache.ways[node.id]) {
                callback(Object.assign({}, cache.nodes[id]));
            }
        },

        getNode: id => Object.assign({}, cache.nodes[id]),
        getWay: id => Object.assign({}, cache.ways[id])
    };

    osmread.parse({
        filePath: file,

        node: (n) => cache.addNode(n),
        way: (w) => cache.addWay(w),

        endDocument: () => callback(cache),
        error: (msg) => console.log('error: ' + msg)
    });
}