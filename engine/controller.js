function Controller() {
    this.vectorMoves = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [-1, -1], [1, -1]];
    this.camera = new Camera();
    this.collisionPrecision = 20;
    var level1 = new Level1(this.camera);
    this.hero = new Hero(level1.startX, level1.startY, Config.heroSize, Config.heroSize, this.collisionPrecision, this.camera);
    this.camera.move(this.hero.x, this.hero.y);
    this.tiles = level1.tiles;
    this.enemies = level1.enemies;
}

Controller.prototype.update = function(deltatime) {
    
    this.hero.update(deltatime);
    
    // Hero collision detection
    var offset = 5;
    for (var i = 0; i < this.collisionPrecision; i++) {
        this.hero.updateCollision(deltatime);
        var currentX = parseInt(Math.round((this.camera.x + this.hero.x) / Config.tileSize));
        var currentY = parseInt(Math.round((this.camera.y + this.hero.y) / Config.tileSize));
        for (var v = 0; v < this.vectorMoves.length; v++) {
            var tmpX = currentX + this.vectorMoves[v][0];
            var tmpY = currentY + this.vectorMoves[v][1];
            var tile = this.getTile(tmpY * Config.mapWidth + tmpX);
            if (tile !== null) {
                // Left collision
                if (tile.type === Tile.WALL_TYPE && this.hero.right() >= tile.left() - offset && this.hero.right() <= tile.left()) {
                    //console.log("left " + this.hero.right() + ", " + tile.left() + " x:" + tmpX + " y:" + tmpY);
                    if (this.hero.bottom() > tile.top() && this.hero.bottom() < tile.bottom())
                        this.hero.x = this.hero.oldX - 0.001; //this.hero.x = tile.left() - this.hero.width - offset;
                    if (this.hero.top() > tile.top() && this.hero.top() < tile.bottom())
                        this.hero.x = this.hero.oldX - 0.001; //this.hero.x = tile.left() - this.hero.width - offset;
                }
                // Right collision
                if (tile.type === Tile.WALL_TYPE && this.hero.left() <= tile.right() + offset && this.hero.left() >= tile.right()) {
                    //console.log("right " + this.hero.left() + ", " + tile.right() + " x:" + tmpX + " y:" + tmpY);
                    if (this.hero.bottom() > tile.top() && this.hero.bottom() < tile.bottom())
                        this.hero.x = this.hero.oldX + 0.001; //this.hero.x = tile.right() + offset;
                    if (this.hero.top() > tile.top() && this.hero.top() < tile.bottom())
                        this.hero.x = this.hero.oldX + 0.001; //this.hero.x = tile.right() + offset;
                }
                // Down collision
                if (tile.type === Tile.WALL_TYPE && this.hero.top() <= tile.bottom() + offset && this.hero.bottom() > tile.bottom()) {
                    if (this.hero.right() > tile.left() && this.hero.right() < tile.right())
                        this.hero.y = this.hero.oldY + 0.001; //this.hero.y = tile.bottom() + offset;
                    if (this.hero.left() > tile.left() && this.hero.left() < tile.right())
                        this.hero.y = this.hero.oldY + 0.001; //this.hero.y = tile.bottom() + offset;
                }
                // Up collision
                if (tile.type === Tile.WALL_TYPE && this.hero.bottom() >= tile.top() - offset && this.hero.bottom() <= tile.top()) {
                    if (this.hero.right() > tile.left() && this.hero.right() < tile.right()) {
                        this.hero.y = this.hero.oldY - 0.001; //this.hero.y = tile.top() - this.hero.height - offset;
                        if (this.hero.isJumpReadyToInactive()) this.hero.setJumping(false);
                    }
                    if (this.hero.left() > tile.left() && this.hero.left() < tile.right()) {
                        this.hero.y = this.hero.oldY - 0.001; //this.hero.y = tile.top() - this.hero.height - offset;
                        if (this.hero.isJumpReadyToInactive()) this.hero.setJumping(false);
                    }
                }
                // Up platform collision
                if (tile.type === Tile.PLATFORM_TYPE && this.hero.velocityY <= 0 && this.hero.bottom() >= tile.top() - offset && this.hero.bottom() <= tile.top()) {
                    if (this.hero.right() >= tile.left() && this.hero.right() <= tile.right()) {
                        this.hero.y = this.hero.oldY - 0.001; //this.hero.y = tile.top() - this.hero.height - offset;
                        if (this.hero.isJumpReadyToInactive()) this.hero.setJumping(false);
                    }
                    if (this.hero.left() >= tile.left() && this.hero.left() <= tile.right()) {
                        this.hero.y = this.hero.oldY - 0.001; //this.hero.y = tile.top() - this.hero.height - offset;
                        if (this.hero.isJumpReadyToInactive()) this.hero.setJumping(false);
                    }
                }
            }
        }
    }
    
    this.camera.move(this.hero.x, this.hero.y);
    
    for (var y = this.getMinY(); y <= this.getMaxY(); y++) {
        for (var x = this.getMinX(); x <= this.getMaxX(); x++) {
            var enemy = this.getEnemy(y * Config.mapWidth + x);
            if (enemy !== null) {
                enemy.update(deltatime);
                this.hero.collide(enemy);
                if (enemy instanceof GiantFatEnemy) {
                    if (enemy.isShooting) {
                        enemy.fireBlast(this.hero.left() + this.hero.width / 2, this.hero.top() + this.hero.height / 2);
                    }
                    enemy.changeDirection(this.hero.x);
                    for (var i = 0; i < this.hero.blasts.length; i++) {
                        if (!this.hero.blasts[i].collided && enemy.collide(this.hero.blasts[i])) {
                            this.hero.blasts[i].collided = true;
                        }
                    }
                    for (var i = 0; i < enemy.blasts.length; i++) {
                        this.hero.collide(enemy.blasts[i]);
                    }
                }
                if (enemy.isDisposable) {
                    this.enemies[y * Config.mapWidth + x] = null;
                } 
            }
            var tile = this.getTile(y * Config.mapWidth + x);
            if (tile !== null) {
                
                if (tile.type === Tile.WALL_TYPE) {
                    // Verify if any hero blast collide with the tile
                    for (var i = 0; i < this.hero.blasts.length; i++) {
                        this.hero.blasts[i].collide(tile);
                    }                  
                    // Verify if any enemy blast collide with the tile
                    for (var y2 = this.getMinY(); y2 <= this.getMaxY(); y2++) {
                        for (var x2 = this.getMinX(); x2 <= this.getMaxX(); x2++) {
                            var enemy2 = this.getEnemy(y2 * Config.mapWidth + x2);
                            if (enemy2 instanceof GiantFatEnemy) {
                                for (var i = 0; i < enemy2.blasts.length; i++) {
                                    enemy2.blasts[i].collide(tile);
                                }
                            }
                        }
                    }
                }
            }
        } 
    }
};

