function StingEnemy(x, y, camera) {
    this.width = Config.tileSize;
    this.height = Config.tileSize;
    this.x = x * this.width;
    this.y = y * this.height;
    this.camera = camera;
}

StingEnemy.prototype.update = function(deltatime) {
};

StingEnemy.prototype.draw = function(context) {
    var key = "pick";
    context.drawImage(Assets.tilesAtlas1, Atlas.tiles1[key].x, Atlas.tiles1[key].y, Atlas.tiles1[key].width, Atlas.tiles1[key].height, this.x - this.camera.x, this.y - this.camera.y, this.width + 1, this.height + 1);
};

StingEnemy.prototype.left = function() {
    return this.x - this.camera.x;
};

StingEnemy.prototype.right = function() {
    return (this.x + this.width) - this.camera.x;
};

StingEnemy.prototype.top = function() {
    return this.y - this.camera.y;
};

StingEnemy.prototype.bottom = function() {
    return (this.y + this.height) - this.camera.y;
};