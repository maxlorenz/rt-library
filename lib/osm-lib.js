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