Controller.prototype.getTile = function(index) {
    if (index >= 0 && index < this.tiles.length && this.tiles[index] !== null) {
        return this.tiles[index];
    }
    return null;
};

Controller.prototype.getEnemy = function(index) {
    if (index >= 0 && index < this.enemies.length && this.enemies[index] !== null) {
        return this.enemies[index];
    }
    return null;
};

Controller.prototype.getMinX = function() {
    var minX = parseInt(((this.camera.x + this.hero.x) / Config.tileSize) - (this.camera.width / Config.tileSize));
    return Math.max(0, minX);
};

Controller.prototype.getMaxX = function() {
    var maxX = parseInt(((this.camera.x + this.hero.x) / Config.tileSize) + (this.camera.width / Config.tileSize));
    return maxX;
};

Controller.prototype.getMinY = function() {
    var minY = parseInt(((this.camera.y + this.hero.y) / Config.tileSize) - (this.camera.height / Config.tileSize));
    return Math.max(0, minY);
};

Controller.prototype.getMaxY = function() {
    var maxY = parseInt(((this.camera.y + this.hero.y) / Config.tileSize) + (this.camera.height / Config.tileSize));
    return maxY;
};

Controller.prototype.jump = function() {
    this.hero.jump();
};

Controller.prototype.moveRight = function(bool) {
    this.hero.moveRight(bool);
};

Controller.prototype.moveLeft = function(bool) {
    this.hero.moveLeft(bool);
};

Controller.prototype.shoot = function() {
    this.hero.shoot();
};

Controller.prototype.isFinish = function() {
    return this.hero.isDead;
};