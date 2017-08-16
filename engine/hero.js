function Hero(x, y, width, height, camera) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.friction = 0.92;
    this.movingLeft = false;
    this.movingRight = false;
    this.velocityX = 0;
    this.velocityY = 0;
    this.velocityXMain = 100;
    this.isJumping = false;
    this.isShooting = false;
    this.shootingTime = 0;
    this.shootingTimeLimit = 30 / 60;
    this.direction = 1;
    this.camera = camera;
    this.blasts = [];
    
    this.idleAnimation = new Animation(10);
    this.runAnimation = new Animation(7);
    this.jumpAnimation = new Animation(10);
    this.jumpShootAnimation = new Animation(5);
    this.runShootAnimation = new Animation(9);
    this.shootAnimation = new Animation(4);
}

Hero.prototype.update = function(deltatime) {
    
    if (this.isShooting) {
        this.shootingTime += deltatime;
    }
    
    if (this.shootingTime >= this.shootingTimeLimit) {
        this.isShooting = false;
    }
    
    this.idleAnimation.update(deltatime);
    this.runAnimation.update(deltatime);
    this.jumpAnimation.update(deltatime);
    this.jumpShootAnimation.update(deltatime);
    this.runShootAnimation.update(deltatime);
    this.shootAnimation.update(deltatime);
    
    if (!this.isJumping) {
        this.y += Config.gravity * deltatime;
        this.velocityY = 0;
    } else {
        this.y -= this.velocityY * deltatime;
        this.velocityY -= Config.gravity * deltatime;
    }
    
    for (var i = 0; i < this.blasts.length; i++) {
        this.blasts[i].update(deltatime);
    }
};

Hero.prototype.jump = function() {
    if (!this.isJumping) {
        this.isJumping = true;
        this.velocityY = 100;
    }
}

Hero.prototype.shoot = function() {
    if (!this.isShooting) {
        this.shootingTime = 0;
        this.isShooting = true;
        this.blasts.push(new HeroBlast(this.x, this.y, this.camera, this.direction, this));
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
    if (bool) {
        this.direction = 1;
    }
    this.movingRight = bool;
};

Hero.prototype.moveLeft = function(bool) {
    if (bool) {
        this.direction = -1;
    }
    this.movingLeft = bool;
};

Hero.prototype.draw = function(context) {
    if (Config.debug) {
        context.fillStyle = "blue";
        context.fillRect(this.x, this.y, this.width, this.height);
    } else {
        if (this.isJumping && this.isShooting) {
            if (this.direction === -1) {
                context.save();
                context.scale(this.direction, 1);
                context.drawImage(Assets.hero.jump_shoot["sprite" + this.jumpShootAnimation.getFrame()], - this.x - this.width, this.y, this.width, this.height);
                context.restore();
            } else {
                context.drawImage(Assets.hero.jump_shoot["sprite" + this.jumpShootAnimation.getFrame()], this.x, this.y, this.width, this.height);
            }
        } else if (this.isJumping) {
            if (this.direction === -1) {
                context.save();
                context.scale(this.direction, 1);
                context.drawImage(Assets.hero.jump["sprite" + this.jumpAnimation.getFrame()], - this.x - this.width, this.y, this.width, this.height);
                context.restore();
            } else {
                context.drawImage(Assets.hero.jump["sprite" + this.jumpAnimation.getFrame()], this.x, this.y, this.width, this.height);
            }
        } else if (!this.movingLeft && !this.movingRight && !this.isJumping && this.isShooting) {
            if (this.direction === -1) {
                context.save();
                context.scale(this.direction, 1);
                context.drawImage(Assets.hero.shoot["sprite" + this.shootAnimation.getFrame()], - this.x - this.width, this.y, this.width, this.height);
                context.restore();
            } else {
                context.drawImage(Assets.hero.shoot["sprite" + this.shootAnimation.getFrame()], this.x, this.y, this.width, this.height);
            }
        } else if (!this.movingLeft && !this.movingRight && !this.isJumping) {
            if (this.direction === -1) {
                context.save();
                context.scale(this.direction, 1);
                context.drawImage(Assets.hero.idle["sprite" + this.idleAnimation.getFrame()], - this.x - this.width, this.y, this.width, this.height);
                context.restore();
            } else {
                context.drawImage(Assets.hero.idle["sprite" + this.idleAnimation.getFrame()], this.x, this.y, this.width, this.height);
            }
        } else if((this.movingLeft || this.movingRight) && this.isShooting) {
            if (this.direction === -1) {
                context.save();
                context.scale(this.direction, 1);
                context.drawImage(Assets.hero.run_shoot["sprite" + this.runShootAnimation.getFrame()], - this.x - this.width, this.y, this.width, this.height);
                context.restore();
            } else {
                context.drawImage(Assets.hero.run_shoot["sprite" + this.runShootAnimation.getFrame()], this.x, this.y, this.width, this.height);
            }
        } else if (this.movingLeft || this.movingRight) {
            if (this.direction === -1) {
                context.save();
                context.scale(this.direction, 1);
                context.drawImage(Assets.hero.run["sprite" + this.runAnimation.getFrame()], - this.x - this.width, this.y, this.width, this.height);
                context.restore();
            } else {
                context.drawImage(Assets.hero.run["sprite" + this.runAnimation.getFrame()], this.x, this.y, this.width, this.height);
            }
        }
        
        for (var i = 0; i < this.blasts.length; i++) {
            this.blasts[i].draw(context);
        }
    }    
};