function Camera() {
    this.x = 0;
    this.y = 0;
    this.width = Config.tileSize * 13; // 13 visible tiles
    this.height = Config.tileSize * 6; // 6 visible tiles
    this.fullWidth = Config.mapWidth * Config.tileSize;
    this.fullHeight = Config.mapHeight * Config.tileSize;
}

Camera.prototype.move = function(x, y) {
    var newX = (x / Config.worldWidth) * this.fullWidth;
    var newY = ((y / Config.worldHeight) * this.fullHeight) - 250;
    this.x = newX;
    this.y = newY;
};