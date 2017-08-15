function Tile(x, y, width, height, type, camera) {
    this.x = x * width;
    this.y = y * height;
    this.width = width;
    this.height = height;
    this.type = type;
    this.camera = camera;
}

Tile.prototype.left = function() {
    return this.x - this.camera.x;
};

Tile.prototype.right = function() {
    return (this.x + this.width) - this.camera.x;
};

Tile.prototype.top = function() {
    return this.y - this.camera.y;
};

Tile.prototype.bottom = function() {
    return (this.y + this.height) - this.camera.y;
};

Tile.prototype.draw = function(context) {
    if (Config.debug) {
        context.fillStyle = "white";
        context.fillRect(this.x - this.camera.x, this.y - this.camera.y, this.width, this.height);
    } else {
        //context.drawImage(sandImg, this.x - this.camera.x, this.y - this.camera.y, this.width, this.height);
    }
};
