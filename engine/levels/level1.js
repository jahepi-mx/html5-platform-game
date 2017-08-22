Object.defineProperty(Level1, "START_X", { value: Config.tileSize * 4 });
Object.defineProperty(Level1, "START_Y", { value: Config.tileSize * 2 });

function Level1(camera, hero) {
    
    this.camera = camera;
    this.hero = hero;
    this.tiles = [];
    this.enemies = [];
    
    this.map = [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,3,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ];
    
    this.hero = hero;
    for (var i = 0; i < this.map.length; i++) {
        this.tiles[i] = new Tile(i % Config.mapWidth, parseInt(i / Config.mapWidth), Config.tileSize, Config.tileSize, this.map[i], this.camera);
        this.enemies[i] = null;
    }
    
    this.enemies[6 * Config.mapWidth + 4] = new BlockEnemy(4, 6, 50, 50, BlockEnemy.VERTICAL, 50, 150, this.camera, -1);
    this.enemies[5 * Config.mapWidth + 11] = new BlockEnemy(11, 5, 50, 50, BlockEnemy.VERTICAL, 50, 150, this.camera, 1);
    this.enemies[6 * Config.mapWidth + 21] = new BlockEnemy(21, 6, 50, 50, BlockEnemy.HORIZONTAL, 100, 310, this.camera, -1);
    this.enemies[5 * Config.mapWidth + 21] = new BlockEnemy(21, 5, 50, 50, BlockEnemy.HORIZONTAL, 100, 310, this.camera, 1);
    this.enemies[4 * Config.mapWidth + 20] = new BlockEnemy(20, 4, 50, 50, BlockEnemy.HORIZONTAL, 50, 150, this.camera, -1);
    this.enemies[6 * Config.mapWidth + 2] = new GiantFatEnemy(2, 6, 100 * 2, 100, 4, this.camera);
    this.enemies[6 * Config.mapWidth + 26] = new GiantFatEnemy(26, 6, 125 * 2, 125, 4, this.camera);
    this.enemies[6 * Config.mapWidth + 3] = new GiantFatEnemy(30, 6, 150 * 2, 150, 4, this.camera);
}
