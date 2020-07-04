import Phaser from "phaser";

enum ImageKeys {
  SKY = "sky",
  GROUND = "ground",
  STAR = "star",
  BOMB = "bomb",
  DUDE = "dude",
}

enum AudioKeys {
  COLLECT = "collect",
}

enum AnimKeys {
  LEFT = "left",
  RIGHT = "right",
  TURN = "turn",
}

export default class TestSceneOne extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private stars!: Phaser.Physics.Arcade.Group;
  private bombs!: Phaser.Physics.Arcade.Group;

  private score = 0;
  private scoreText!: Phaser.GameObjects.Text;

  private collectStarSound!: Phaser.Sound.BaseSound;

  private gameOver = false;

  constructor() {
    super("testSceneOne");
  }

  preload() {
    this.load.image(ImageKeys.SKY, "assets/sky.png");
    this.load.image(ImageKeys.GROUND, "assets/platform.png");
    this.load.image(ImageKeys.STAR, "assets/star.png");
    this.load.image(ImageKeys.BOMB, "assets/bomb.png");
    this.load.spritesheet(ImageKeys.DUDE, "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.load.audio(AudioKeys.COLLECT, "assets/sounds/completetask_0.mp3");
  }

  create() {
    this.add.image(0, 0, ImageKeys.SKY).setOrigin(0, 0);

    const platforms: Phaser.Physics.Arcade.StaticGroup = this.physics.add.staticGroup();

    platforms.create(400, 568, ImageKeys.GROUND).setScale(2).refreshBody();

    platforms.create(600, 400, ImageKeys.GROUND);
    platforms.create(50, 250, ImageKeys.GROUND);
    platforms.create(750, 220, ImageKeys.GROUND);

    this.player = this.physics.add.sprite(100, 450, ImageKeys.DUDE);

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: AnimKeys.LEFT,
      frames: this.anims.generateFrameNumbers(ImageKeys.DUDE, {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: AnimKeys.TURN,
      frames: [{ key: ImageKeys.DUDE, frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: AnimKeys.RIGHT,
      frames: this.anims.generateFrameNumbers(ImageKeys.DUDE, {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(this.player, platforms);

    this.stars = this.physics.add.group({
      key: ImageKeys.STAR,
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.stars.children.iterate((star) => {
      const child = star as Phaser.Physics.Arcade.Image;
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(this.stars, platforms);

    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      undefined,
      this
    );

    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000",
    });

    this.bombs = this.physics.add.group();
    this.physics.add.collider(this.bombs, platforms);
    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBombs,
      undefined,
      this
    );

    this.collectStarSound = this.sound.add(AudioKeys.COLLECT);
  }

  update() {
    const cursors: Phaser.Types.Input.Keyboard.CursorKeys = this.input.keyboard.createCursorKeys();

    if (cursors.left?.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play(AnimKeys.LEFT, true);
    } else if (cursors.right?.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play(AnimKeys.RIGHT, true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play(AnimKeys.TURN);
    }

    if (cursors.up?.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

  private collectStar(
    player: Phaser.GameObjects.GameObject,
    star: Phaser.GameObjects.GameObject
  ) {
    const s = star as Phaser.Physics.Arcade.Image;
    s.disableBody(true, true);
    this.collectStarSound.play();

    this.score += 10;
    this.scoreText.setText("Score: " + this.score);

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate((child) => {
        const c = child as Phaser.Physics.Arcade.Image;

        c.enableBody(true, c.x, 0, true, true);
      });

      if (this.player) {
        const x =
          this.player.x < 400
            ? Phaser.Math.Between(400, 800)
            : Phaser.Math.Between(0, 400);

        var bomb = this.bombs.create(x, 16, ImageKeys.BOMB);
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      }
    }
  }

  private hitBombs(
    player: Phaser.GameObjects.GameObject,
    bomb: Phaser.GameObjects.GameObject
  ) {
    this.physics.pause();
    this.player.setTint(0xff0000);
    this.player.anims.play(AnimKeys.TURN);

    this.gameOver = true;
  }
}
