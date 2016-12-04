'use strict';

let osm = require('../lib/osm-lib');

module.exports.astar = (cache) => {
    return (start, goal, callback) => astar(cache, start, goal, callback);
};

function nodeWithSmallestF(set) {
    var minNode = { f: Infinity };
    set.forEach(node => { if (node.f < minNode.f) { minNode = node }});

    return minNode;
}

function astar(cache, startId, goalId, callback) {
    let open = new Map();
    let closed = new Map();
    var found = false;
    let goal = cache.getNode(goalId);

    var q = cache.getNode(startId);
    q.f = 0;
    q.distance = 0;

    open.set(q.id, q);

    while (open.size > 0) {
        q = nodeWithSmallestF(open);
        open.delete(q.id);
        console.log(open.size);

        cache.getNextNodes(q, successor => {
            let heuristic = osm.distanceInM(successor, goal);

            successor.distance = q.distance + osm.distanceInM(successor, q);
            successor.f = successor.distance + heuristic;
            successor.parent = q;

            if (successor.id == goalId) {
                found = true;
                callback(successor);
            }

            if (open.has(successor.id) && open.get(successor.id).f < successor.f) {
                // skip
            } else if (closed.has(successor.id) && closed.get(successor.id).f < successor.f) {
                // skip
            } else {
                open.set(successor.id, successor);
            }
        });

        if (found) {
            return;
        }

        closed.set(q.id, q);
    }
}