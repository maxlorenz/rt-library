let ucs = require("./ucs");

console.log ("Loading OSM data...");

ucs.afterLoading(() => {
    ucs.route(25199246, 25200449, path => console.log(path));
});