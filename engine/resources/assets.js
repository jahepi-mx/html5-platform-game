Assets = {};

Assets.srcs = [
    "assets/tiles/sprites.png", 
    "assets/hero/sprites.png", 
    "assets/enemies/sprites.png", 
    "assets/gui/sprites.png"
];

Assets.keys = [
    "tilesAtlas", 
    "heroAtlas", 
    "enemiesAtlas", 
    "guiAtlas"
];

Assets.loadAll = function(callback) {
    for (var i = 0; i < Assets.keys.length; i++) {
        Assets[Assets.keys[i]] = new Image();
    }
    Assets.load(0, callback);
};

Assets.load = function(index, callback) {
    Assets[Assets.keys[index]].onload = function() {
        if (index + 1 >= Assets.srcs.length) {
            if (callback !== null) {
                callback();
            }
        } else {
            Assets.load(index + 1, callback);
        }
    };
    Assets[Assets.keys[index]].src = Assets.srcs[index];
};