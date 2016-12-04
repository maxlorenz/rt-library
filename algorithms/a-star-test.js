let loader = require('../lib/loader');
let astar = require('./a-star');

// console.log('Try http://localhost:6833/from/25199246/to/25200449');

loader.afterLoading('../example/monaco.osm.pbf', cache => {
    var alg = astar.astar(cache);

    alg('25199246', '25200449', message => console.log(message));
});