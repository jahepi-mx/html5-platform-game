function GiantFatEnemy(x, y, width, height, health, camera) {
    this.x = x * Config.tileSize;
    this.y = y * Config.tileSize - (height / 2) + (Config.tileSize / 2);
    this.width = width;
    this.height = height;
    this.camera = camera;
    this.health = health;
    this.isDisposable = false;
    this.isDead = false;
    this.blasts = [];
    this.direction = -1;
    
    this.idleAnimation = new Animation(7, 1);
    this.shootAnimation = new Animation(3, 1);
    this.deadAnimation = new Animation(9, 1);
    this.hitAnimation = new Animation(4, 1);
}

GiantFatEnemy.prototype.update = function(deltatime) {
    if (this.isDead) {
        this.deadAnimation.update(deltatime);
    } else {
        this.idleAnimation.update(deltatime);
        this.hitAnimation.update(deltatime);
        this.shootAnimation.update(deltatime);
    }
};

GiantFatEnemy.prototype.draw = function(context) {
    var key = "boss1_idle" + (this.idleAnimation.getFrame() + 1);
    if (this.direction === -1) {
        context.save();
        context.scale(this.direction, 1);
        context.drawImage(Assets.enemiesAtlas, Atlas.enemies[key].x, Atlas.enemies[key].y, Atlas.enemies[key].width, Atlas.enemies[key].height, - (this.x - this.camera.x) - this.width, this.y - this.camera.y, this.width, this.height);
        context.restore();
    } else {
        context.drawImage(Assets.enemiesAtlas, Atlas.enemies[key].x, Atlas.enemies[key].y, Atlas.enemies[key].width, Atlas.enemies[key].height, this.x - this.camera.x, this.y - this.camera.y, this.width, this.height);
    }
};

GiantFatEnemy.prototype.collide = function(entity) {
    if (this.isDead) {
        return;
    }
    var centerX = this.left() + this.width / 2;
    var centerY = this.top() + this.height / 2;
    var objectCenterX = entity.left() + entity.width / 2;
    var objectCenterY = entity.top() + entity.height / 2;
    var diffX = centerX - objectCenterX;
    var diffY = centerY - objectCenterY;
    var dist = diffX * diffX + diffY * diffY;
    if (dist < this.width * this.width) {
        this.health--;
        if (this.health <= 0) {
            this.isDead = true;
        }
    }
};

GiantFatEnemy.prototype.left = function() {
    return this.x - this.camera.x;
};

GiantFatEnemy.prototype.right = function() {
    return (this.x + this.width) - this.camera.x;
};

GiantFatEnemy.prototype.top = function() {
    return this.y - this.camera.y;
};

GiantFatEnemy.prototype.bottom = function() {
    return (this.y + this.height) - this.camera.y;
};

