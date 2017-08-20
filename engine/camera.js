function Camera() {
    this.x = 0;
    this.y = 0;
    this.width = 360 * 5;
    this.height = 360 * 5;
    this.fullWidth = Config.mapWidth * Config.tileSize;
    this.fullHeight = Config.mapHeight * Config.tileSize;
}

Camera.prototype.move = function(x, y) {
    var newX = (x / Config.worldWidth) * this.fullWidth;
    var newY = (y / Config.worldHeight) * this.fullHeight;
    this.x = newX;
    this.y = newY;
};