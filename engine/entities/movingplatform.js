// Static class members
MovingPlatform.VERTICAL = 1;
MovingPlatform.HORIZONTAL = 2;
MovingPlatform.VISIBILITY_DISTANCE = 2000;

function MovingPlatform(x, y, width, height, type, velocity, maxDistance, camera) {
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
    this.direction = -1;
}

MovingPlatform.prototype.draw = function(context) {
    if (this.type === MovingPlatform.VERTICAL) {
        context.drawImage(Assets.tilesAtlas, Atlas.tiles.rock.x, Atlas.tiles.rock.y, Atlas.tiles.rock.width, Atlas.tiles.rock.height, this.x - this.camera.x, this.y - this.traveled - this.camera.y, this.width, this.height);
    }
    if (this.type === MovingPlatform.HORIZONTAL) {
        context.drawImage(Assets.tilesAtlas, Atlas.tiles.rock.x, Atlas.tiles.rock.y, Atlas.tiles.rock.width, Atlas.tiles.rock.height, this.x - this.traveled - this.camera.x, this.y - this.camera.y, this.width, this.height);
    }
};

MovingPlatform.prototype.update = function(deltatime) {
    if (this.type === MovingPlatform.HORIZONTAL) {
        if (this.direction === -1) {          
            this.traveled -= this.velocity * deltatime;
            if (this.traveled <= -this.maxDistance) {
                this.direction = 1;
                this.moveDistance = 0;
            } else {
                this.moveDistance = this.velocity * deltatime;
            }
        } else {          
            this.traveled += this.velocity * deltatime;
            if (this.traveled >= 0) {
                this.direction = -1;
                this.moveDistance = 0;
            } else {
                this.moveDistance = -(this.velocity * deltatime);
            }
        }
    } else {
        if (this.direction === -1) {           
            this.traveled += this.velocity * deltatime;
            if (this.traveled >= this.maxDistance) {
                this.direction = 1;
                this.moveDistance = 0;
            } else {
                this.moveDistance = -(this.velocity * deltatime);
            }
        } else {          
            this.traveled -= this.velocity * deltatime;
            if (this.traveled <= 0) {
                this.direction = -1;
                this.moveDistance = 0;
            } else {
                this.moveDistance = this.velocity * deltatime;
            }
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
