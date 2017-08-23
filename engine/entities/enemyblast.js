function EnemyBlast(enemy, radians, camera) {
    this.x = enemy.left() + enemy.width / 2;
    this.y = enemy.top() + enemy.height / 2;
    this.width = 30;
    this.height = 30;
    this.ratioX = Math.cos(radians);
    this.ratioY = Math.sin(radians);
    this.camera = camera;
    this.enemy = enemy;
    this.velocity = 300;
    this.collided = false;
    this.isDisposable = false;
    this.blastAnimation = new Animation(5, 1.5);
    this.blastExplosionAnimation = new Animation(6, 2);
    this.blastExplosionAnimation.stopAtSequenceNumber(1, this.onStopExplosionAnimation.bind(this));
    this.traveledX = 0;
    this.traveledY = 0;
}

EnemyBlast.prototype.onStopExplosionAnimation = function() {
    this.isDisposable = true;
};

EnemyBlast.prototype.update = function(deltatime) {
    
    this.x = this.enemy.left() + this.enemy.width / 2;
    this.y = this.enemy.top() + this.enemy.height / 2;
    
    if (Math.abs(this.traveled) >= Config.worldWidth) {
        this.collided = true;
    }
    
    if (!this.isDisposable) {
        if (this.collided) {
            this.blastExplosionAnimation.update(deltatime);
        } else {
            this.blastAnimation.update(deltatime);
            this.traveledX += this.velocity * this.ratioX * deltatime; 
            this.traveledY += this.velocity * this.ratioY * deltatime; 
        }
    }
};

EnemyBlast.prototype.draw = function(context) {
    if (!this.isDisposable) {
        if (this.collided) {
            var key = "blast_explosion" + (this.blastExplosionAnimation.getFrame() + 1);
            context.drawImage(Assets.heroAtlas, Atlas.hero[key].x, Atlas.hero[key].y, Atlas.hero[key].width, Atlas.hero[key].height, this.x + this.traveledX, this.y + this.traveledY, this.width, this.height); 
        } else {
            var key = "bullet" + (this.blastAnimation.getFrame() + 1);
            context.drawImage(Assets.enemiesAtlas, Atlas.enemies[key].x, Atlas.enemies[key].y, Atlas.enemies[key].width, Atlas.enemies[key].height, this.x + this.traveledX, this.y + this.traveledY, this.width, this.height);
        }
    }
};

EnemyBlast.prototype.collide = function(entity) {
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

EnemyBlast.prototype.left = function() {
    return this.x + this.traveledX;
};

EnemyBlast.prototype.right = function() {
    return (this.x + this.width) + this.traveledX;
};

EnemyBlast.prototype.top = function() {
    return this.y + this.traveledY;
};

EnemyBlast.prototype.bottom = function() {
    return (this.y + this.height) - this.traveledY;
};