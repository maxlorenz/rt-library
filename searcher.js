'use strict';

module.exports.searcher = (cache) => {
    Object.keys(cache.nodes).forEach(nodeId => {
        addTags(cache.nodes[nodeId]);
    });

    return keyword => addressResolver(keyword);
};

var matches = [];

let addressResolver = (input) => {
    let maxCount = 10;
    let result = [];

    for (var i = 0, len = matches.length; i < len && maxCount > 0; i++) {
        let line = matches[i];

        if (line[0].includes(input)) {
            result.push({
                display_name: line[0],
                osm_id: line[1]
            });

            maxCount--;
        }
    }

    return result;
};

function addTags(node) {
    Object.getOwnPropertyNames(node.tags).forEach(key => {
        matches.push([node.tags[key], node.id]);
    });
}