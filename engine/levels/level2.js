function Level2() {
    this.loaded = false;
}

Level2.prototype.setup = function(camera) {
    this.loaded = true;
    this.levelName = "Level 2: Catacumbs";
    this.mapWidth = 100;
    this.mapHeight = 20;
    this.startX = Config.tileSize * 8;
    this.startY = Config.tileSize * 9;
    this.camera = camera;
    this.tiles = [];
    this.enemies = [];
    this.coins = [];
    this.platforms = [];
    this.totalNumberOfCoins = 5;
    this.currentNumberOfCoins = 0;
    this.music = Assets.playAudio(Assets.boss_music, true);
    this.atlasBackground = Atlas.tiles.sky_background;
    this.visibilityEnemyRatioX = 9; // 9 tiles 
    this.visibilityEnemyRatioY = 5; // 5 tiles
    
    this.map = [
        43, 43, 43, 43, 47, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 44, 43, 43, 43, 43, 43, 43, 43, 44, 43, 47, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 44, 43, 43, 43, 43, 43, 43, 43, 44, 43, 47, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 44, 43, 43, 43, 43, 43, 43, 43, 44, 43, 47, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 44, 43, 43, 43, 43, 43, 43, 43, 43, 43, 47, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 44, 43, 43, 44, 43, 43, 43, 44, 43, 43, 47, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 44, 43, 43, 44, 43, 43, 43, 44, 44, 43, 47, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 44, 43, 43, 44, 43, 43, 43, 43, 44, 43, 47, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 44, 43, 43, 44, 44, 43, 43, 43, 44, 43, 47, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 93, 94, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 44, 44, 43, 44, 44, 43, 43, 43, 44, 43, 47, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 39, 44, 44, 43, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 43, 43, 44, 44, 44, 39, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 95, 96, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 44, 44, 43, 44, 44, 43, 43, 43, 44, 43, 47, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 38, 44, 44, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 44, 43, 44, 44, 44, 44, 43, 44, 44, 43, 43, 43, 43, 43, 43, 43, 44, 44, 44, 38, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 44, 44, 43, 43, 44, 43, 43, 43, 43, 43, 47, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 38, 44, 44, 43, 44, 44, 44, 44, 44, 44, 43, 43, 43, 44, 43, 43, 44, 44, 44, 44, 44, 44, 43, 43, 43, 43, 43, 44, 43, 43, 44, 44, 38, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 44, 44, 44, 43, 43, 43, 43, 43, 43, 43, 43, 47, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 38, 44, 44, 43, 43, 43, 44, 44, 44, 44, 44, 44, 44, 43, 44, 43, 43, 43, 44, 44, 44, 44, 44, 43, 43, 43, 43, 43, 43, 44, 44, 44, 38, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 44, 43, 44, 43, 43, 43, 43, 43, 43, 43, 43, 47, 49, 49, 49, 49, 57, 58, 49, 49, 49, 49, 92, 49, 49, 49, 49, 38, 44, 44, 43, 43, 43, 43, 43, 43, 44, 44, 44, 44, 43, 44, 43, 43, 43, 43, 44, 44, 43, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 38, 49, 49, 49, 49, 49, 57, 58, 49, 49, 49, 49, 49, 49, 44, 43, 43, 43, 43, 43, 45, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 44, 43, 43, 44, 43, 43, 43, 43, 43, 44, 43, 47, 49, 49, 49, 49, 59, 60, 49, 49, 92, 49, 90, 49, 49, 49, 49, 38, 44, 44, 43, 43, 43, 43, 44, 44, 44, 44, 44, 44, 43, 43, 43, 44, 43, 44, 44, 44, 44, 44, 44, 44, 43, 43, 43, 43, 43, 43, 44, 38, 49, 49, 49, 49, 49, 59, 60, 49, 49, 49, 49, 46, 43, 43, 43, 43, 44, 43, 43, 43, 43, 45, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 44, 43, 43, 44, 43, 43, 43, 43, 43, 44, 44, 44, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 44, 44, 44, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 44, 44, 44, 44, 44, 44, 43, 43, 43, 43, 43, 43, 43, 44, 44, 43, 43, 43, 43, 44, 44, 44, 44, 44, 44, 44, 44, 44, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 44, 44, 44, 44, 44, 44, 44, 44, 43, 43, 43, 43, 43, 43, 43, 44, 44, 44, 44, 44, 44, 44, 43, 44, 44, 44, 44, 44, 44, 44, 43, 44, 43, 43, 43, 43, 43, 43, 44, 44, 44, 44, 44, 43, 44, 44, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 44, 44, 44, 44, 44, 44, 44, 44, 43, 43, 43, 43, 43, 43, 43, 44, 44, 44, 44, 44, 44, 43, 43, 43, 44, 44, 44, 44, 43, 43, 43, 43, 43, 43, 43, 43, 44, 44, 44, 44, 44, 43, 43, 44, 44, 43, 43, 43, 43, 43, 43, 43, 43, 44, 44, 44, 44, 43, 43, 44, 44, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 44, 44, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 44, 44, 44, 43, 43, 43, 43, 43, 43, 43, 43, 43, 44, 43, 43, 43, 44, 44, 44, 44, 43, 43, 44, 44, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43
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
    
    //this.enemies[14 * this.mapWidth + 7] = new DragonBossEnemy(7, 14, 70 * 4, 210, 30, this, this.camera);
    this.coins[14 * this.mapWidth + 84] = new Coin(84, 14, this.camera);
    this.coins[14 * this.mapWidth + 85] = new Coin(85, 14, this.camera);
    this.coins[14 * this.mapWidth + 86] = new Coin(86, 14, this.camera);
    this.coins[14 * this.mapWidth + 87] = new Coin(87, 14, this.camera);
    this.coins[14 * this.mapWidth + 88] = new Coin(88, 14, this.camera);
    
    this.platforms[0] = new MovingPlatform(12, 14, 100, 50, MovingPlatform.VERTICAL, 30, 200, this.camera, 1);
    this.platforms[1] = new MovingPlatform(12, 14, 100, 50, MovingPlatform.HORIZONTAL, 30, 200, this.camera, 1);
};

Level2.prototype.dispose = function() {
    if (this.loaded) {
        this.loaded = false;
        this.enemies = null;
        this.tiles = null;
        this.coins = null;
        try {
            this.music.stop();
        } catch (e) {}
        this.music = null;
    }
};