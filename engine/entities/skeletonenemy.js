function SkeletonEnemy(x, y, width, height, velocityX, offset, health, camera) {
    this.camera = camera;
    this.width = width;
    this.height = height;
    this.isDisposable = false;
    this.health = health;
    this.isDead = false;
    this.isMortal = true;
    this.isJumping = false;
    this.hasGuns = false;
    
    this.leftAnimation = new Animation(3, 1);
    this.rightAnimation = new Animation(3, 1);
    this.frontAnimation = new Animation(3, 1);
    this.deadAnimation = new Animation(6, 1);
    this.deadAnimation.stopAtSequenceNumber(1, this.onStopDeadAnimation.bind(this));
    this.directions = [-1, 0, 1];
    
    this.offset = offset;
    this.x = x * Config.tileSize + (Config.tileSize - this.width) / 2;
    this.y = y * Config.tileSize + (Config.tileSize - this.height);
    this.velocityX = velocityX;
    this.velocityY = 0;
    this.traveledX = 0;
    this.traveledY = 0;
    this.direction = this.directions[Math.round(Math.random() * 2)];
    this.changeDirection = Math.random() * 2 + 2;
    this.changeDirectionTime = 0;
    this.jumpTime = 0;
    this.jumpTimeLimit = Math.random() * 3 + 2;
}

SkeletonEnemy.prototype.onStopDeadAnimation = function() {
    this.isDisposable = true;
};

SkeletonEnemy.prototype.draw = function(context) {
    var name = "";
    if (this.isDead) {
        name = "explo_" + (this.deadAnimation.getFrame() + 1);
    } else if (this.direction === 0) {
        name = "skeleton_" + (this.frontAnimation.getFrame() + 1);
    } else if (this.direction === -1) {
        name = "skeleton_left_" + (this.leftAnimation.getFrame() + 1);
    } else {
        name = "skeleton_right_" + (this.rightAnimation.getFrame() + 1);
    }
    context.drawImage(Assets.enemiesAtlas, Atlas.enemies[name].x, Atlas.enemies[name].y, Atlas.enemies[name].width, Atlas.enemies[name].height, this.x - this.traveledX - this.camera.x, this.y + this.traveledY - this.camera.y, this.width, this.height);
};

SkeletonEnemy.prototype.update = function(deltatime) {
    
    this.jumpTime += deltatime;
    if (this.jumpTime >= this.jumpTimeLimit && !this.isJumping) {
        this.jumpTimeLimit = Math.random() * 3 + 2;
        this.jumpTime = 0;
        this.isJumping = true;
        this.velocityY = -200;
    }
    
    if (this.isJumping) {
        this.velocityY += Config.gravity * deltatime;
        this.traveledY += this.velocityY * deltatime;
        if (this.traveledY > 0) {
            this.traveledY = 0;
            this.isJumping = false;
        }
    }
    
    this.changeDirectionTime += deltatime;
    
    if (this.changeDirectionTime >= this.changeDirection) {
        this.changeDirectionTime = 0;
        this.changeDirection = Math.random() * 2 + 2;
        this.direction = this.directions[Math.round(Math.random() * 2)];     
    }
    
    var minX = (this.x - this.offset) - this.camera.x;
    var maxX = (this.x + this.offset) - this.camera.x;
    
    if (this.isDead) {
        this.deadAnimation.update(deltatime);
    } else if (this.direction === 0) {
        this.frontAnimation.update(deltatime);
    } else if (this.direction === -1) {
        this.leftAnimation.update(deltatime);
    } else {
        this.rightAnimation.update(deltatime);
    }

    if (this.left() <= minX) {
        this.direction = 1;      
    }
    
    if (this.right() >= maxX) {
        this.direction = -1;
    }
    
    if (this.direction === 1) {
        this.velocityX = -Math.abs(this.velocityX);
    }
    
    if (this.direction === -1) {
        this.velocityX = Math.abs(this.velocityX);
    }
    
    if (this.direction !== 0) {
        this.traveledX += this.velocityX * deltatime;
    }
};

SkeletonEnemy.prototype.collide = function(entity) {
    if (this.isDead) {
        return false;
    }
    // AABB Collision detection
    var diffX = Math.abs((this.left() + this.width / 2) - (entity.left() + entity.width / 2));
    var diffY = Math.abs((this.top() + this.height / 2) - (entity.top() + entity.height / 2));
    var sizeX = this.width / 2 + entity.width / 2;
    var sizeY = this.height / 2 + entity.height / 2;
    if (diffX < sizeX && diffY < sizeY) {
        Assets.playAudio(Assets.explosion_sound, false);
        var tmpHealth = this.health - 1;
        if (tmpHealth <= 0) {
            this.isDead = true;
        } else {
            this.health--;
        }
        return true;
    }
    return false;
};

SkeletonEnemy.prototype.left = function() {
    return this.x - this.traveledX - this.camera.x;
};

SkeletonEnemy.prototype.right = function() {
    return (this.x + this.width) - this.traveledX - this.camera.x;
};

SkeletonEnemy.prototype.top = function() {
    return this.y + this.traveledY - this.camera.y;
};

SkeletonEnemy.prototype.bottom = function() {
    return (this.y + this.height) + this.traveledY - this.camera.y;
};