function HeroBlast(x, y, camera, direction) {
    this.width = 30;
    this.height = 30;
    this.direction = direction;
    this.x = x + (this.direction === -1 ? 0 : this.width);
    this.y = y + this.height / 2;
    this.camera = camera;
    this.cameraOrigY = this.camera.y;
    this.cameraOrigX = this.camera.x;
    this.velocity = 300;
    this.collided = false;
    this.isDisposable = false;
    this.blastAnimation = new Animation(5, 1.5);
    this.blastExplosionAnimation = new Animation(6, 2);
    this.blastExplosionAnimation.stopAtSequenceNumber(1, this.onStopExplosionAnimation.bind(this));
    this.traveledX = 0;
}

HeroBlast.prototype.onStopExplosionAnimation = function() {
    this.isDisposable = true;
};

HeroBlast.prototype.update = function(deltatime) {
    
    if (Math.abs(this.traveledX) >= Config.worldWidth) {
        this.collided = true;
    }
    
    if (!this.isDisposable) {
        if (this.collided) {
            this.blastExplosionAnimation.update(deltatime);
        } else {
            this.blastAnimation.update(deltatime);
            if (this.direction === -1) {
                this.traveledX += this.velocity * deltatime; 
            } else {
                this.traveledX -= this.velocity * deltatime;
            }
        }
    }
};

HeroBlast.prototype.draw = function(context) {
    if (!this.isDisposable) {
        var y = this.y - (this.camera.y - this.cameraOrigY);
        var x = this.x - this.traveledX - (this.camera.x - this.cameraOrigX);
        if (this.collided) {
            var key = "explo_" + (this.blastExplosionAnimation.getFrame() + 1);
            context.drawImage(Assets.enemiesAtlas2, Atlas.enemies[key].x, Atlas.enemies[key].y, Atlas.enemies[key].width, Atlas.enemies[key].height, x, y, this.width, this.height); 
        } else {
            var key = "spin_" + (this.blastAnimation.getFrame() + 1);
            context.drawImage(Assets.enemiesAtlas2, Atlas.enemies[key].x, Atlas.enemies[key].y, Atlas.enemies[key].width, Atlas.enemies[key].height, x, y, this.width, this.height);
        }
    }
};

HeroBlast.prototype.collide = function(entity) {
    // AABB Collision detection
    var diffX = Math.abs((this.left() + this.width / 2) - (entity.left() + entity.width / 2));
    var diffY = Math.abs((this.top() + this.height / 2) - (entity.top() + entity.height / 2));
    var sizeX = this.width / 2 + entity.width / 2;
    var sizeY = this.height / 2 + entity.height / 2;
    if (diffX < sizeX && diffY < sizeY) {
        this.collided = true;
    }
};

HeroBlast.prototype.left = function() {
    return this.x - this.traveledX - (this.camera.x - this.cameraOrigX);
};

HeroBlast.prototype.right = function() {
    return (this.x + this.width) - this.traveledX - (this.camera.x - this.cameraOrigX);
};

HeroBlast.prototype.top = function() {
    return this.y - (this.camera.y - this.cameraOrigY);
};

HeroBlast.prototype.bottom = function() {
    return (this.y + this.height) - (this.camera.y - this.cameraOrigY);
};