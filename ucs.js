'use strict';

let loader = require('./lib/loader.js');
let osmlib = require('./lib/osm-lib');

module.exports.ucs = (cache) => {
    return (start, goal, callback) => UCS(cache, start, goal, callback);
};

function findNodeWithShortestDistance(set) {
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

function backtrack(node) {
    var latLng = [];

    while (node.previous != undefined) {
        latLng.push({
            lon: node.lon,
            lat: node.lat,
            tags: node.tags
        });

        node = node.previous;
    }

    return latLng;
}

function addNextNodes(node, next, explored, frontier) {
    var previous = node;
    let distance = osmlib.distanceInM(node, next);

    if (!(next.id in explored)) {
        if (!(next.id in frontier)) {
            frontier[next.id] = next;
            frontier[next.id].previous = previous;
            frontier[next.id].distance = distance;
        }
        else if (frontier[next.id].distance > distance) {
            frontier[next.id].previous = previous;
            frontier[next.id].distance = distance;
        }
    }
}

function UCS(cache, startId, goalId, callback) {
    var node = cache.getNode(startId);
    var frontier = {};
    var explored = {};
    var maxSteps = 10000000;

    node.distance = 0;
    frontier[node.id] = node;

    while (Object.keys(frontier).length > 0 && maxSteps > 0) {
        var nodeId = findNodeWithShortestDistance(frontier);
        node = cache.getNode(nodeId);
        delete frontier[nodeId];

        if (nodeId == goalId) {
            console.log('path found. nodes visited: ' + Object.keys(explored).length);
            callback(backtrack(node));
            return;
        }

        explored[nodeId] = true;
        cache.getNextNodes(node, next => addNextNodes(node, next, explored, frontier));

        maxSteps--;
    }

    callback({ error: 'No path was found after ' + Object.keys(explored).length + ' steps' });
    return;
}