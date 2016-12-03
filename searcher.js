'use strict';

module.exports.searcher = (cache) => {
    Object.keys(cache.ways).forEach(nodeId => {
        if (nodeId in cache.nodes) {
            addTags(cache.nodes[nodeId]);
        }
    });

    return addressResolver;
};

var matches = [];

let addressResolver = (input, callback) => {
    var maxCount = 10;
    var result = [];

    for (var i = 0, len = matches.length; i < len && maxCount > 0; i++) {
        let line = matches[i];
        let matcher = RegExp('.*' + input + '.*', 'i');

        if (matcher.test(line[0])) {
            result.push({
                display_name: line[0],
                osm_id: line[1]
            });

            maxCount--;
        }
    }

    callback(result);
};

function addTags(node) {
    Object.getOwnPropertyNames(node.tags).forEach(key => {
        matches.push([node.tags[key], node.id]);
    });
}