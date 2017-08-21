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
    this.traveled = 0;
}

HeroBlast.prototype.update = function(deltatime) {
    
    if (Math.abs(this.traveled) >= Config.worldWidth) {
        this.collided = true;
    }
    
    if (!this.isDisposable) {
        if (this.collided) {
            this.blastExplosionAnimation.update(deltatime);
            if (this.blastExplosionAnimation.getNumberOfSequences() >= 1) {
                this.isDisposable = true;
            }
        } else {
            this.blastAnimation.update(deltatime);
            if (this.direction === -1) {
                this.traveled += this.velocity * deltatime; 
            } else {
                this.traveled -= this.velocity * deltatime;
            }
        }
    }
};

HeroBlast.prototype.draw = function(context) {
    if (!this.isDisposable) {
        var y = this.y - (this.camera.y - this.y);
        if (this.collided) {
            var key = "blast_explosion" + (this.blastExplosionAnimation.getFrame() + 1);
            context.drawImage(Assets.heroAtlas, Atlas.hero[key].x, Atlas.hero[key].y, Atlas.hero[key].width, Atlas.hero[key].height, this.x - this.traveled, y, this.width, this.height); 
        } else {
            var key = "blast" + (this.blastAnimation.getFrame() + 1);
            context.drawImage(Assets.heroAtlas, Atlas.hero[key].x, Atlas.hero[key].y, Atlas.hero[key].width, Atlas.hero[key].height, this.x - this.traveled, y, this.width, this.height);
        }
    }
};

HeroBlast.prototype.collide = function(entity) {
    var blastCenterX = this.left() + this.width / 2;
    var blastCenterY = this.top() + this.height / 2;
    var objectCenterX = entity.left() + entity.width / 2;
    var objectCenterY = entity.top() + entity.height / 2;
    var diffX = blastCenterX - objectCenterX;
    var diffY = blastCenterY - objectCenterY;
    var dist = diffX * diffX + diffY * diffY;
    if (dist < this.width * this.width) {
        this.collided = true;
    }
};

HeroBlast.prototype.left = function() {
    return this.x - this.traveled;
};

HeroBlast.prototype.right = function() {
    return (this.x + this.width) - this.traveled;
};

HeroBlast.prototype.top = function() {
    return this.y - (this.camera.y - this.y);
};

HeroBlast.prototype.bottom = function() {
    return (this.y + this.height) - (this.camera.y - this.y);
};