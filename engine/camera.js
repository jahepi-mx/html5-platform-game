function Camera() {
    this.x = 0;
    this.y = 0;
    this.width = 360 * 5;
    this.height = 360 * 5;
}

Camera.prototype.move = function(x, y) {
    this.x = x;
    this.y = y;
};