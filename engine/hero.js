function Hero(x, y, width, height) {
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
    this.direction = 1;
    
    this.idleTime = 0;
    this.idleCount = 0;
    this.runTime = 0;
    this.runCount = 0;
    this.jumpTime = 0;
    this.jumpCount = 0;
}

Hero.prototype.update = function(deltatime) {
    
    this.idleTime += deltatime;
    if (this.idleTime >= (6 / 60)) {
        this.idleCount++;
        this.idleTime = 0;
    }
    
    this.runTime += deltatime;
    if (this.runTime >= (7.5 / 60)) {
        this.runCount++;
        this.runTime = 0;
    }
    
    this.jumpTime += deltatime;
    if (this.jumpTime >= (6 / 60)) {
        this.jumpCount++;
        this.jumpTime = 0;
    }
    
    if (!this.isJumping) {
        this.y += Config.gravity * deltatime;
        this.velocityY = 0;
    } else {
        this.y -= this.velocityY * deltatime;
        this.velocityY -= Config.gravity * deltatime;
    }
};

Hero.prototype.jump = function() {
    if (!this.isJumping) {
        this.isJumping = true;
        this.velocityY = 100;
    }
}

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
        if (this.isJumping) {
            if (this.direction === -1) {
                context.save();
                context.scale(this.direction, 1);
                context.drawImage(Assets.hero.jump["sprite" + (this.jumpCount % 10)], - this.x - this.width, this.y, this.width, this.height);
                context.restore();
            } else {
                context.drawImage(Assets.hero.jump["sprite" + (this.jumpCount % 10)], this.x, this.y, this.width, this.height);
            }
        } else if (!this.movingLeft && !this.movingRight && !this.isJumping) {
            if (this.direction === -1) {
                context.save();
                context.scale(this.direction, 1);
                context.drawImage(Assets.hero.idle["sprite" + (this.idleCount % 10)], - this.x - this.width, this.y, this.width, this.height);
                context.restore();
            } else {
                context.drawImage(Assets.hero.idle["sprite" + (this.idleCount % 10)], this.x, this.y, this.width, this.height);
            }
        } else if (this.movingLeft || this.movingRight) {
            if (this.direction === -1) {
                context.save();
                context.scale(this.direction, 1);
                context.drawImage(Assets.hero.run["sprite" + (this.runCount % 7)], - this.x - this.width, this.y, this.width, this.height);
                context.restore();
            } else {
                context.drawImage(Assets.hero.run["sprite" + (this.runCount % 7)], this.x, this.y, this.width, this.height);
            }
        }
    }    
};