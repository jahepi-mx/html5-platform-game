function Controller() {
    this.vectorMoves = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [-1, -1], [1, -1]];
    this.camera = new Camera();
    this.collisionPrecision = 7;
    var level1 = new Level1(this.camera);
    this.hero = new Hero(level1.startX, level1.startY, Config.heroSize, Config.heroSize, this.collisionPrecision, this.camera);
    this.camera.move(this.hero.x, this.hero.y);
    this.tiles = level1.tiles;
    this.enemies = level1.enemies;
}

Controller.prototype.update = function(deltatime) {
    
    // Ladder implementation, when the hero is nearby a ladder tile, he is able to climb it.
    var currentX = Math.floor(Math.round((this.camera.x + this.hero.centerX) / Config.tileSize));
    var currentY = Math.floor(Math.round((this.camera.y + this.hero.centerY) / Config.tileSize));
    var foundOnLadder = false;
    for (var v = 0; v < this.vectorMoves.length; v++) {
        var tmpX = currentX + this.vectorMoves[v][0];
        var tmpY = currentY + this.vectorMoves[v][1];
        var tile = this.getTile(tmpY * Config.mapWidth + tmpX);
        if (tile !== null) {
            if (tile.type === Tile.LADDER_TYPE && tile.collide(this.hero)) {
                foundOnLadder = true;
                if (!this.hero.isJumping && (this.hero.isUp || this.hero.isDown)) {
                    this.hero.isOnLadder = true;
                    break;
                }
            }
        }
    }
    if (this.hero.isOnLadder && !foundOnLadder) {
        this.hero.isOnLadder = false;
    }
    // End of ladder implementation
    
    this.hero.update(deltatime);
    var platformOffset = 3;
    
    // Hero collision detection
    for (var i = 0; i < this.collisionPrecision; i++) {
        var oldX = this.hero.x;
        var oldY = this.hero.y;
        this.hero.updateX(deltatime);
        this.camera.move(this.hero.x, this.hero.y);
        currentX = Math.floor(Math.round((this.camera.x + this.hero.centerX) / Config.tileSize));
        currentY = Math.floor(Math.round((this.camera.y + this.hero.centerY) / Config.tileSize));
        for (var v = 0; v < this.vectorMoves.length; v++) {
            var tmpX = currentX + this.vectorMoves[v][0];
            var tmpY = currentY + this.vectorMoves[v][1];
            var tile = this.getTile(tmpY * Config.mapWidth + tmpX);
            if (tile !== null) {
               if (tile.type === Tile.WALL_TYPE) { 
                    if (tile.collide(this.hero)) {
                        this.hero.x = oldX;
                        this.camera.move(this.hero.x, this.hero.y);
                        break;
                    }
                } 
            }
        }
        oldX = this.hero.x;
        oldY = this.hero.y;
        this.hero.updateY(deltatime);
        this.camera.move(this.hero.x, this.hero.y);
        for (var v = 0; v < this.vectorMoves.length; v++) {
            var tmpX = currentX + this.vectorMoves[v][0];
            var tmpY = currentY + this.vectorMoves[v][1];
            var tile = this.getTile(tmpY * Config.mapWidth + tmpX);
            if (tile !== null) {
               if (tile.type === Tile.WALL_TYPE){ 
                    if (tile.collide(this.hero)) {
                        this.hero.y = oldY;
                        this.hero.setJumping(false);
                        this.camera.move(this.hero.x, this.hero.y);
                        break;
                    }
                }
                // Platform collision
                if (tile.type === Tile.PLATFORM_TYPE && this.hero.velocityY >= 0 && this.hero.bottom() > tile.top() && this.hero.bottom() < tile.top() + platformOffset) {
                    if (this.hero.right() >= tile.left() && this.hero.right() <= tile.right()) {
                        this.hero.y = oldY;
                        this.camera.move(this.hero.x, this.hero.y);
                        this.hero.setJumping(false);
                        break;
                    } else if (this.hero.left() >= tile.left() && this.hero.left() <= tile.right()) {
                        this.hero.y = oldY;
                        this.camera.move(this.hero.x, this.hero.y);
                        this.hero.setJumping(false);
                        break;
                    }
                }
            }
        }
    }
    
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
                    enemy.changeDirection(this.hero.centerX);
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
                    // Verify if any hero blast collide with a tile
                    for (var i = 0; i < this.hero.blasts.length; i++) {
                        this.hero.blasts[i].collide(tile);
                    }                  
                    // Verify if any enemy blast collide with a tile
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
    var minX = Math.floor(((this.camera.x + this.hero.centerX) / Config.tileSize) - (this.camera.width / Config.tileSize));
    return Math.max(0, minX);
};

Controller.prototype.getMaxX = function() {
    var maxX = Math.floor(((this.camera.x + this.hero.centerX) / Config.tileSize) + (this.camera.width / Config.tileSize));
    return maxX;
};

Controller.prototype.getMinY = function() {
    var minY = Math.floor(((this.camera.y + this.hero.centerY) / Config.tileSize) - (this.camera.height / Config.tileSize));
    return Math.max(0, minY);
};

Controller.prototype.getMaxY = function() {
    var maxY = Math.floor(((this.camera.y + this.hero.centerY) / Config.tileSize) + (this.camera.height / Config.tileSize));
    return maxY;
};

Controller.prototype.jump = function() {
    this.hero.jump();
};

Controller.prototype.moveUp = function(bool) {
    this.hero.moveUp(bool);
};

Controller.prototype.moveDown = function(bool) {
    this.hero.moveDown(bool);
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