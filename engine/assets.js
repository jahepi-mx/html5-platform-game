Assets = {
    tiles: {
      wall: new Image(),
      platform: new Image(),
      platform_left: new Image(),
      platform_right: new Image(),
      platform_center: new Image(),
      acid: new Image(),
      acid_background: new Image(),
      background: new Image(),
    },
    hero: {
        idle: {
            sprite0: new Image(),
            sprite1: new Image(),
            sprite2: new Image(),
            sprite3: new Image(),
            sprite4: new Image(),
            sprite5: new Image(),
            sprite6: new Image(),
            sprite7: new Image(),
            sprite8: new Image(),
            sprite9: new Image(),
        },
        run: {
            sprite0: new Image(),
            sprite1: new Image(),
            sprite2: new Image(),
            sprite3: new Image(),
            sprite4: new Image(),
            sprite5: new Image(),
            sprite6: new Image(),
            sprite7: new Image(),
        },
        shoot: {
            sprite0: new Image(),
            sprite1: new Image(),
            sprite2: new Image(),
            sprite3: new Image(),
        },
        jump: {
            sprite0: new Image(),
            sprite1: new Image(),
            sprite2: new Image(),
            sprite3: new Image(),
            sprite4: new Image(),
            sprite5: new Image(),
            sprite6: new Image(),
            sprite7: new Image(),
            sprite8: new Image(),
            sprite9: new Image(), 
        },
        run_shoot: {
            sprite0: new Image(),
            sprite1: new Image(),
            sprite2: new Image(),
            sprite3: new Image(),
            sprite4: new Image(),
            sprite5: new Image(),
            sprite6: new Image(),
            sprite7: new Image(),
            sprite8: new Image(),
        },
        jump_shoot: {
            sprite0: new Image(),
            sprite1: new Image(),
            sprite2: new Image(),
            sprite3: new Image(),
            sprite4: new Image(),
        },
        blast: {
            sprite0: new Image(),
            sprite1: new Image(),
            sprite2: new Image(),
            sprite3: new Image(),
            sprite4: new Image(),
        },
        blast_explosion: {
            sprite0: new Image(),
            sprite1: new Image(),
            sprite2: new Image(),
            sprite3: new Image(),
            sprite4: new Image(),
            sprite5: new Image(),
        }
    }
};

// Tiles
Assets.tiles.wall.src = 'assets/tiles/wall.png';
Assets.tiles.platform.src = 'assets/tiles/platform.png';
Assets.tiles.platform_left.src = 'assets/tiles/platform_left.png';
Assets.tiles.platform_right.src = 'assets/tiles/platform_right.png';
Assets.tiles.platform_center.src = 'assets/tiles/platform_center.png';
Assets.tiles.acid.src = 'assets/tiles/acid.png';
Assets.tiles.acid_background.src = 'assets/tiles/acid_background.png';
Assets.tiles.background.src = 'assets/tiles/background.png';

// Hero - Idle
Assets.hero.idle.sprite0.src = 'assets/hero/idle/idle1.png';
Assets.hero.idle.sprite1.src = 'assets/hero/idle/idle2.png';
Assets.hero.idle.sprite2.src = 'assets/hero/idle/idle3.png';
Assets.hero.idle.sprite3.src = 'assets/hero/idle/idle4.png';
Assets.hero.idle.sprite4.src = 'assets/hero/idle/idle5.png';
Assets.hero.idle.sprite5.src = 'assets/hero/idle/idle6.png';
Assets.hero.idle.sprite6.src = 'assets/hero/idle/idle7.png';
Assets.hero.idle.sprite7.src = 'assets/hero/idle/idle8.png';
Assets.hero.idle.sprite8.src = 'assets/hero/idle/idle9.png';
Assets.hero.idle.sprite9.src = 'assets/hero/idle/idle10.png';

// Hero - Run
Assets.hero.run.sprite0.src = 'assets/hero/run/run1.png';
Assets.hero.run.sprite1.src = 'assets/hero/run/run2.png';
Assets.hero.run.sprite2.src = 'assets/hero/run/run3.png';
Assets.hero.run.sprite3.src = 'assets/hero/run/run4.png';
Assets.hero.run.sprite4.src = 'assets/hero/run/run5.png';
Assets.hero.run.sprite5.src = 'assets/hero/run/run6.png';
Assets.hero.run.sprite6.src = 'assets/hero/run/run7.png';
Assets.hero.run.sprite7.src = 'assets/hero/run/run8.png';

