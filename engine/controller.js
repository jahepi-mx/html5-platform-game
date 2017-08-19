function Controller() {
    this.camera = new Camera();
    var level1 = new Level1(this.camera);
    this.tiles = level1.tiles;
    this.enemies = level1.enemies;
    this.hero = new Hero(level1.startX, level1.startY, Config.heroSize, Config.heroSize, this.camera);
    this.camera.move(this.hero.x, this.hero.y);
}

Controller.prototype.update = function(deltatime) {
    var hero = this.hero;
    var camera = this.camera;
    var mapWidth = Config.mapWidth;
    
    hero.update(deltatime);

    for (var y = this.getMinY(); y <= this.getMaxY(); y++) {
        for (var x = this.getMinX(); x <= this.getMaxX(); x++) {
            
            var enemy = this.getEnemy(y * mapWidth + x);
            if (enemy !== null) {
                enemy.update(deltatime);
                hero.collide(enemy);
            }
            
            var tile = this.getTile(y * mapWidth + x);
            if (tile !== null) {
                
                // Verify if hero blasts dont collide with WALL type tiles
                if (tile.type === Tile.WALL_TYPE) {
                    for (var i = 0; i < this.hero.blasts.length; i++) {
                        hero.blasts[i].collide(tile);
                    }
                }
                
                // Left
                if (tile.type === Tile.WALL_TYPE && hero.right() >= tile.left() && hero.left() < tile.left()) {
                    //console.log(tile.type);
                    if (hero.bottom() - hero.height / 2 > tile.top() && hero.top() < tile.top())
                        hero.x = tile.left() - hero.width;
                    if (hero.top() + hero.height / 2 < tile.bottom() && hero.bottom() > tile.bottom())
                        hero.x = tile.left() - hero.width;
                    if (hero.top() >= tile.top() && hero.bottom() <= tile.bottom())
                        hero.x = tile.left() - hero.width;
                }

                // Right
                if (tile.type === Tile.WALL_TYPE && hero.left() <= tile.right() && hero.right() > tile.right()) {
                    if (hero.bottom() - hero.height / 2 > tile.top() && hero.top() < tile.top())
                        hero.x = tile.right();
                    if (hero.top() + hero.height / 2 < tile.bottom() && hero.bottom() > tile.bottom())
                        hero.x = tile.right();
                    if (hero.top() >= tile.top() && hero.bottom() <= tile.bottom())
                        hero.x = tile.right();
                }

                // Up
                if (tile.type === Tile.WALL_TYPE && hero.bottom() >= tile.top() && hero.top() < tile.top()) {
                    if (hero.right() - hero.width / 2 > tile.left() && hero.left() < tile.left()) {
                        hero.y = tile.top() - hero.height;
                        hero.isJumping = false;
                    }
                    if (hero.left() + hero.width / 2 < tile.right() && hero.right() > tile.right()) {
                        hero.y = tile.top() - hero.height;
                        hero.isJumping = false;
                    }
                    if (hero.left() >= tile.left() && hero.right() <= tile.right()) {
                        hero.y = tile.top() - hero.height;
                        hero.isJumping = false;
                    }
                }
                // Up
                if (tile.type === Tile.PLATFORM_TYPE && hero.velocityY <= 0 && hero.bottom() >= tile.top() && (hero.top() + hero.height / 2) < tile.top()) {
                    if (hero.right() - hero.width / 2 > tile.left() && hero.left() < tile.left()) {
                        hero.y = tile.top() - hero.height;
                        hero.isJumping = false;
                    }
                    if (hero.left() + hero.width / 2 < tile.right() && hero.right() > tile.right()) {
                        hero.y = tile.top() - hero.height;
                        hero.isJumping = false;
                    }
                    if (hero.left() >= tile.left() && hero.right() <= tile.right()) {
                        hero.y = tile.top() - hero.height;
                        hero.isJumping = false;
                    }
                }

                // Bottom
                if (tile.type === Tile.WALL_TYPE && hero.top() <= tile.bottom() && hero.bottom() > tile.bottom()) {
                    if (hero.right() - hero.width / 2 > tile.left() && hero.left() < tile.left())
                        hero.y = tile.bottom();
                    if (hero.left() + hero.width / 2 < tile.right() && hero.right() > tile.right())
                        hero.y = tile.bottom();
                    if (hero.left() >= tile.left() && hero.right() <= tile.right())
                        hero.y = tile.bottom();
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
    var minX = parseInt((this.camera.x - this.camera.width) / Config.tileSize);
    return Math.max(0, minX);
};

Controller.prototype.getMaxX = function() {
    return parseInt((this.camera.x + this.camera.width) / Config.tileSize);
};

Controller.prototype.getMinY = function() {
    var minY = parseInt((this.camera.y - this.camera.height) / Config.tileSize);
    return Math.max(0, minY);
};

Controller.prototype.getMaxY = function() {
    return parseInt((this.camera.y + this.camera.height) / Config.tileSize);
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