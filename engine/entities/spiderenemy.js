function SpiderEnemy(x, y, width, height, velocityX, velocityY, offsetX, offsetY, health, camera) {
    this.camera = camera;
    this.width = width;
    this.height = height;
    this.isDisposable = false;
    this.isDead = false;
    this.health = health;
    this.origHealth = health;
    this.isMortal = true;
    this.hasGuns = false;
    this.isVertical = false;
    this.x = x * Config.tileSize + (Config.tileSize - this.width) / 2;
    this.y = y * Config.tileSize + (Config.tileSize - this.height);
    
    this.leftAnimation = new Animation(6, 1);
    this.rightAnimation = new Animation(6, 1);
    this.upAnimation = new Animation(6, 1);
    this.downAnimation = new Animation(6, 1);
    this.deadAnimation = new Animation(4, 1);
    this.deadAnimation.stopAtSequenceNumber(1, this.onStopDeadAnimation.bind(this));
    this.directions = [-1, 1];

    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.velocityX = velocityX;
    this.traveledX = 0;
    this.velocityY = velocityY;
    this.traveledY = 0;
    this.directionX = this.directions[Math.round(Math.random())];
    this.directionY = 1;
    this.changeXDirection = Math.random() * 2 + 2;
    this.changeXDirectionTime = 0;
    this.changeYDirection = Math.random() * 5 + 2;
    this.changeYDirectionTime = 0;
    this.damagePoints = 1;
}

SpiderEnemy.prototype.onStopDeadAnimation = function() {
    this.isDisposable = true;
};

SpiderEnemy.prototype.draw = function(context) {
    
    // Draw life bar
    if (this.health > 0) {
        context.fillStyle='#000';
        context.fillRect(this.x - this.traveledX - this.camera.x + (this.width / 2 - 25), this.y + this.traveledY - this.camera.y - 20, 50, 6);
        context.fillStyle='#ff0000';
        context.fillRect(this.x - this.traveledX - this.camera.x + (this.width / 2 - 24), this.y + this.traveledY - this.camera.y - 19, 48 * (this.health / this.origHealth), 4);
    }
    var name = "";
    if (this.isDead) {
        name = "spider08_dead" + (this.deadAnimation.getFrame() + 1);
    } else if (!this.isVertical) {
        if (this.directionX === -1) {
            name = "spider08_leftwalk" + (this.leftAnimation.getFrame() + 1);
        } else {
            name = "spider08_rightwalk" + (this.rightAnimation.getFrame() + 1);
        }
    } else {
        if (this.directionY === -1) {
            name = "spider08_down" + (this.downAnimation.getFrame() + 1);
        } else {
            name = "spider08_up" + (this.upAnimation.getFrame() + 1);
        }
    }
    context.drawImage(Assets.enemiesAtlas, Atlas.enemies[name].x, Atlas.enemies[name].y, Atlas.enemies[name].width, Atlas.enemies[name].height, this.x - this.traveledX - this.camera.x, this.y + this.traveledY - this.camera.y, this.width, this.height);
};

SpiderEnemy.prototype.update = function(deltatime) {
    this.changeXDirectionTime += deltatime;
    
    if (this.changeXDirectionTime >= this.changeXDirection) {
        this.changeXDirectionTime = 0;
        this.changeXDirection = Math.random() * 2 + 2;
        this.directionX = this.directions[Math.round(Math.random())];     
    }
    
    this.changeYDirectionTime += deltatime;
    
    if (this.changeYDirectionTime >= this.changeYDirection) {
        this.changeYDirectionTime = 0;
        this.changeYDirection = Math.random() * 5 + 2;
        this.isVertical = true;
    }
    
    var minX = (this.x - this.offsetX) - this.camera.x;
    var maxX = (this.x + this.offsetX) - this.camera.x;
    
    if (this.isDead) {
        this.deadAnimation.update(deltatime);
    }
    
    if (!this.isVertical) {
        if (this.directionX === 1) {
            this.rightAnimation.update(deltatime);
        } else if (this.directionX === -1) {
            this.leftAnimation.update(deltatime);
        }
    } else {
        if (this.directionY === 1) {
            this.upAnimation.update(deltatime);
        } else if (this.directionY === -1) {
            this.downAnimation.update(deltatime);
        }
    }

    if (this.isVertical) {
        if (this.directionY === 1) {
            this.velocityY = -Math.abs(this.velocityY);
        }

        if (this.directionY === -1) {
            this.velocityY = Math.abs(this.velocityY);
        }
    }
    
    if (this.left() <= minX) {
        this.directionX = 1;      
    }
    
    if (this.right() >= maxX) {
        this.directionX = -1;
    }
    
    if (this.directionX === 1) {
        this.velocityX = -Math.abs(this.velocityX);
    }
    
    if (this.directionX === -1) {
        this.velocityX = Math.abs(this.velocityX);
    }
    
    if (!this.isVertical) {
        this.traveledX += this.velocityX * deltatime;
    } else {
        if (Math.abs(this.traveledY) >= this.offsetY) {
            this.directionY = -1;
        }
        this.traveledY += this.velocityY * deltatime;
        if (this.traveledY > 0) {
            this.traveledY = 0;
            this.isVertical = false;
            this.changeYDirectionTime = 0;
            this.directionY = 1;
        }
    }
};

SpiderEnemy.prototype.collide = function(entity) {
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
        this.health--;
        if (this.health <= 0) {
            this.isDead = true;
        }
        return true;
    }
    return false;
};

SpiderEnemy.prototype.left = function() {
    return this.x - this.traveledX - this.camera.x;
};

SpiderEnemy.prototype.right = function() {
    return (this.x + this.width) - this.traveledX - this.camera.x;
};

SpiderEnemy.prototype.top = function() {
    return this.y + this.traveledY - this.camera.y;
};

SpiderEnemy.prototype.bottom = function() {
    return (this.y + this.height) + this.traveledY - this.camera.y;
};

