function Level1(camera) {
    
    this.startX = Config.tileSize * 4;
    this.startY = Config.tileSize * 2;
    this.camera = camera;
    this.tiles = [];
    this.enemies = [];
    
    this.map = [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,2,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2,3,3,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ];
    
    for (var i = 0; i < this.map.length; i++) {
        if (this.map[i] === 0) {
            this.tiles[i] = null;
        } else {
            this.tiles[i] = new Tile(i % Config.mapWidth, parseInt(i / Config.mapWidth), Config.tileSize, Config.tileSize, this.map[i], this.camera);
        }
        this.enemies[i] = null;
    }
    
    this.enemies[6 * Config.mapWidth + 4] = new BlockEnemy(4, 6, 50, 50, BlockEnemy.VERTICAL, 50, 150, this.camera, -1);
    this.enemies[5 * Config.mapWidth + 11] = new BlockEnemy(11, 5, 50, 50, BlockEnemy.VERTICAL, 50, 150, this.camera, 1);
    this.enemies[6 * Config.mapWidth + 21] = new BlockEnemy(21, 6, 50, 50, BlockEnemy.HORIZONTAL, 100, 310, this.camera, -1);
    this.enemies[5 * Config.mapWidth + 21] = new BlockEnemy(21, 5, 50, 50, BlockEnemy.HORIZONTAL, 100, 310, this.camera, 1);
    this.enemies[4 * Config.mapWidth + 20] = new BlockEnemy(20, 4, 50, 50, BlockEnemy.HORIZONTAL, 50, 150, this.camera, -1);
    this.enemies[6 * Config.mapWidth + 7] = new GiantFatEnemy(7, 6, 100 * 2, 100, 4, this.camera);
    this.enemies[6 * Config.mapWidth + 26] = new GiantFatEnemy(26, 6, 125 * 2, 125, 4, this.camera);
    this.enemies[6 * Config.mapWidth + 30] = new GiantFatEnemy(30, 6, 150 * 2, 150, 4, this.camera);
    this.enemies[7 * Config.mapWidth + 6] = new LavaEnemy(6, 7, this.camera);
    this.enemies[7 * Config.mapWidth + 12] = new LavaEnemy(12, 7, this.camera);
    this.enemies[7 * Config.mapWidth + 13] = new LavaEnemy(13, 7, this.camera);
    this.enemies[7 * Config.mapWidth + 15] = new StingEnemy(15, 7, this.camera);
}
