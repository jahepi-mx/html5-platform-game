function Controller() {
    
    this.map = [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,4,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,2,3,3,3,4,0,0,0,0,1,
        1,1,1,1,1,1,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ];
    
    this.enemyMap = [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ];
    
    this.tiles = [];
    this.enemies = [];
    this.camera = new Camera();
    this.hero = new Hero(100, 260, 60, 60, this.camera);
    this.camera.move(this.hero.x, this.hero.y);
    for (var i = 0; i < this.map.length; i++) {
        this.tiles[i] = new Tile(i % Config.mapWidth, parseInt(i / Config.mapWidth), Config.tileSize, Config.tileSize, this.map[i], this.camera);
    }
    for (var i = 0; i < this.enemyMap.length; i++) {
        if (this.enemyMap[i] === BlockEnemy.TYPE) {
            this.enemies[i] = new BlockEnemy(i % Config.mapWidth, parseInt(i / Config.mapWidth), this.camera);
        }
    }
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

    if (hero.movingRight || hero.movingLeft) hero.velocityX = hero.velocityXMain;
    if (hero.movingRight) hero.velocityX = Math.abs(hero.velocityX);
    if (hero.movingLeft) hero.velocityX = -Math.abs(hero.velocityX);
    camera.move(hero.x, hero.y);
    hero.x += hero.velocityX * deltatime;
    hero.velocityX *= hero.friction;
};

Controller.prototype.getTile = function(index) {
    if (index >= 0 && index < this.tiles.length && this.tiles[index] !== null) {
        return this.tiles[index];
    }
    return null;
};

Controller.prototype.getEnemy = function(index) {
    if (index >= 0 && index < this.enemies.length && this.enemies[index] !== undefined) {
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