function Level1(camera) {
    
    this.startX = Config.tileSize * 0.8;
    this.startY = Config.tileSize * 1;
    this.camera = camera;
    this.tiles = [];
    this.enemies = [];
    
    this.map = [
        15,14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,16,15,
        15,14, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,16,15,
        15,14, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,16,15,
        15,14, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17,18,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,16,15,
        15,14, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,21, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,29,28,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,16,15,
        15,14, 0, 0,20, 0, 0, 0,21, 0,20, 0, 0, 0,22, 0, 0,23, 0,23, 0, 0, 0,13,12,12,12,11, 0, 0,22, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0,22, 0, 0, 0, 0,21,21,21,21,21,21,21, 0,29,28,27, 0, 0,20, 0,20, 0, 0, 0, 0,22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,16,15,
        15, 2,18,18,18,18, 7, 0, 8,18,18,18, 7, 0,10, 0, 8,18,18,18,18,18,19, 0, 0, 0, 0, 0, 0,17,18,18,19, 0,17,19, 1, 1, 1, 0,17, 7, 0, 0,10, 0, 0, 8,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18, 3,15,
        15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,14, 0, 0, 0, 0, 0, 0,16,15,15,15,15,15,14, 1, 1, 1, 0,16,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15
    ];
    
    for (var i = 0; i < this.map.length; i++) {
        if (this.map[i] === 0) {
            this.tiles[i] = null;
        } else {
            this.tiles[i] = new Tile(i % Config.mapWidth, parseInt(i / Config.mapWidth), Config.tileSize, Config.tileSize, this.map[i], this.camera);
        }
        this.enemies[i] = null;
    }
    this.enemies[6 * Config.mapWidth + 7] = new LavaEnemy(7, 6, this.camera);
    this.enemies[6 * Config.mapWidth + 42] = new LavaEnemy(42, 6, this.camera);
    this.enemies[6 * Config.mapWidth + 43] = new LavaEnemy(43, 6, this.camera);
    this.enemies[6 * Config.mapWidth + 45] = new LavaEnemy(45, 6, this.camera);
    this.enemies[6 * Config.mapWidth + 46] = new LavaEnemy(46, 6, this.camera);
    this.enemies[6 * Config.mapWidth + 13] = new LavaEnemy(13, 6, this.camera);
    this.enemies[6 * Config.mapWidth + 15] = new LavaEnemy(15, 6, this.camera);
    this.enemies[6 * Config.mapWidth + 33] = new StingEnemy(33, 6, this.camera);
    this.enemies[4 * Config.mapWidth + 27] = new BlockEnemy(27, 4, 50, 50, BlockEnemy.HORIZONTAL, 100, 310, this.camera, 1);
    this.enemies[5 * Config.mapWidth + 36] = new BlockEnemy(36, 5, 50, 50, BlockEnemy.VERTICAL, 50, 250, this.camera, -1);
    this.enemies[5 * Config.mapWidth + 44] = new GiantFatEnemy(44, 5, 70 * 2, 70, 1, this.camera);
    this.enemies[2 * Config.mapWidth + 58] = new GiantFatEnemy(58, 2, 90 * 2, 90, 2, this.camera);
    this.enemies[5 * Config.mapWidth + 67] = new GiantFatEnemy(67, 5, 200 * 2, 200, 20, this.camera);
}
