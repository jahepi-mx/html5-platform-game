Assets = {};

Assets.srcs = [
    "assets/tiles/sprites.png", 
    "assets/hero/sprites.png", 
    "assets/enemies/sprites.png", 
    "assets/gui/sprites.png"
];

Assets.keys = [
    "tilesAtlas", 
    "heroAtlas", 
    "enemiesAtlas",
    "guiAtlas"
];

Assets.audio = {};

Assets.audio.srcs = [
    "assets/audio/level1_music.mp3",
    "assets/audio/coin_sound.mp3",
    "assets/audio/enemy_laser_sound.mp3",
    "assets/audio/hero_laser_sound.mp3",
    "assets/audio/explosion_sound.mp3",
    "assets/audio/jump_sound.mp3",
];

Assets.audio.keys = [
    "level1_music", 
    "coin_sound",
    "enemy_laser_sound",
    "hero_laser_sound",
    "explosion_sound",
    "jump_sound",
];

Assets.callback = null;

Assets.loadAll = function(callback) {
    Assets.callback = callback;
    for (var i = 0; i < Assets.keys.length; i++) {
        Assets[Assets.keys[i]] = new Image();
    }
    Assets.load(0);
};

Assets.load = function(index) {
    Assets[Assets.keys[index]].onload = function() {
        if (index + 1 >= Assets.srcs.length) {
            console.log("loaded");
            Assets.loadAllAudio();
        } else {
            Assets.load(index + 1);
        }
    };
    Assets[Assets.keys[index]].src = Assets.srcs[index];
};

Assets.loadAllAudio = function() {
    for (var i = 0; i < Assets.audio.keys.length; i++) {
        Assets[Assets.audio.keys[i]] = new Audio();
        Assets[Assets.audio.keys[i]].addEventListener('canplaythrough', Assets.onLoadAudio, false);
        Assets[Assets.audio.keys[i]].src = Assets.audio.srcs[i];
    }
};

Assets.audioCount = 0;
Assets.onLoadAudio = function() {
    Assets.audioCount++;
    console.log("audio loaded");
    if (Assets.audioCount === Assets.audio.srcs.length) {
        if (Assets.callback !== null) {
            Assets.callback();
        }
    }
};