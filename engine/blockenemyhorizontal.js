Object.defineProperty(BlockEnemyHorizontal, "TYPE", { value: 2 });

function BlockEnemyHorizontal(x, y, camera) {
    this.camera = camera;
    this.width = 50;
    this.height = 50;
    this.x = x * Config.tileSize + (Config.tileSize - this.width) / 2;
    this.y = y * Config.tileSize + (Config.tileSize - this.height);
    this.maxDistance = 250;
    this.traveled = 0;
    this.direction = -1;
}

BlockEnemyHorizontal.prototype.draw = function(context) {
    if (this.direction === -1) {
        context.drawImage(Assets.enemies.blockHorizontalBack, this.x - this.traveled - this.camera.x, this.y - this.camera.y, this.width, this.height);
    } else {
        context.drawImage(Assets.enemies.blockHorizontalFront, this.x - this.traveled - this.camera.x, this.y - this.camera.y, this.width, this.height);
    }
};

BlockEnemyHorizontal.prototype.update = function(deltatime) {
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

BlockEnemyHorizontal.prototype.left = function() {
    return this.x - this.traveled - this.camera.x;
};

BlockEnemyHorizontal.prototype.right = function() {
    return (this.x + this.width) - (this.traveled - this.camera.x);
};

BlockEnemyHorizontal.prototype.top = function() {
    return this.y - this.camera.y;
};

BlockEnemyHorizontal.prototype.bottom = function() {
    return (this.y + this.height) - this.camera.y;
};