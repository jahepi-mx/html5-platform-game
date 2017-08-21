function Hero(x, y, width, height, collisionSteps, camera) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.friction = 0.92;
    this.movingLeft = false;
    this.movingRight = false;
    this.velocityX = 0;
    this.velocityY = 0;
    this.velocityXOrig = 70 / collisionSteps;
    this.velocityYOrig = 100 / collisionSteps;
    this.isJumping = false;
    this.jumpingTime = 0;
    this.jumpingTimeLimit = 30 / 60;
    this.isShooting = false;
    this.shootingTime = 0;
    this.shootingTimeLimit = 30 / 60;
    this.direction = 1;
    this.camera = camera;
    this.gravityForce = Config.gravity / collisionSteps;
    this.isDead = false;
    this.blasts = [];
    
    this.idleAnimation = new Animation(10, 1);
    this.runAnimation = new Animation(7, 1);
    this.jumpAnimation = new Animation(10, 1);
    this.jumpShootAnimation = new Animation(5, 1);
    this.runShootAnimation = new Animation(9, 1);
    this.shootAnimation = new Animation(4, 1);
    this.deadAnimation = new Animation(10, 1);
}

Hero.prototype.update = function(deltatime) {
    
    if (this.isJumping) {
        this.jumpingTime += deltatime;
    }
    
    if (this.jumpingTime >= this.jumpingTimeLimit) {
        this.velocityY = -Math.abs(this.velocityY);
    }
    
    if (this.isShooting) {
        this.shootingTime += deltatime;
    }
    
    if (this.shootingTime >= this.shootingTimeLimit) {
        this.isShooting = false;
    }
    
    if (this.isDead) {
        this.movingLeft = this.movingRight = false;
        if (this.deadAnimation.count === this.deadAnimation.lastFrame()) {
            this.deadAnimation.stop();
        } else {
            this.deadAnimation.update(deltatime);
        }
    } else {
        this.idleAnimation.update(deltatime);
        this.runAnimation.update(deltatime);
        this.jumpAnimation.update(deltatime);
        this.jumpShootAnimation.update(deltatime);
        this.runShootAnimation.update(deltatime);
        this.shootAnimation.update(deltatime);
    }
    
    for (var i = 0; i < this.blasts.length; i++) {
        if (this.blasts[i].isDisposable) {
            this.blasts.splice(i, 1);
        } else {
            this.blasts[i].update(deltatime);
        }
    }
    
    if (this.movingRight || this.movingLeft) {
        this.velocityX = this.velocityXOrig;
    }
    if (this.movingRight) {
        this.velocityX = Math.abs(this.velocityX);
    }
    if (this.movingLeft) {
        this.velocityX = -Math.abs(this.velocityX);
    } 
    this.velocityX *= this.friction;
};

Hero.prototype.updateCollision = function(deltatime) {
    if (!this.isJumping) {
        this.y += this.gravityForce * deltatime;
        this.velocityY = 0;
    } else {
        this.y -= this.velocityY * deltatime;
        //this.velocityY -= this.gravityForce * deltatime;
    }
    this.x += this.velocityX * deltatime;
};

Hero.prototype.jump = function() {
    if (this.isDead) {
        return;
    }
    if (!this.isJumping) {
        this.isJumping = true;
        this.velocityY = this.velocityYOrig;
    }
};

Hero.prototype.setJumping = function(bool) {
    this.jumpingTime = 0;
    this.isJumping = bool;
};

Hero.prototype.shoot = function() {
    if (this.isDead) {
        return;
    }
    if (!this.isShooting) {
        this.shootingTime = 0;
        this.isShooting = true;
        this.blasts.push(new HeroBlast(this.x, this.y + this.height / 2, this.camera, this.direction));
    }
};

Hero.prototype.left = function() {
    return this.x;
};

Hero.prototype.right = function() {
    return this.x + this.width;
};

Hero.prototype.top = function() {
    return this.y;
};

Hero.prototype.bottom = function() {
    return this.y + this.height;
};

Hero.prototype.moveRight = function(bool) {
    if (this.isDead) {
        return;
    }
    if (bool) {
        this.direction = 1;
    }
    this.movingRight = bool;
};

Hero.prototype.moveLeft = function(bool) {
    if (this.isDead) {
        return;
    }
    if (bool) {
        this.direction = -1;
    }
    this.movingLeft = bool;
};

Hero.prototype.die = function() {
    this.isDead = true;
}

Hero.prototype.collide = function(entity) {
    var centerX = this.left() + this.width / 2;
    var centerY = this.top() + this.height / 2;
    var objectCenterX = entity.left() + entity.width / 2;
    var objectCenterY = entity.top() + entity.height / 2;
    var diffX = centerX - objectCenterX;
    var diffY = centerY - objectCenterY;
    var dist = diffX * diffX + diffY * diffY;
    if (dist < this.width * this.width) {
        this.die();
    }
};

Hero.prototype.draw = function(context) {
    if (Config.debug) {
        context.fillStyle = "blue";
        context.fillRect(this.x, this.y, this.width, this.height);
    } else {
        var key = "";
        if (this.isDead) {
            key = "dead" + ((this.deadAnimation.stopped ? this.deadAnimation.lastFrame() : this.deadAnimation.getFrame()) + 1);
        } else if (this.isJumping && this.isShooting) {
            key = "jump_shoot" + (this.jumpShootAnimation.getFrame() + 1);
        } else if (this.isJumping) {
            key = "jump" + (this.jumpAnimation.getFrame() + 1);
        } else if (!this.movingLeft && !this.movingRight && !this.isJumping && this.isShooting) {
            key = "shoot" + (this.shootAnimation.getFrame() + 1);
        } else if (!this.movingLeft && !this.movingRight && !this.isJumping) {
            key = "idle" + (this.idleAnimation.getFrame() + 1);
        } else if((this.movingLeft || this.movingRight) && this.isShooting) {
            key = "run_shoot" + (this.runShootAnimation.getFrame() + 1);
        } else if (this.movingLeft || this.movingRight) {
            key = "run" + (this.runAnimation.getFrame() + 1);
        }
        
        if (key !== "") {
            if (this.direction === -1) {
                context.save();
                context.scale(this.direction, 1);
                context.drawImage(Assets.heroAtlas, Atlas.hero[key].x, Atlas.hero[key].y, Atlas.hero[key].width, Atlas.hero[key].height, - this.x - this.width, this.y, this.width, this.height);
                context.restore();
            } else {
                context.drawImage(Assets.heroAtlas, Atlas.hero[key].x, Atlas.hero[key].y, Atlas.hero[key].width, Atlas.hero[key].height, this.x, this.y, this.width, this.height);
            }
        }
        
        for (var i = 0; i < this.blasts.length; i++) {
            this.blasts[i].draw(context);
        }
    }    
};