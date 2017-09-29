// Static class members
MovingPlatform.VERTICAL = 1;
MovingPlatform.HORIZONTAL = 2;
MovingPlatform.VISIBILITY_DISTANCE = 800;

function MovingPlatform(x, y, width, height, type, velocity, maxDistance, camera, direction) {
    this.camera = camera;
    this.width = width;
    this.height = height;
    this.type = type;
    
    this.x = x * Config.tileSize;
    if (this.type === MovingPlatform.VERTICAL) {
        this.y = y * Config.tileSize;
    }
    if (this.type === MovingPlatform.HORIZONTAL) {
        this.y = y * Config.tileSize;
    }
    this.maxDistance = maxDistance;
    this.velocity = velocity;
    this.traveled = 0;
    this.moveDistance = 0;
    this.direction = direction;
    if (this.direction === 1) {
        this.traveled = this.maxDistance;
    }
}

MovingPlatform.prototype.draw = function(context) {
    if (this.type === MovingPlatform.VERTICAL) {
        //context.fillStyle = "white";
        //context.fillRect(this.x - this.camera.x, this.y - this.traveled - this.camera.y, this.width, this.height);
        context.drawImage(Assets.tilesAtlas, Atlas.tiles.set2_goldenblock.x, Atlas.tiles.set2_goldenblock.y, Atlas.tiles.set2_goldenblock.width, Atlas.tiles.set2_goldenblock.height, this.x - this.camera.x, this.y - this.traveled - this.camera.y, this.width, this.height);
    }
    if (this.type === MovingPlatform.HORIZONTAL) {
        //context.fillStyle = "white";
        //context.fillRect(this.x - this.traveled - this.camera.x, this.y - this.camera.y, this.width, this.height);
        context.drawImage(Assets.tilesAtlas, Atlas.tiles.set2_goldenblock.x, Atlas.tiles.set2_goldenblock.y, Atlas.tiles.set2_goldenblock.width, Atlas.tiles.set2_goldenblock.height, this.x - this.traveled - this.camera.x, this.y - this.camera.y, this.width, this.height);
    }
};

MovingPlatform.prototype.update = function(deltatime) {
    if (this.direction === -1) {
        this.moveDistance = -(this.velocity * deltatime);
        this.traveled += this.velocity * deltatime;
        if (this.traveled >= this.maxDistance) {
            this.direction = 1;
        }
    } else {
        this.moveDistance = this.velocity * deltatime;
        this.traveled -= this.velocity * deltatime;
        if (this.traveled <= 0) {
            this.direction = -1;
        }
    }
};

MovingPlatform.prototype.collide = function(entity) {
    // AABB Collision detection
    var diffX = Math.abs((this.left() + this.width / 2) - (entity.left() + entity.width / 2));
    var diffY = Math.abs((this.top() + this.height / 2) - (entity.top() + entity.height / 2));
    var sizeX = this.width / 2 + entity.width / 2;
    var sizeY = this.height / 2 + entity.height / 2;
    return diffX < sizeX && diffY < sizeY;
};

MovingPlatform.prototype.left = function() {
    if (this.type === MovingPlatform.VERTICAL) {
        return this.x - this.camera.x;
    }
    return this.x - this.traveled - this.camera.x;
};

MovingPlatform.prototype.right = function() {
    if (this.type === MovingPlatform.VERTICAL) {
        return (this.x + this.width) - this.camera.x;
    }
    return (this.x + this.width) - this.traveled - this.camera.x;
};

MovingPlatform.prototype.top = function() {
    if (this.type === MovingPlatform.VERTICAL) {
        return this.y - this.traveled - this.camera.y;
    }
    return this.y - this.camera.y;
};

MovingPlatform.prototype.bottom = function() {
    if (this.type === MovingPlatform.VERTICAL) {
        return (this.y + this.height) - this.traveled - this.camera.y;
    }
    return (this.y + this.height) - this.camera.y;
};
