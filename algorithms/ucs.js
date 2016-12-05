'use strict';

let osm = require('../lib/osm-lib');

module.exports.ucs = (cache) => {
    return (start, goal, callback) => UCS(cache, start, goal, callback);
};

let UCS = (cache, startId, goalId, callback) => {
    var node = cache.getNode(startId);
    let map = osm.openClosedMap();

    node.distance = 0;

    map.setOpen(node);

    while (map.openSize() > 0) {
        node = map.findOpen((res, test) => res.distance < test.distance);
        map.deleteOpen(node);

        if (node.id == goalId) {
            callback(osm.backtrack(node));
            return;
        }

        map.setClosed(node);

        cache.getNextNodes(node, successor => {
            successor.parent = node;
            successor.distance = osm.distanceInM(node, successor);

            if (map.hasClosed(successor)) {
                // skip
            } else if (!map.hasOpen(successor)) {
                map.setOpen(successor);
            } else if (map.getOpen(successor).distance < successor.distance) {
                map.setOpen(successor);
            }
        });
    }

    callback({ error: 'No path was found after ' + Object.keys(explored).length + ' nodes' });
}