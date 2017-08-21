function Level1(camera) {
    
    this.camera = camera;
    this.startX = Config.tileSize * 0.50;
    this.startY = Config.tileSize * 2;
    this.tiles = [];
    this.enemies = [];
    
    this.map = [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,2,3,3,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ];
    
    for (var i = 0; i < this.map.length; i++) {
        this.tiles[i] = new Tile(i % Config.mapWidth, parseInt(i / Config.mapWidth), Config.tileSize, Config.tileSize, this.map[i], this.camera);
        this.enemies[i] = null;
    }
    
    this.enemies[6 * Config.mapWidth + 4] = new BlockEnemy(4, 6, 50, 50, BlockEnemy.VERTICAL, 50, 150, this.camera, -1);
    this.enemies[5 * Config.mapWidth + 11] = new BlockEnemy(11, 5, 50, 50, BlockEnemy.VERTICAL, 50, 150, this.camera, 1);
    this.enemies[6 * Config.mapWidth + 21] = new BlockEnemy(21, 6, 50, 50, BlockEnemy.HORIZONTAL, 100, 310, this.camera, -1);
    this.enemies[5 * Config.mapWidth + 21] = new BlockEnemy(21, 5, 50, 50, BlockEnemy.HORIZONTAL, 100, 310, this.camera, 1);
    this.enemies[4 * Config.mapWidth + 20] = new BlockEnemy(20, 4, 50, 50, BlockEnemy.HORIZONTAL, 50, 150, this.camera, -1);
    
}
