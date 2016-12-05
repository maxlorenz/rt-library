'use strict';

let osm = require('../lib/osm-lib');

module.exports.astar = (cache) => {
    return (start, goal, callback) => astar(cache, start, goal, callback);
};

let astar = (cache, startId, goalId, callback) => {
    let map = osm.openClosedMap();
    let goal = cache.getNode(goalId);

    var q = cache.getNode(startId);
    q.f = 0;
    q.distance = 0;

    map.setOpen(q);
    var found = false;

    while (map.openSize() > 0) {
        q = map.findOpen((res, test) => res.f < test.f);
        map.deleteOpen(q);

        cache.getNextNodes(q, successor => {
            successor.parent = q;

            let heuristic = osm.distanceInM(successor, goal);
            successor.distance = q.distance + osm.distanceInM(successor, q);
            successor.f = successor.distance + heuristic;

            if (successor.id == goalId) {
                found = true;
                callback(osm.backtrack(successor));
            }

            if (map.hasOpen(successor) && map.getOpen(successor).f < successor.f) {
                // skip
            } else if (map.hasClosed(successor) && map.getClosed(successor).f < successor.f) {
                // skip
            } else {
                map.setOpen(successor);
            }
        });

        if (found) { return; }
        map.setClosed(q.id, q);
    }

    callback({ error: 'No path was found after ' + closed.size + ' nodes' });
}