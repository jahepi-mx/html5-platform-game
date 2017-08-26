// Static class members
Tile.WALL_TYPE = 1;
Tile.PLATFORM_TYPE = 2;
Tile.TEXTURE_TYPE = 4;

Tile.TYPE = [];
Tile.TYPE[1] = {asset: "rock", type: Tile.WALL_TYPE};
Tile.TYPE[2] = {asset: "rock_left_grass", type: Tile.WALL_TYPE};
Tile.TYPE[3] = {asset: "rock_right_grass", type: Tile.WALL_TYPE};
Tile.TYPE[4] = {asset: "ice_center", type: Tile.WALL_TYPE};
Tile.TYPE[5] = {asset: "grass_left_ice", type: Tile.WALL_TYPE};
Tile.TYPE[6] = {asset: "grass_right_ice", type: Tile.WALL_TYPE};
Tile.TYPE[7] = {asset: "grass_left_lava", type: Tile.WALL_TYPE};
Tile.TYPE[8] = {asset: "grass_right_lava", type: Tile.WALL_TYPE};
Tile.TYPE[9] = {asset: "rock_left_lava", type: Tile.WALL_TYPE};
Tile.TYPE[10] = {asset: "rock_right_lava", type: Tile.WALL_TYPE};
Tile.TYPE[11] = {asset: "grass_right_platform", type: Tile.PLATFORM_TYPE};
Tile.TYPE[12] = {asset: "grass_center_platform", type: Tile.PLATFORM_TYPE};
Tile.TYPE[13] = {asset: "grass_left_platform", type: Tile.PLATFORM_TYPE};
Tile.TYPE[14] = {asset: "rock_right", type: Tile.WALL_TYPE};
Tile.TYPE[15] = {asset: "rock_center", type: Tile.WALL_TYPE};
Tile.TYPE[16] = {asset: "rock_left", type: Tile.WALL_TYPE};
Tile.TYPE[17] = {asset: "grass_left", type: Tile.WALL_TYPE};
Tile.TYPE[18] = {asset: "grass_center", type: Tile.WALL_TYPE};
Tile.TYPE[19] = {asset: "grass_right", type: Tile.WALL_TYPE};
Tile.TYPE[20] = {asset: "flower", type: Tile.TEXTURE};
Tile.TYPE[21] = {asset: "mushroom", type: Tile.TEXTURE};
Tile.TYPE[22] = {asset: "grass", type: Tile.TEXTURE};
Tile.TYPE[23] = {asset: "rocks", type: Tile.TEXTURE};
Tile.TYPE[24] = {asset: "top_shadow_round_left", type: Tile.TEXTURE};
Tile.TYPE[25] = {asset: "top_shadow_round_center", type: Tile.TEXTURE};
Tile.TYPE[26] = {asset: "top_shadow_round_right", type: Tile.TEXTURE};
Tile.TYPE[27] = {asset: "center_shadow_right", type: Tile.TEXTURE};
Tile.TYPE[28] = {asset: "center_shadow_center", type: Tile.TEXTURE};
Tile.TYPE[29] = {asset: "center_shadow_left", type: Tile.TEXTURE};
Tile.TYPE[30] = {asset: "bottom_shadow_round_left", type: Tile.TEXTURE};
Tile.TYPE[31] = {asset: "bottom_shadow_round_center", type: Tile.TEXTURE};
Tile.TYPE[32] = {asset: "bottom_shadow_round_right", type: Tile.TEXTURE};
Tile.TYPE[33] = {asset: "shadow_right", type: Tile.TEXTURE};
Tile.TYPE[34] = {asset: "shadow_center", type: Tile.TEXTURE};
Tile.TYPE[35] = {asset: "shadow_left", type: Tile.TEXTURE};

function Tile(x, y, width, height, typeIndex, camera) {
    this.x = x * width;
    this.y = y * height;
    this.width = width;
    this.height = height;
    this.typeIndex = typeIndex;
    this.camera = camera;
    this.type = Tile.TYPE[typeIndex].type;
    this.asset = Tile.TYPE[typeIndex].asset; 
}

Tile.prototype.left = function() {
    return this.x - this.camera.x;
};

Tile.prototype.right = function() {
    return (this.x + this.width) - this.camera.x;
};

Tile.prototype.top = function() {
    return this.y - this.camera.y;
};

Tile.prototype.bottom = function() {
    return (this.y + this.height) - this.camera.y;
};

Tile.prototype.draw = function(context) {
    if (Config.debug) {
        context.fillStyle = "white";
        context.fillRect(this.x - this.camera.x, this.y - this.camera.y, this.width, this.height);
    } else {
        context.drawImage(Assets.tilesAtlas, Atlas.tiles[this.asset].x, Atlas.tiles[this.asset].y, Atlas.tiles[this.asset].width, Atlas.tiles[this.asset].height, this.x - this.camera.x, this.y - this.camera.y, this.width + 1, this.height + 1);
    }
};
