function Camera() {
    this.x = 0;
    this.y = 0;
    this.width = 360 * 3;
    this.height = 360 * 3;
}

Camera.prototype.move = function(x, y) {
    this.x = x;
    this.y = y;
};