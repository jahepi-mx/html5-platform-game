function Hero(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.friction = 0.92;
    this.movingLeft = false;
    this.movingRight = false;
    this.movingUp = false;
    this.movingDown = false;
    this.velocityX = 0;
    this.velocityY = 0;
    this.velocityXMain = 100;
    this.isJumping = false;
}

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

Hero.prototype.draw = function(context) {
    if (Config.debug) {
        context.fillStyle = "blue";
        context.fillRect(this.x, this.y, this.width, this.height);
    } else {
        //if (this.movingLeft) context.drawImage(princessLeftImg, this.x, this.y, this.width, this.height);
        //else context.drawImage(princessImg, this.x, this.y, this.width, this.height);
    }    
};