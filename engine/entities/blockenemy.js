Object.defineProperty(BlockEnemy, "VERTICAL", { value: 1 });
Object.defineProperty(BlockEnemy, "HORIZONTAL", { value: 2 });

function BlockEnemy(x, y, width, height, type, velocity, maxDistance, camera, direction) {
    this.camera = camera;
    this.width = width;
    this.height = height;
    this.type = type;
    this.x = x * Config.tileSize + (Config.tileSize - this.width) / 2;
    if (this.type === BlockEnemy.VERTICAL) {
        this.y = y * Config.tileSize + (Config.tileSize - this.height) / 2;
    }
    if (this.type === BlockEnemy.HORIZONTAL) {
        this.y = y * Config.tileSize + (Config.tileSize - this.height);
    }
    this.maxDistance = maxDistance;
    this.velocity = velocity;
    this.traveled = 0;
    this.direction = direction;
    if (this.direction === 1) {
        this.traveled = this.maxDistance;
    }
}

BlockEnemy.prototype.draw = function(context) {
    if (this.type === BlockEnemy.VERTICAL) {
        context.drawImage(Assets.enemiesAtlas, Atlas.enemies.block.x, Atlas.enemies.block.y, Atlas.enemies.block.width, Atlas.enemies.block.height, this.x - this.camera.x, this.y - this.traveled - this.camera.y, this.width, this.height);
    }
    if (this.type === BlockEnemy.HORIZONTAL) {
        if (this.direction === -1) {
            context.drawImage(Assets.enemiesAtlas, Atlas.enemies.blockHorizontalBack.x, Atlas.enemies.blockHorizontalBack.y, Atlas.enemies.blockHorizontalBack.width, Atlas.enemies.blockHorizontalBack.height, this.x - this.traveled - this.camera.x, this.y - this.camera.y, this.width, this.height);
        } else {
            context.drawImage(Assets.enemiesAtlas, Atlas.enemies.blockHorizontalFront.x, Atlas.enemies.blockHorizontalFront.y, Atlas.enemies.blockHorizontalFront.width, Atlas.enemies.blockHorizontalFront.height, this.x - this.traveled - this.camera.x, this.y - this.camera.y, this.width, this.height);
        }
    }
};

BlockEnemy.prototype.update = function(deltatime) {
    if (this.direction === -1) {
        this.traveled += this.velocity * deltatime;
        if (this.traveled >= this.maxDistance) {
            this.direction = 1;
        }
    } else {
        this.traveled -= this.velocity * deltatime;
        if (this.traveled <= 0) {
            this.direction = -1;
        }
    }
};

BlockEnemy.prototype.left = function() {
    if (this.type === BlockEnemy.VERTICAL) {
        return this.x - this.camera.x;
    }
    return this.x - this.traveled - this.camera.x;
};

BlockEnemy.prototype.right = function() {
    if (this.type === BlockEnemy.VERTICAL) {
        return (this.x + this.width) - this.camera.x;
    }
    return (this.x + this.width) - (this.traveled - this.camera.x);
};

BlockEnemy.prototype.top = function() {
    if (this.type === BlockEnemy.VERTICAL) {
        return this.y - this.traveled - this.camera.y;
    }
    return this.y - this.camera.y;
};

BlockEnemy.prototype.bottom = function() {
    if (this.type === BlockEnemy.VERTICAL) {
        return (this.y + this.height) - (this.traveled - this.camera.y);
    }
    return (this.y + this.height) - this.camera.y;
};