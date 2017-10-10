function DragonEnemy(x, y, width, height, health, blastVelocityXMin, blastVelocityXMax, blastVelocityYMin, blastVelocityYMax, degreesMin, degreesMax, shootInterval, camera) {
    this.x = x * Config.tileSize - (width / 2) + (Config.tileSize / 2);
    this.y = y * Config.tileSize - (height - Config.tileSize);
    this.width = width;
    this.height = height;
    this.camera = camera;
    this.health = health;
    this.origHealth = health;
    this.isDisposable = false;
    this.isDead = false;
    this.isDamage = false;
    this.isShooting = false;
    this.isMortal = true;
    this.hasGuns = true;
    this.blastFlag = false;
    this.direction = -1;
    this.nextShootTime = 0;
    this.nextShootTimeCount = 0;
    this.shootInterval = shootInterval;
    this.damagePoints = 1;
    this.blastVelocityXMin = blastVelocityXMin;
    this.blastVelocityYMin = blastVelocityYMin;
    this.blastVelocityXMax = blastVelocityXMax;
    this.blastVelocityYMax = blastVelocityYMax;
    this.degreesMin = degreesMin;
    this.degreesMax = degreesMax;
    
    this.idleAnimation = new Animation(5, 1);
    this.shootAnimation = new Animation(9, 2);
    this.deadAnimation = new Animation(6, 1);
    this.damageAnimation = new Animation(3, 2);
    this.damageAnimation.stopAtSequenceNumber(1, this.onStopDamageAnimation.bind(this));
    this.deadAnimation.stopAtSequenceNumber(1, this.onStopDeadAnimation.bind(this));
    this.shootAnimation.stopAtSequenceNumber(1, this.onStopShootAnimation.bind(this));
}

DragonEnemy.prototype.onStopShootAnimation = function() {
    this.shootAnimation.reset();
    this.isShooting = false;
    this.blastFlag = false;
};

DragonEnemy.prototype.onStopDeadAnimation = function() {
    this.isDisposable = true;
};

DragonEnemy.prototype.onStopDamageAnimation = function() {
    this.isDamage = false;
};

DragonEnemy.prototype.changeDirection = function(x) {
    var diff = x - this.left();
    this.direction = diff < 0 ? -1 : 1;
};

DragonEnemy.prototype.shoot = function(x, y, blasts) {
    if (!this.blastFlag) {
        Assets.playAudio(Assets.enemy_laser_sound, false);
        this.blastFlag = true;
        var diffX = (this.left() + this.width / 2) - x;
        var diffY = (this.top() + this.height / 2) - y;
        var radians = 0; //Math.atan2(diffY, diffX);
        
        var degree = this.degreesMax - this.degreesMin;
        degree = Math.random() * degree;
        degree = this.degreesMin + degree;
        
        var velocityX = this.blastVelocityXMax - this.blastVelocityXMin;
        velocityX = Math.random() * velocityX;
        velocityX = this.blastVelocityXMin + velocityX;
        if (this.direction > 0) velocityX = -velocityX;
        
        var velocityY = this.blastVelocityYMax - this.blastVelocityYMin;
        velocityY = Math.random() * velocityY;
        velocityY = this.blastVelocityYMin + velocityY;
        
        var shoot = new EnemyBlast(this, radians + (Math.PI / 180 * degree), 0.60, EnemyBlast.RED_TYPE, true, velocityX, velocityY, this.camera);
        shoot.traveledXLimit = 2000;
        shoot.traveledYLimit = 2000;
        blasts.push(shoot);
        
        degree = this.degreesMax - this.degreesMin;
        degree = Math.random() * degree;
        degree = this.degreesMin + degree;
        
        velocityX = this.blastVelocityXMax - this.blastVelocityXMin;
        velocityX = Math.random() * velocityX;
        velocityX = this.blastVelocityXMin + velocityX;
        if (this.direction > 0) velocityX = -velocityX;
        
        velocityY = this.blastVelocityYMax - this.blastVelocityYMin;
        velocityY = Math.random() * velocityY;
        velocityY = this.blastVelocityYMin + velocityY;
        
        shoot = new EnemyBlast(this, radians + (Math.PI / 180 * degree), 0.30, EnemyBlast.RED_TYPE, true, velocityX, velocityY, this.camera);
        shoot.traveledXLimit = 2000;
        shoot.traveledYLimit = 2000;
        blasts.push(shoot);
    }
};

DragonEnemy.prototype.update = function(deltatime) {
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

DragonEnemy.prototype.draw = function(context) {
    
    // Draw life bar
    if (this.health > 0) {
        context.fillStyle='#000';
        context.fillRect(this.x - this.camera.x + (this.width / 2 - 25), this.y - this.camera.y - 20, 50, 6);
        context.fillStyle='#ff0000';
        context.fillRect(this.x - this.camera.x + (this.width / 2 - 24), this.y - this.camera.y - 19, 48 * (this.health / this.origHealth), 4);
    }
    
    var key = "";
    if (this.isDamage && !this.damageAnimation.isStopped()) {
        key = "dragon_hit" + (this.damageAnimation.getFrame() + 1);
    } else if (this.isDead) {
        key = "explo_" + (this.deadAnimation.getFrame() + 1);
    }  else if (this.isShooting) {
        key = "dragon_attack" + (this.shootAnimation.getFrame() + 1);
    } else {
        key = "dragon_idle" + (this.idleAnimation.getFrame() + 1);
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
};

DragonEnemy.prototype.collide = function(entity) {
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
            Assets.playAudio(Assets.explosion_sound, false);
            this.health--;
            if (this.health <= 0) {
                this.isDead = true;
            } else {
                this.damageAnimation.reset();
                this.isDamage = true;
            }
        }
        return true;
    }
    return false;
};

DragonEnemy.prototype.left = function() {
    return this.x - this.camera.x;
};

DragonEnemy.prototype.right = function() {
    return (this.x + this.width) - this.camera.x;
};

DragonEnemy.prototype.top = function() {
    return this.y - this.camera.y;
};

DragonEnemy.prototype.bottom = function() {
    return (this.y + this.height) - this.camera.y;
};