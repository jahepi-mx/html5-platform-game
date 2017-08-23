Assets = {
    tilesAtlas: new Image(),
    heroAtlas: new Image(),
    enemiesAtlas: new Image(),
};

Assets.srcs = ["assets/tiles/sprites.png", "assets/hero/sprites.png", "assets/enemies/sprites.png"];
Assets.keys = ["tilesAtlas", "heroAtlas", "enemiesAtlas"];

Assets.loadAll = function(callback) {
    Assets.load(0, callback);
    /*Assets.enemiesAtlas.onload = function() {
        if (callback !== null) {
            callback();
        }
    }; 
    Assets.heroAtlas.onload = function() {
        // Hero spritesheet
        Assets.enemiesAtlas.src = 'assets/enemies/sprites.png';
    }; 
    Assets.tilesAtlas.onload = function() {
        // Hero spritesheet
        Assets.heroAtlas.src = 'assets/hero/sprites.png';
    };
    // Tiles spritesheet
    Assets.tilesAtlas.src = 'assets/tiles/sprites.png';*/
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