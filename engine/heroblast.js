function HeroBlast(x, y, camera, direction) {
    this.width = 30;
    this.height = 30;
    this.direction = direction;
    this.x = x + (this.direction === -1 ? 0 : this.width);
    this.y = y + (this.height * 0.25);
    this.camera = camera;
    this.velocity = 300;
    this.collided = false;
    this.isDisposable = false;
    this.blastAnimation = new Animation(5, 1.5);
    this.blastExplosionAnimation = new Animation(6, 2);
}

HeroBlast.prototype.update = function(deltatime) {
    if (!this.isDisposable) {
        if (this.collided) {
            this.blastExplosionAnimation.update(deltatime);
            if (this.blastExplosionAnimation.getNumberOfSequences() >= 1) {
                this.isDisposable = true;
            }
        } else {
            if (this.direction === -1) {
                this.x -= this.velocity * deltatime;
            } else {
                this.x += this.velocity * deltatime;
            }
        }
    }
};

HeroBlast.prototype.draw = function(context) {
    //console.log("camera y:" + this.camera.y + " y:" + this.y);
    if (!this.isDisposable) {
        var y = this.y - (this.camera.y - this.y);
        if (this.collided) {
            context.drawImage(Assets.hero.blast_explosion["sprite" + this.blastExplosionAnimation.getFrame()], this.x, y, this.width, this.height); 
        } else {
            context.drawImage(Assets.hero.blast["sprite" + this.blastAnimation.getFrame()], this.x, y, this.width, this.height);
        }
    }
};

HeroBlast.prototype.collide = function(object) {
    var blastCenterX = this.left() + this.width / 2;
    var blastCenterY = this.top() + this.height / 2;
    var objectCenterX = object.left() + object.width / 2;
    var objectCenterY = object.top() + object.height / 2;
    var diffX = blastCenterX - objectCenterX;
    var diffY = blastCenterY - objectCenterY;
    var dist = diffX * diffX + diffY * diffY;
    if (dist < this.width * this.width) {
        this.collided = true;
    }
};

HeroBlast.prototype.left = function() {
    return this.x;
};

HeroBlast.prototype.right = function() {
    return this.x + this.width;
};

HeroBlast.prototype.top = function() {
    return this.y - (this.camera.y - this.y);
};

HeroBlast.prototype.bottom = function() {
    return (this.y + this.height) - (this.camera.y - this.y);
};