// Hero - Jump
Assets.hero.jump.sprite0.src = 'assets/hero/jump/jump1.png';
Assets.hero.jump.sprite1.src = 'assets/hero/jump/jump2.png';
Assets.hero.jump.sprite2.src = 'assets/hero/jump/jump3.png';
Assets.hero.jump.sprite3.src = 'assets/hero/jump/jump4.png';
Assets.hero.jump.sprite4.src = 'assets/hero/jump/jump5.png';
Assets.hero.jump.sprite5.src = 'assets/hero/jump/jump6.png';
Assets.hero.jump.sprite6.src = 'assets/hero/jump/jump7.png';
Assets.hero.jump.sprite7.src = 'assets/hero/jump/jump8.png';
Assets.hero.jump.sprite8.src = 'assets/hero/jump/jump9.png';
Assets.hero.jump.sprite9.src = 'assets/hero/jump/jump10.png';

// Hero - JumpShoot
Assets.hero.jump_shoot.sprite0.src = 'assets/hero/jump_shoot/jump_shoot1.png';
Assets.hero.jump_shoot.sprite1.src = 'assets/hero/jump_shoot/jump_shoot2.png';
Assets.hero.jump_shoot.sprite2.src = 'assets/hero/jump_shoot/jump_shoot3.png';
Assets.hero.jump_shoot.sprite3.src = 'assets/hero/jump_shoot/jump_shoot4.png';
Assets.hero.jump_shoot.sprite4.src = 'assets/hero/jump_shoot/jump_shoot5.png';

// Hero - RunShoot
Assets.hero.run_shoot.sprite0.src = 'assets/hero/run_shoot/run_shoot1.png';
Assets.hero.run_shoot.sprite1.src = 'assets/hero/run_shoot/run_shoot2.png';
Assets.hero.run_shoot.sprite2.src = 'assets/hero/run_shoot/run_shoot3.png';
Assets.hero.run_shoot.sprite3.src = 'assets/hero/run_shoot/run_shoot4.png';
Assets.hero.run_shoot.sprite4.src = 'assets/hero/run_shoot/run_shoot5.png';
Assets.hero.run_shoot.sprite5.src = 'assets/hero/run_shoot/run_shoot6.png';
Assets.hero.run_shoot.sprite6.src = 'assets/hero/run_shoot/run_shoot7.png';
Assets.hero.run_shoot.sprite7.src = 'assets/hero/run_shoot/run_shoot8.png';
Assets.hero.run_shoot.sprite8.src = 'assets/hero/run_shoot/run_shoot9.png';

// Hero - Shoot
Assets.hero.shoot.sprite0.src = 'assets/hero/shoot/shoot1.png';
Assets.hero.shoot.sprite1.src = 'assets/hero/shoot/shoot2.png';
Assets.hero.shoot.sprite2.src = 'assets/hero/shoot/shoot3.png';
Assets.hero.shoot.sprite3.src = 'assets/hero/shoot/shoot4.png';

// Hero - Blast
Assets.hero.blast.sprite0.src = 'assets/hero/blast/blast1.png';
Assets.hero.blast.sprite1.src = 'assets/hero/blast/blast2.png';
Assets.hero.blast.sprite2.src = 'assets/hero/blast/blast3.png';
Assets.hero.blast.sprite3.src = 'assets/hero/blast/blast4.png';
Assets.hero.blast.sprite4.src = 'assets/hero/blast/blast5.png';

// Hero - BlastExplosion
Assets.hero.blast_explosion.sprite0.src = 'assets/hero/blast_explosion/blast_explosion1.png';
Assets.hero.blast_explosion.sprite1.src = 'assets/hero/blast_explosion/blast_explosion2.png';
Assets.hero.blast_explosion.sprite2.src = 'assets/hero/blast_explosion/blast_explosion3.png';
Assets.hero.blast_explosion.sprite3.src = 'assets/hero/blast_explosion/blast_explosion4.png';
Assets.hero.blast_explosion.sprite4.src = 'assets/hero/blast_explosion/blast_explosion5.png';
Assets.hero.blast_explosion.sprite5.src = 'assets/hero/blast_explosion/blast_explosion6.png';

