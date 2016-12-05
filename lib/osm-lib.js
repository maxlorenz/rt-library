'use strict';

module.exports.distanceInM = (node1, node2) => {
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

module.exports.backtrack = node => {
    var latLng = [];

    while (node.parent != undefined) {
        latLng.push({ lon: node.lon, lat: node.lat, tags: node.tags });
        node = node.parent;
    }

    return latLng;
}

module.exports.openClosedMap = () => {
    var map = {
        open: new Map(),
        closed: new Map(),

        setOpen: node => map.open.set(node.id, node),
        setClosed: node => map.closed.set(node.id, node),

        deleteOpen: node => map.open.delete(node.id),
        deleteClosed: node => map.closed.delete(node.id),

        hasOpen: node => map.open.has(node.id),
        hasClosed: node => map.closed.has(node.id),

        getOpen: node => map.open.get(node.id),
        getClosed: node => map.closed.get(node.id),

        openSize: () => map.open.size,
        closedSize: () => map.closed.size,

        findOpen: comparison => mapFind(map.open, comparison),
        findClosed: comparison => mapFind(map.closed, comparison)
    };

    return map;
}

let mapFind = (map, comparison) => {
    var result;

    map.forEach(test => {
        if (result === undefined || comparison(test, result)) {
            result = test;
        }
    });

    return result;
}