let osmread = require("osm-read");

osmread.parse({
    filePath: './test/monaco.osm.pbf',

    node: (n) => addNode(n),
    way: (w) => addWay(w),

    endDocument: () => demo(),
    error: (msg) => console.log('error: ' + msg)
});

let cache = {
    nodes: {},
    ways: {}
}

function addNode(node) {
    cache.nodes[node.id] = node;
}

function addWay(way) {
    for (let i = 1; i < way.nodeRefs.length; i++) {
        let lastNode = way.nodeRefs[i - 1];
        let currentNode = way.nodeRefs[i];

        if (!(lastNode in cache.ways)) {
            cache.ways[lastNode] = {};
        }

        cache.ways[lastNode][currentNode] = true;
    }
}

function getNextNodes(node) {
    var nextNodes = [];

    for (var id in cache.ways[node.id]) {
        nextNodes.push(cache.nodes[id]);
    }

    return nextNodes;
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

    return cache.nodes[shortestId];
}

function UCS(start, goal) {
    var node;
    var frontier = {};
    var explored = {};
    var maxSteps = 100000000;

    node = start;
    node.distance = 0;
    frontier[node.id] = node;

    while (Object.keys(frontier).length > 0 && maxSteps > 0) {
        node = findNodeWithShortestDistance(frontier);
        delete frontier[node.id];

        if (node == goal) { // Draw found path
            var latLng = [];

            while (node.previous != undefined) {
                latLng.push(node);
                node = node.previous;
            }

            console.log("found a path in " + latLng.length + " nodes");
            return;
        }

        explored[node.id] = true;

        getNextNodes(node).forEach(function (n) {
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

function demo() {
    var start = cache.nodes[25199246];
    var goal = cache.nodes[25200449];

    UCS(start, goal);
}