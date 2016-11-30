'use strict';

var loader = require("./lib/loader.js");

module.exports.ucs = (cache) => {
    var cache = cache;
    return ((start, goal, callback) => UCS(cache, start, goal, callback));
};

let distanceInM = (node1, node2) => {
    var radlat1 = Math.PI * node1.lat / 180;
    var radlat2 = Math.PI * node2.lat / 180;
    var radlon1 = Math.PI * node1.lon / 180;
    var radlon2 = Math.PI * node2.lon / 180;

    var theta = node1.lon - node2.lon;
    var radtheta = Math.PI * theta / 180;

    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344 * 1000;

    return dist;
}

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
    var distance = distanceInM(node, next);

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
    var node = cache.nodes[startId];
    var frontier = {};
    var explored = {};
    var maxSteps = 9999999;

    node.distance = 0;
    frontier[node.id] = node;

    while (Object.keys(frontier).length > 0 && maxSteps > 0) {
        var nodeId = findNodeWithShortestDistance(frontier);
        node = cache.nodes[nodeId];
        delete frontier[nodeId];

        if (nodeId == goalId) {
            callback(backtrack(node));
        }

        explored[node.id] = true;
        cache.getNextNodes(node, next => addNextNodes(node, next, explored, frontier));

        maxSteps--;
    }
}