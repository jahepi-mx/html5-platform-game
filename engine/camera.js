function Camera() {
    this.x = 0;
    this.y = 0;
    this.width = 6; // 6 visible tiles
    this.height = 4; // 4 visible tiles
}

Camera.prototype.move = function(x, y) {
    this.x = x;
    this.y = y;
};