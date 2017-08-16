function HeroBlast(x, y, camera, direction, hero) {
    this.x = x;
    this.y = y;
    this.hero = hero;
    this.camera = camera;
    this.width = 30;
    this.height = 30;
    this.velocity = 100;
    this.isCollided = false;
    this.direction = direction;
    this.blastAnimation = new Animation(5);
    this.blastExplosionAnimation = new Animation(6);
}

HeroBlast.prototype.update = function(deltatime) {
    this.blastAnimation.update(deltatime);
    if (this.direction === -1) {
        this.x -= this.velocity * deltatime;
    } else {
        this.x += this.velocity * deltatime;
    }
};

HeroBlast.prototype.draw = function(context) {
    console.log("camera y:" + this.camera.y);
    context.drawImage(Assets.hero.blast["sprite" + this.blastAnimation.getFrame()], (this.x - this.camera.x) + (this.camera.x), this.y, this.width, this.height);
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
        this.isCollided = true;
    }
};

HeroBlast.prototype.left = function() {
    return this.x - this.camera.x;
};

HeroBlast.prototype.right = function() {
    return (this.x + this.width) - this.camera.x;
};

HeroBlast.prototype.top = function() {
    return this.y - this.camera.y;
};

HeroBlast.prototype.bottom = function() {
    return (this.y + this.height) - this.camera.y;
};