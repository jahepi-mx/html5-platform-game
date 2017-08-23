function Camera() {
    this.x = 0;
    this.y = 0;
    this.width = Config.tileSize * 9; // 3 tiles visible
    this.height = Config.tileSize * 5; // 3 tiles visible
    this.fullWidth = Config.mapWidth * Config.tileSize;
    this.fullHeight = Config.mapHeight * Config.tileSize;
}

Camera.prototype.move = function(x, y) {
    var newX = (x / Config.worldWidth) * this.fullWidth;
    var newY = (y / Config.worldHeight) * this.fullHeight;
    this.x = newX;
    this.y = newY;
};