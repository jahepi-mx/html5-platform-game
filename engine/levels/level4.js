function Level4() {
    this.loaded = false;
    this.startX = Config.tileSize * 7 - Config.worldWidth / 2 + Config.heroSize / 2;
    this.startY = Config.tileSize * 13  - Config.worldHeight / 2 - Config.heroSize / 2;
}

Level4.prototype.setup = function(camera) {
    
    this.levelName = "Boss 2: Dracula";
    this.mapWidth = 50;
    this.mapHeight = 20;
    this.camera = camera;
    this.camera.height = 4;
    this.tiles = [];
    this.enemies = [];
    this.platforms = [];
    this.totalNumberOfCoins = 1;
    this.currentNumberOfCoins = 0;
    this.music = Assets.playAudio(Assets.boss_music, true);
    this.atlasBackground = Atlas.tiles.cave_background;
    this.visibilityEnemyRatioX = 60; // 30 tiles 
    this.visibilityEnemyRatioY = 20; // 20 tiles
    this.checkpointTime = 0;
    this.checkpointTimeLimit = 2;
    this.isCheckpoint = false;
    this.coins = [];
        
    this.map = [
        50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 51, 52, 53, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 51, 52, 53, 50, 50, 50, 50, 50, 50, 50, 50, 51, 52, 53, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 51, 52, 53, 50, 50, 50, 50, 50, 56, 56, 55, 51, 52, 53, 50, 51, 52, 53, 50, 50, 50, 56, 56, 55, 50, 50, 50, 50, 51, 52, 53, 50, 56, 55, 54, 50, 50, 51, 52, 53, 50, 50, 50, 50, 51, 52, 53, 50, 50, 50, 56, 55, 54, 50, 50, 51, 52, 53, 51, 52, 53, 54, 55, 54, 50, 56, 56, 55, 51, 52, 53, 50, 50, 51, 52, 53, 50, 50, 56, 56, 55, 50, 50, 51, 52, 53, 50, 56, 55, 56, 51, 52, 53, 50, 56, 56, 56, 50, 50, 50, 50, 50, 50, 50, 50, 56, 54, 56, 56, 55, 56, 51, 52, 53, 50, 50, 50, 50, 56, 55, 54, 51, 52, 53, 56, 56, 50, 50, 50, 50, 50, 50, 50, 56, 55, 54, 50, 50, 50, 50, 56, 55, 56, 51, 52, 53, 50, 50, 50, 50, 50, 50, 50, 87, 50, 50, 50, 50, 87, 87, 50, 54, 54, 54, 87, 50, 87, 50, 87, 87, 87, 56, 56, 56, 87, 50, 50, 87, 87, 50, 87, 87, 50, 87, 50, 50, 87, 50, 50, 87, 50, 50, 87, 54, 55, 56, 87, 50, 50, 87, 88, 89, 87, 86, 88, 89, 88, 89, 86, 86, 88, 89, 88, 89, 86, 89, 86, 88, 86, 86, 86, 88, 89, 89, 86, 88, 89, 86, 86, 88, 86, 86, 88, 86, 88, 88, 86, 88, 89, 86, 89, 88, 86, 88, 89, 88, 86, 89, 88, 86, 100, 100, 100, 100, 100, 100, 77, 76, 76, 76, 80, 101, 77, 76, 76, 76, 76, 76, 78, 101, 101, 77, 76, 77, 76, 76, 76, 78, 101, 77, 76, 76, 76, 76, 76, 80, 101, 101, 77, 76, 77, 76, 76, 78, 100, 100, 100, 100, 100, 100, 81, 81, 81, 81, 81, 81, 77, 77, 76, 76, 80, 101, 77, 77, 76, 77, 76, 76, 78, 101, 101, 77, 76, 76, 76, 77, 76, 80, 101, 77, 76, 77, 76, 78, 76, 78, 101, 101, 77, 76, 76, 76, 76, 78, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 79, 77, 76, 76, 76, 76, 76, 76, 76, 77, 77, 76, 76, 76, 76, 76, 76, 76, 76, 77, 77, 76, 76, 76, 76, 76, 76, 78, 76, 76, 76, 76, 76, 76, 76, 76, 76, 78, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 77, 76, 76, 76, 76, 77, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 77, 76, 76, 77, 76, 76, 76, 78, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 78, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 79, 76, 76, 76, 76, 77, 77, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 77, 76, 76, 76, 76, 76, 76, 78, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 78, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 77, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 77, 77, 76, 76, 76, 77, 77, 77, 77, 76, 76, 78, 81, 81, 81, 81, 81, 81    
    ];
    
    for (var i = 0; i < this.map.length; i++) {       
        if (this.map[i] === 0) {
            this.tiles[i] = null;
        } else {
            this.tiles[i] = new Tile(i % this.mapWidth, Math.floor(i / this.mapWidth), Config.tileSize, Config.tileSize, this.map[i], this.camera);
        }
        this.enemies[i] = null;
        this.coins[i] = null;
    }
    
    
    this.enemies[14 * this.mapWidth + 0] = new StaticEnemy(0, 14, this.camera, StaticEnemy.FIRE_TYPE);
    this.enemies[14 * this.mapWidth + 1] = new StaticEnemy(1, 14, this.camera, StaticEnemy.FIRE_TYPE);
    this.enemies[14 * this.mapWidth + 2] = new StaticEnemy(2, 14, this.camera, StaticEnemy.FIRE_TYPE);
    this.enemies[14 * this.mapWidth + 3] = new StaticEnemy(3, 14, this.camera, StaticEnemy.FIRE_TYPE);
    this.enemies[14 * this.mapWidth + 4] = new StaticEnemy(4, 14, this.camera, StaticEnemy.FIRE_TYPE);
    this.enemies[14 * this.mapWidth + 5] = new StaticEnemy(5, 14, this.camera, StaticEnemy.FIRE_TYPE);
    
    this.enemies[14 * this.mapWidth + 44] = new StaticEnemy(44, 14, this.camera, StaticEnemy.FIRE_TYPE);
    this.enemies[14 * this.mapWidth + 45] = new StaticEnemy(45, 14, this.camera, StaticEnemy.FIRE_TYPE);
    this.enemies[14 * this.mapWidth + 46] = new StaticEnemy(46, 14, this.camera, StaticEnemy.FIRE_TYPE);
    this.enemies[14 * this.mapWidth + 47] = new StaticEnemy(47, 14, this.camera, StaticEnemy.FIRE_TYPE);
    this.enemies[14 * this.mapWidth + 48] = new StaticEnemy(48, 14, this.camera, StaticEnemy.FIRE_TYPE);
    this.enemies[14 * this.mapWidth + 49] = new StaticEnemy(49, 14, this.camera, StaticEnemy.FIRE_TYPE);
    
    this.enemies[14 * this.mapWidth + 11] = new StaticEnemy(11, 14, this.camera, StaticEnemy.BUOY_TYPE);
    this.enemies[15 * this.mapWidth + 11] = new StaticEnemy(11, 15, this.camera, StaticEnemy.BUOY_TYPE);
    this.enemies[14 * this.mapWidth + 19] = new StaticEnemy(19, 14, this.camera, StaticEnemy.BUOY_TYPE);
    this.enemies[15 * this.mapWidth + 19] = new StaticEnemy(19, 15, this.camera, StaticEnemy.BUOY_TYPE);
    this.enemies[14 * this.mapWidth + 20] = new StaticEnemy(20, 14, this.camera, StaticEnemy.BUOY_TYPE);
    this.enemies[15 * this.mapWidth + 20] = new StaticEnemy(20, 15, this.camera, StaticEnemy.BUOY_TYPE);
    this.enemies[14 * this.mapWidth + 28] = new StaticEnemy(28, 14, this.camera, StaticEnemy.BUOY_TYPE);
    this.enemies[15 * this.mapWidth + 28] = new StaticEnemy(28, 15, this.camera, StaticEnemy.BUOY_TYPE);
    this.enemies[14 * this.mapWidth + 36] = new StaticEnemy(36, 14, this.camera, StaticEnemy.BUOY_TYPE);
    this.enemies[15 * this.mapWidth + 36] = new StaticEnemy(36, 15, this.camera, StaticEnemy.BUOY_TYPE);
    this.enemies[14 * this.mapWidth + 37] = new StaticEnemy(37, 14, this.camera, StaticEnemy.BUOY_TYPE);
    this.enemies[15 * this.mapWidth + 37] = new StaticEnemy(37, 15, this.camera, StaticEnemy.BUOY_TYPE);
    
    this.enemies[11 * this.mapWidth + 9] = new FlyDemonBossEnemy(9, 11, Config.tileSize * 3, Config.tileSize * 3, Config.tileSize * 2, 50, Config.tileSize * 4, -Config.tileSize * 2.5, Config.tileSize * 2, this, this.camera);
    
    
    this.loaded = true;
};

Level4.prototype.dispose = function(all) {
    if (this.loaded) {
        if (all) {
            this.loaded = false;
            this.coins = null;
        }
        this.enemies = null;
        this.tiles = null;
        try {
            if (this.music !== null) {
                this.music.stop();
            }
        } catch (e) {}
        this.music = null;
    }
};

Level4.prototype.checkpoint = function(deltatime) {
    
};