function Level1() {
    this.loaded = false;
}

Level1.prototype.setup = function(camera) {
    this.loaded = true;
    this.levelName = "Level 1: Forgotten Forest";
    this.mapWidth = 94;
    this.mapHeight = 11;
    this.startX = Config.tileSize * 5;
    this.startY = Config.tileSize * 1;
    this.camera = camera;
    this.tiles = [];
    this.enemies = [];
    this.coins = [];
    this.totalNumberOfCoins = 2;
    this.currentNumberOfCoins = 0;
    this.music = Assets.playAudio(Assets.level1_music, true);
    this.atlasBackground = Atlas.tiles.sky_background;
    this.visibilityEnemyRatioX = 9; // 9 tiles 
    this.visibilityEnemyRatioY = 5; // 5 tiles
    
    this.map = [
        15,15,15,15,15,15,14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,16,15,15,15,15,15,15,
        15,15,15,15,15,15,14, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,16,15,15,15,15,15,15,
        15,15,15,15,15,15,14, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,16,15,15,15,15,15,15,
        15,15,15,15,15,15,14, 0, 1, 1, 1,37, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,36, 0, 0, 0, 0, 0, 0, 0, 0,22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17,18,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,16,15,15,15,15,15,15,
        15,15,15,15,15,15,14, 0, 0, 0, 0,36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,36,21, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,29,28,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,16,15,15,15,15,15,15,
        15,15,15,15,15,15,14, 0, 0,20, 0,36, 0,21, 0,20, 0, 0, 0,22, 0, 0,23, 0,23, 0, 0, 0,13,12,12,12,11, 0, 0,22, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0,22, 0, 0, 0, 0,21,21,21,21,21,21,21, 0,29,28,27, 0, 0,20, 0,20, 0, 0, 0, 0,22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,16,15,15,15,15,15,15,
        15,15,15,15,15,15, 2,18,18,18,18, 7, 0, 8,18,18,18, 7, 0,10, 0, 8,18,18,18,18,18,19, 0, 0, 0, 0, 0, 0,17,18,18,19, 0,17,19, 1, 1, 1, 0,17, 7, 0, 0,10, 0, 0, 8,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18, 3,15,15,15,15,15,15,
        15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,14, 0, 0, 0, 0, 0, 0,16,15,15,15,15,15,14, 1, 1, 1, 0,16,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,
        15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,14, 0, 0, 0, 0, 0, 0,16,15,15,15,15,15,14, 1, 1, 1, 0,16,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,
        15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,14, 0, 0, 0, 0, 0, 0,16,15,15,15,15,15,14, 1, 1, 1, 0,16,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,
        15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,14, 0, 0, 0, 0, 0, 0,16,15,15,15,15,15,14, 1, 1, 1, 0,16,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15
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
    
    this.coins[1 * this.mapWidth + 9] = new Coin(9, 1, this.camera);
    this.coins[2 * this.mapWidth + 9] = new Coin(9, 2, this.camera);

    this.enemies[6 * this.mapWidth + 12] = new LavaEnemy(12, 6, this.camera);
    //this.enemies[5 * this.mapWidth + 8] = new ZombieEnemy(8, 5, 70, 70, 30, 150, 2, this.camera);
    this.enemies[5 * this.mapWidth + 8] = new DragonBossEnemy(8, 5, 70 * 2, 70, 30, this, this.camera);
    //this.enemies[5 * this.mapWidth + 9] = new SkeletonEnemy(9, 5, 70, 70, 50, 100, 4, this.camera);
    //this.enemies[5 * this.mapWidth + 7] = new FlyDemonBossEnemy(7, 5, 70, 70, 50, 4, 350, -200, -100, this, this.camera);
    //this.enemies[5 * this.mapWidth + 7] = new FlyDemonEnemy(7, 5, 70, 70, 50, 50, 4, 300, -50, this.camera);
    //this.enemies[5 * this.mapWidth + 8] = new SpiderEnemy(7, 5, 70, 35, 50, 50, 100, 100, 4, this.camera);
    //this.enemies[5 * this.mapWidth + 6] = new ZombieEnemy(6, 5, 70, 70, 60, 90, 4, this.camera);
    this.enemies[6 * this.mapWidth + 47] = new LavaEnemy(47, 6, this.camera);
    this.enemies[6 * this.mapWidth + 48] = new LavaEnemy(48, 6, this.camera);
    this.enemies[6 * this.mapWidth + 50] = new LavaEnemy(50, 6, this.camera);
    this.enemies[6 * this.mapWidth + 51] = new LavaEnemy(51, 6, this.camera);
    this.enemies[6 * this.mapWidth + 18] = new LavaEnemy(18, 6, this.camera);
    this.enemies[6 * this.mapWidth + 20] = new LavaEnemy(20, 6, this.camera);
    this.enemies[6 * this.mapWidth + 38] = new StaticEnemy(38, 6, this.camera, StaticEnemy.STING_TYPE);
    this.enemies[4 * this.mapWidth + 32] = new BeetleEnemy(32, 4, 50, 60, BeetleEnemy.HORIZONTAL, 100, 310, this.camera, 1);
    this.enemies[5 * this.mapWidth + 41] = new BeetleEnemy(41, 5, 60, 60, BeetleEnemy.VERTICAL, 50, 250, this.camera, -1);
    this.enemies[5 * this.mapWidth + 49] = new GiantFatEnemy(49, 5, 70 * 2, 70, 1, this.camera);
    this.enemies[2 * this.mapWidth + 63] = new GiantFatEnemy(63, 2, 90 * 2, 90, 2, this.camera);
    this.enemies[5 * this.mapWidth + 72] = new GiantFatEnemy(72, 5, 200 * 2, 200, 20, this.camera);
};

Level1.prototype.dispose = function() {
    if (this.loaded) {
        this.loaded = false;
        this.enemies = null;
        this.tiles = null;
        this.coins = null;
        this.music.stop();
        this.music = null;
    }
};