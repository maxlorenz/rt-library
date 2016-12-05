'use strict';

let osm = require('../lib/osm-lib');

module.exports.ucs = (cache) => {
    return (start, goal, callback) => UCS(cache, start, goal, callback);
};

let UCS = (cache, startId, goalId, callback) => {
    var node = cache.getNode(startId);
    var frontier = {};
    var explored = {};

    node.distance = 0;
    frontier[node.id] = node;

    while (Object.keys(frontier).length > 0) {
        var nodeId = findNodeWithShortestDistance(frontier);
        node = frontier[nodeId];
        delete frontier[nodeId];

        if (nodeId == goalId) {
            callback(osm.backtrack(node));
            return;
        }

        explored[nodeId] = true;
        cache.getNextNodes(node, next => addNextNodes(node, next, explored, frontier));
    }

    callback({ error: 'No path was found after ' + Object.keys(explored).length + ' nodes' });
}

let findNodeWithShortestDistance = set => {
    var distance = Infinity;
    var shortestId = null;

    for (var id in set) {
        if (set[id].distance < distance) {
            distance = set[id].distance;
            shortestId = id;
        }
    }

    return shortestId;
}

let addNextNodes = (node, next, explored, frontier) => {
    var parent = node;
    let distance = osm.distanceInM(node, next);

    if (!(next.id in explored)) {
        if (!(next.id in frontier)) {
            frontier[next.id] = next;
            frontier[next.id].parent = parent;
            frontier[next.id].distance = distance;
        }
        else if (frontier[next.id].distance > distance) {
            frontier[next.id].parent = parent;
            frontier[next.id].distance = distance;
        }
    }
}
