function Level1(camera) {
    
    this.startX = Config.tileSize * 1.3;
    this.startY = Config.tileSize * 1;
    this.camera = camera;
    this.tiles = [];
    this.enemies = [];
    
    this.map = [
        15,15,15,15,15,15,14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,16,15,15,15,15,15,15,
        15,15,15,15,15,15,14, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,16,15,15,15,15,15,15,
        15,15,15,15,15,15,14, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,16,15,15,15,15,15,15,
        15,15,15,15,15,15,14, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17,18,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,16,15,15,15,15,15,15,
        15,15,15,15,15,15,14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,21, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,29,28,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,16,15,15,15,15,15,15,
        15,15,15,15,15,15,14, 0, 0,20, 0, 1, 0,21, 0,20, 0, 0, 0,22, 0, 0,23, 0,23, 0, 0, 0,13,12,12,12,11, 0, 0,22, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0,22, 0, 0, 0, 0,21,21,21,21,21,21,21, 0,29,28,27, 0, 0,20, 0,20, 0, 0, 0, 0,22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,16,15,15,15,15,15,15,
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
            this.tiles[i] = new Tile(i % Config.mapWidth, Math.floor(i / Config.mapWidth), Config.tileSize, Config.tileSize, this.map[i], this.camera);
        }
        this.enemies[i] = null;
    }
    this.enemies[6 * Config.mapWidth + 12] = new LavaEnemy(12, 6, this.camera);
    this.enemies[6 * Config.mapWidth + 47] = new LavaEnemy(47, 6, this.camera);
    this.enemies[6 * Config.mapWidth + 48] = new LavaEnemy(48, 6, this.camera);
    this.enemies[6 * Config.mapWidth + 50] = new LavaEnemy(50, 6, this.camera);
    this.enemies[6 * Config.mapWidth + 51] = new LavaEnemy(51, 6, this.camera);
    this.enemies[6 * Config.mapWidth + 18] = new LavaEnemy(18, 6, this.camera);
    this.enemies[6 * Config.mapWidth + 20] = new LavaEnemy(20, 6, this.camera);
    this.enemies[6 * Config.mapWidth + 38] = new StingEnemy(38, 6, this.camera);
    this.enemies[4 * Config.mapWidth + 32] = new BlockEnemy(32, 4, 50, 50, BlockEnemy.HORIZONTAL, 100, 310, this.camera, 1);
    this.enemies[5 * Config.mapWidth + 41] = new BlockEnemy(41, 5, 50, 50, BlockEnemy.VERTICAL, 50, 250, this.camera, -1);
    this.enemies[5 * Config.mapWidth + 49] = new GiantFatEnemy(49, 5, 70 * 2, 70, 1, this.camera);
    this.enemies[2 * Config.mapWidth + 63] = new GiantFatEnemy(63, 2, 90 * 2, 90, 2, this.camera);
    this.enemies[5 * Config.mapWidth + 72] = new GiantFatEnemy(72, 5, 200 * 2, 200, 20, this.camera);
}
