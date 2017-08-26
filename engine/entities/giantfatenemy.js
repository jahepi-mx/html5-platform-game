function GiantFatEnemy(x, y, width, height, health, camera) {
    this.x = x * Config.tileSize - (width / 2) + (Config.tileSize / 2);
    this.y = y * Config.tileSize - (height - Config.tileSize);
    this.width = width;
    this.height = height;
    this.camera = camera;
    this.health = health;
    this.isDisposable = false;
    this.isDead = false;
    this.isDamage = false;
    this.isShooting = false;
    this.blastFlag = false;
    this.blasts = [];
    this.direction = -1;
    this.nextShootTime = 0;
    this.nextShootTimeCount = 0;
    this.shootInterval = 8;
    
    this.idleAnimation = new Animation(7, 1);
    this.shootAnimation = new Animation(3, 2);
    this.deadAnimation = new Animation(9, 2);
    this.damageAnimation = new Animation(4, 2);
    this.damageAnimation.stopAtSequenceNumber(1, this.onStopDamageAnimation.bind(this));
    this.deadAnimation.stopAtSequenceNumber(1, this.onStopDeadAnimation.bind(this));
    this.shootAnimation.stopAtSequenceNumber(1, this.onStopShootAnimation.bind(this));
}

GiantFatEnemy.prototype.onStopShootAnimation = function() {
    this.shootAnimation.reset();
    this.isShooting = false;
    this.blastFlag = false;
};

GiantFatEnemy.prototype.onStopDeadAnimation = function() {
    this.isDisposable = true;
};

GiantFatEnemy.prototype.onStopDamageAnimation = function() {
    this.isDamage = false;
};

GiantFatEnemy.prototype.changeDirection = function(x) {
    var diff = x - this.left();
    this.direction = diff < 0 ? -1 : 1;
};

GiantFatEnemy.prototype.fireBlast = function(x, y) {
    if (!this.blastFlag) {
        this.blastFlag = true;
        var diffX = x - this.left();
        var diffY = y - (this.top() + this.height / 2);
        var radians = Math.atan2(diffY, diffX);
        this.blasts.push(new EnemyBlast(this, radians, this.camera));
    }
};

GiantFatEnemy.prototype.update = function(deltatime) {
    this.nextShootTimeCount += deltatime;
    if (this.nextShootTime === 0) {
        // Shoots randomly in X seconds interval
        this.nextShootTime = Math.random() * this.shootInterval;
    }
    if (this.nextShootTimeCount >= this.nextShootTime && !this.isDead && !this.isDamage) {
        this.nextShootTime = 0;
        this.nextShootTimeCount = 0;
        this.isShooting = true;
    }
    
    for (var i = 0; i < this.blasts.length; i++) {
        if (this.blasts[i].isDisposable) {
            this.blasts.splice(i, 1);
        } else {
            this.blasts[i].update(deltatime);
        }
    }
    
    if (this.isDamage && !this.damageAnimation.isStopped()) {
        this.damageAnimation.update(deltatime);
    } else if (this.isDead) {
        this.deadAnimation.update(deltatime);
    } else if (this.isShooting) {
        this.shootAnimation.update(deltatime);
    } else {
       this.idleAnimation.update(deltatime); 
    }
};

GiantFatEnemy.prototype.draw = function(context) {
    var key = "";
    if (this.isDamage && !this.damageAnimation.isStopped()) {
        key = "boss1_damage" + (this.damageAnimation.getFrame() + 1);
    } else if (this.isDead) {
        key = "explosion" + (this.deadAnimation.getFrame() + 1);
    }  else if (this.isShooting) {
        key = "boss1_hit" + (this.shootAnimation.getFrame() + 1);
    } else {
        key = "boss1_idle" + (this.idleAnimation.getFrame() + 1);
    }
    if (key !== "") {
        if (this.direction === -1) {
            context.save();
            context.scale(this.direction, 1);
            context.drawImage(Assets.enemiesAtlas, Atlas.enemies[key].x, Atlas.enemies[key].y, Atlas.enemies[key].width, Atlas.enemies[key].height, - (this.x - this.camera.x) - this.width, this.y - this.camera.y, this.width, this.height);
            context.restore();
        } else {
            context.drawImage(Assets.enemiesAtlas, Atlas.enemies[key].x, Atlas.enemies[key].y, Atlas.enemies[key].width, Atlas.enemies[key].height, this.x - this.camera.x, this.y - this.camera.y, this.width, this.height);
        }
    }
    
    for (var i = 0; i < this.blasts.length; i++) {
        this.blasts[i].draw(context);
    }
};

GiantFatEnemy.prototype.collide = function(entity) {
    if (this.isDead) {
        return false;
    }
    // AABB Collision detection
    var diffX = Math.abs((this.left() + this.width / 2) - (entity.left() + entity.width / 2));
    var diffY = Math.abs((this.top() + this.height / 2) - (entity.top() + entity.height / 2));
    var sizeX = this.width / 2 + entity.width / 2;
    var sizeY = this.height / 2 + entity.height / 2;
    if (diffX < sizeX && diffY < sizeY) {
        if (!this.isDamage) {
            var tmpHealth = this.health - 1;
            if (tmpHealth <= 0) {
                this.isDead = true;
            } else {
                this.health--;
                this.damageAnimation.reset();
                this.isDamage = true;
            }
        }
        return true;
    }
    return false;
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

