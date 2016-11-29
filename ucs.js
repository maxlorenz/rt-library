let loader = require("./lib/loader.js");

module.exports.afterLoading = callback => {
    loader.afterLoading(cache => {
        module.exports.route = (start, goal, callback) => {
            UCS(start, goal, cache, callback);
        };

        callback();
    });
}

function distanceInM(node1, node2) {
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

function UCS(startId, goalId, cache, callback) {
    var node = cache.nodes[startId];
    var frontier = {};
    var explored = {};
    var maxSteps = 9999999;

    node.distance = 0;
    frontier[node.id] = node;

    while (Object.keys(frontier).length > 0 && maxSteps > 0) {
        nodeId = findNodeWithShortestDistance(frontier);
        node = cache.nodes[nodeId];
        delete frontier[nodeId];

        if (nodeId == goalId) {
            var latLng = [];

            while (node.previous != undefined) {
                latLng.push(node);
                node = node.previous;
            }

            callback(latLng);
        }

        explored[node.id] = true;

        cache.getNextNodes(node, n => {
            previous = node;
            distance = distanceInM(node, n);

            if (!(n.id in explored)) {
                if (!(n.id in frontier)) {
                    frontier[n.id] = n;
                    frontier[n.id].previous = previous;
                    frontier[n.id].distance = distance;
                }
                else if (frontier[n.id].distance > distance) {
                    frontier[n.id].previous = previous;
                    frontier[n.id].distance = distance;
                }
            }
        });

        maxSteps--;
    }
}