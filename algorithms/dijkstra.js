'use strict';

let osm = require('../lib/osm-lib');

module.exports.dijkstra = (cache) => {
    return (start, goal, callback) => dijkstra(cache, start, goal, callback);
};

let dijkstra = (cache, startId, goalId, callback) => {
    let map = osm.openClosedMap();
    let goal = cache.getNode(goalId);

    var q = cache.getNode(startId);
    q.distance = 0;

    map.setOpen(q);
    var found = false;

    while (map.openSize() > 0) {
        q = map.findOpen((res, test) => res.distance < test.distance);
        map.deleteOpen(q);

        cache.getNextNodes(q, successor => {
            successor.parent = q;
            successor.distance = q.distance + osm.distanceInM(successor, q);

            if (successor.id == goalId) {
                found = true;
                callback(osm.backtrack(successor));
            }

            if (map.hasOpen(successor) && map.getOpen(successor).distance < successor.distance) {
                // current path to successor is longer
            } else if (map.hasClosed(successor)) {
                // skip
            } else {
                map.setOpen(successor);
            }
        });

        map.setClosed(q);
        if (found) { return; }
    }

    callback({ error: 'No path was found after ' + map.openSize() + ' nodes' });
}