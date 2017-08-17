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