function Camera() {
    this.x = 0;
    this.y = 0;
    this.width = Config.tileSize * 10; // 10 visible tiles
    this.height = Config.tileSize * 6; // 6 visible tiles
}

Camera.prototype.move = function(x, y) {
    this.x = x;
    this.y = y;
};