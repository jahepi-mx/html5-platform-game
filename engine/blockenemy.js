Object.defineProperty(BlockEnemy, "TYPE", { value: 1 });

function BlockEnemy(x, y, camera) {
    this.camera = camera;
    this.width = 50;
    this.height = 50;
    this.x = x * Config.tileSize + (Config.tileSize - this.width) / 2;
    this.y = y * Config.tileSize + (Config.tileSize - this.height) / 2;
    this.maxDistance = 150;
    this.traveled = 0;
    this.direction = -1;
}

BlockEnemy.prototype.draw = function(context) {
    context.drawImage(Assets.enemies.block, this.x - this.camera.x, this.y - this.traveled - this.camera.y, this.width, this.height);
};

BlockEnemy.prototype.update = function(deltatime) {
    if (this.direction === -1) {
        this.traveled += 50 * deltatime;
        if (this.traveled >= this.maxDistance) {
            this.direction = 1;
        }
    } else {
        this.traveled -= 50 * deltatime;
        if (this.traveled <= 0) {
            this.direction = -1;
        }
    }
};

BlockEnemy.prototype.left = function() {
    return this.x - this.camera.x;
};

BlockEnemy.prototype.right = function() {
    return (this.x + this.width) - this.camera.x;
};

BlockEnemy.prototype.top = function() {
    return this.y - this.traveled - this.camera.y;
};

BlockEnemy.prototype.bottom = function() {
    return (this.y + this.height) - (this.traveled - this.camera.y);
};