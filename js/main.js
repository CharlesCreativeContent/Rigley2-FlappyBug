var game;
//Initialized Variables//
var mt;
var muted = 0;
var music;
// bird gravity, will make bird fall if you dont flap
var birdGravity = 800;
// horizontal bird speed
var birdSpeed = 125;
// flap thrust
var birdFlapPower = 300;
// minimum pipe height, in pixels. Affects hole position
var minPipeHeight = 50;
// distance range from next pipe,
var pipeDistance = [220, 280];
// hole range between pipes,
var pipeHole = [100, 130];
//sessionStorage Object
var Score = 0;
window.onload = function () {
  let gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: 0x000000,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 320,
      height: 480
    },
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: {
          y: 0
        }
      }
    },
    scene: [StartMenu, playGame]
  };

  game = new Phaser.Game(gameConfig);
  window.focus();
};

class StartMenu extends Phaser.Scene {
  constructor() {
    super("StartMenu");
  }
  preload() {
    this.load.audio(
      "castle",
      "https://dl.dropboxusercontent.com/s/kajca5s5njd59l3/Castlevania%20SOTN%3A%20Lost%20Painting.mp3?dl=0"
    );

    this.load.audio(
      "plush",
      "https://dl.dropboxusercontent.com/s/ir9bcknzlpjrmor/Dog-Toy-Sounds-That-Makes-Dog-Tilt-Head-Left-Right-Prank-Your-Dog-dog-tv-stimulation_jJCA-DqNUlk%20%281%29%20%28mp3cut.net%29.mp3?dl=0"
    );

    this.load.audio(
      "click",
      "https://dl.dropboxusercontent.com/s/v4pf0m4zpaeh5vh/completetask_0.mp3?dl=0"
    );

    this.load.image("clickText", "https://i.imgur.com/hKyGku3.png?1");
    this.load.spritesheet("Matrix", "https://i.imgur.com/4ONvhqD.png?1", {
      frameWidth: 32,
      frameHeight: 25
    });
    this.load.image("flappyTitle", " https://i.imgur.com/kDQGZqs.png?1");
    this.load.image("rigleyTitle", " https://i.imgur.com/L45dEBC.png?1");
    this.load.spritesheet("buttons", "https://i.imgur.com/cyRo6ml.png?1", {
      frameWidth: 362,
      frameHeight: 125
    });
    this.load.spritesheet("silverScore", "https://i.imgur.com/67AP4NJ.png?1", {
      frameWidth: 97,
      frameHeight: 96
    });

    this.load.spritesheet("goldScore", "https://i.imgur.com/bVWegdj.png?1", {
      frameWidth: 97,
      frameHeight: 96
    });

    this.load.spritesheet("bird", "https://i.imgur.com/enFv9zJ.png", {
      frameWidth: 40,
      frameHeight: 24
    });

    this.load.image("pipe", "https://i.imgur.com/aMJqRTI.png?1");

    this.load.spritesheet("matrix", "https://i.imgur.com/Pp4QtuU.png?1", {
      frameWidth: 30,
      frameHeight: 62
    });

    this.load.image("spark", "https://i.imgur.com/hhEiLQM.png?1");

    this.load.image("Score", "https://i.imgur.com/ek2RFzm.png?1");

    this.load.image("HiScore", "https://i.imgur.com/f2wTfOT.png?1");

    this.load.image("musicIcon", "https://i.imgur.com/uwrr1V2.png?1");

    this.load.image("home", "https://i.imgur.com/J72Mb1J.png?1");
  }

  create() {
    let title = this.add
      .image(160, 140, "rigleyTitle")
      .setOrigin(0.5)
      .setScale(0.45)
      .setDepth(4)
      .setTint(0xffffff, 0xffffff, 0xaeb0af, 0xaeb0af);

    let titleS = this.add
      .image(162, 148, "rigleyTitle")
      .setOrigin(0.5)
      .setScale(0.45)
      .setDepth(3)
      .setTint(0xff0000);

    let titleBS = this.add
      .image(162, 145, "rigleyTitle")
      .setOrigin(0.5)
      .setScale(0.45)
      .setDepth(3)
      .setTint(0x000000);

    let flappyB = this.add
      .image(160, 200, "flappyTitle")
      .setOrigin(0.5)
      .setScale(0.32)
      .setDepth(4)
      .setTint(0xffffff, 0xffffff, 0xaeb0af, 0xaeb0af);

    let flappyBS = this.add
      .image(162, 208, "flappyTitle")
      .setOrigin(0.5)
      .setScale(0.32)
      .setTint(0xff0000)
      .setDepth(3);

    let flappyBBS = this.add
      .image(162, 205, "flappyTitle")
      .setOrigin(0.5)
      .setScale(0.32)
      .setTint(0x000000)
      .setDepth(3);

    let Click = this.add
      .image(160, 290, "clickText")
      .setOrigin(0.5)
      .setScale(0.6)
      .setDepth(4);

    let ClickS = this.add
      .image(162, 294, "clickText")
      .setOrigin(0.5)
      .setScale(0.6)
      .setTint(0xff0000)
      .setDepth(2);

    let ClickBS = this.add
      .image(161, 293, "clickText")
      .setOrigin(0.5)
      .setScale(0.6)
      .setTint(0x000000)
      .setDepth(3);

    let customButt = this.add
      .sprite(130, 350, "buttons")
      .setAlpha(1)
      .setOrigin(0.5)
      .setDepth(1)
      .setFrame(2)
      .setScale(0.2, 0.7)
      .setInteractive();

    let soundButt = this.add
      .sprite(190, 350, "buttons")
      .setAlpha(1)
      .setOrigin(0.5)
      .setDepth(1)
      .setFrame(2)
      .setScale(0.2, 0.7)
      .setInteractive()
      .on("pointerdown", () => {
        if (game.sound.mute === false) {
          game.sound.mute = true;
          soundButt.setFrame(4);
          soundButt.y = 358;
        } else {
          game.sound.mute = false;
          var coin = this.sound.add("click");
          coin.play();
          soundButt.y = 350;
          soundButt.setFrame(2);
        }
      });
    this.add
      .image(190, 356, "musicIcon")
      .setOrigin(0.5)
      .setScale(0.1)
      .setDepth(4)
      .setTint(0xffffff);
    this.add
      .image(191, 358, "musicIcon")
      .setOrigin(0.5)
      .setScale(0.1)
      .setDepth(3)
      .setTint(0x000000);
    let soundIcon = this.add
      .image(192, 360, "musicIcon")
      .setOrigin(0.5)
      .setScale(0.1)
      .setDepth(2)
      .setTint(0xff0000);

    if (game.sound.mute === true) {
      soundButt.setFrame(4);
      soundButt.y = 358;
    }

    let Butt = this.add
      .sprite(162, 280, "buttons")
      .setAlpha(1)
      .setDepth(1)
      .setInteractive()
      .on("pointerdown", () => {
        //Button Sound effect
        var coin = this.sound.add("click");
        coin.play();

        //Starts the background music
        music = this.sound.add("castle");
        music.play({ volume: 0.1 });
        music.setLoop(true);

        this.cameras.main.fadeOut(1000);
        Butt.disableInteractive();
        setTimeout(() => {
          this.scene.stop("StartGame");
          this.scene.start("playGame");
        }, 1500);
      });
    Butt.setFrame(2).scaleX = 1.1;
    Butt.scaleY = 0.9;

    this.hsv = Phaser.Display.Color.HSVColorWheel();
    setInterval(() => {
      var a = Phaser.Math.Between(0, 359);
      flappyBS.setTint(this.hsv[a].color);
      titleS.setTint(this.hsv[a].color);
      ClickS.setTint(this.hsv[a].color);
      soundIcon.setTint(this.hsv[a].color);
    }, 3000);

    var codeMatrix = {
      width: 21,
      height: 30,
      cellWidth: 16,
      cellHeight: 16,
      getPoints: function (quantity) {
        var cols = new Array(codeMatrix.width).fill(0);
        var lastCol = cols.length - 1;
        var Between = Phaser.Math.Between;
        var RND = Phaser.Math.RND;
        var points = [];

        for (var i = 0; i < quantity; i++) {
          var col = Between(0, lastCol);
          var row = (cols[col] += 1);

          if (RND.frac() < 0.01) {
            row *= RND.frac();
          }

          row %= codeMatrix.height;
          row |= 0;

          points[i] = new Phaser.Math.Vector2(16 * col, 16 * row);
        }

        return points;
      }
    };

    var codeM = this.add.particles("Matrix").createEmitter({
      alpha: { start: 1, end: 0.25, ease: "Expo.easeOut" },
      angle: 0,
      blendMode: "ADD",
      emitZone: { source: codeMatrix, type: "edge", quantity: 2000 },
      frame: Phaser.Utils.Array.NumberArray(8, 58),
      frequency: 100,
      lifespan: 3000,
      quantity: 18,
      scale: -0.5,
      tint: 0x0066ff00
    });
  }

  update() {}
}

class playGame extends Phaser.Scene {
  constructor() {
    super("playGame");
  }
  preload() {}

  create() {
    //Rigley our hero
    this.bird = this.physics.add
      .sprite(80, game.config.height / 2, "bird")
      .setDepth(4);
    this.bird.setVelocityY(-300).setAngle(-25);
    this.bird.setAngularAcceleration(60);

    //Makes Rigley Run
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("bird", { start: 0, end: 2 }),
      frameRate: 13,
      repeat: -1
    });

    //Makes Rigley run
    this.bird.anims.play("run", true);

    //Allows Rigley to fall
    this.bird.body.gravity.y = birdGravity;
    //Allows Rigley to fly
    this.input.on("pointerdown", this.flap, this);

    //Rigley Trail lines
    this.Lines = this.add.particles("spark").createEmitter({
      x: 0,
      y: 0,
      follow: this.bird,
      followOffset: {
        x: -5,
        y: 5
      },
      lifespan: 2000,
      speedX: -150,
      scale: { start: 0.05, end: 0 },
      alpha: { start: 0.5, end: 0 },
      quantity: 200,
      blendMode: "SCREEN"
    });

    //Background Matrix
    var codeMatrix = {
      width: 21,
      height: 30,
      cellWidth: 16,
      cellHeight: 16,
      depth: 0,
      getPoints: function (quantity) {
        var cols = new Array(codeMatrix.width).fill(0);
        var lastCol = cols.length - 1;
        var Between = Phaser.Math.Between;
        var RND = Phaser.Math.RND;
        var points = [];

        for (var i = 0; i < quantity; i++) {
          var col = Between(0, lastCol);
          var row = (cols[col] += 1);

          if (RND.frac() < 0.01) {
            row *= RND.frac();
          }

          row %= codeMatrix.height;
          row |= 0;

          points[i] = new Phaser.Math.Vector2(16 * col, 16 * row);
        }

        return points;
      }
    };

    //Actual ones and Zeros in background
    var codeM = this.add.particles("Matrix").createEmitter({
      alpha: { start: 1, end: 0.25, ease: "Expo.easeOut" },
      angle: 0,
      depth: 0,
      speedX: -2,
      blendMode: "ADD",
      emitZone: { source: codeMatrix, type: "edge", quantity: 2000 },
      frame: Phaser.Utils.Array.NumberArray(8, 58),
      frequency: 100,
      lifespan: 3000,
      quantity: 18,
      scale: -0.5,
      tint: 0x0066ff00
    });

    //Creates floor

    let particles2 = this.add.particles("matrix").setDepth(0);
    var floor = particles2.createEmitter({
      frame: [0, 1, 2, 3, 4, 5, 6, 7],
      x: {
        min: 0,
        max: 400
      },
      y: 480,
      lifespan: 1000,
      speedX: -65,
      speedY: -130,
      scale: { start: 0.5, end: 0 },
      alpha: { start: 1, end: 0 },
      quantity: 10,
      blendMode: "ADD"
    });

    //creates Ceiling
    var ceiling = particles2.createEmitter({
      frame: [0, 1, 2, 3, 4, 5, 6, 7],
      x: {
        min: 0,
        max: 400
      },
      y: 0,
      lifespan: 1000,
      speedX: -65,
      speedY: 130,
      scale: { start: 0.5, end: 0 },
      alpha: { start: 1, end: 0 },
      quantity: 10,
      blendMode: "ADD"
    });

    //Creates Pipes
    this.pipeGroup = this.physics.add.group();
    this.pipePool = [];
    for (let i = 0; i < 4; i++) {
      //Pushes Pipes after they exit the screen
      this.pipePool.push(
        this.pipeGroup.create(0, 0, "pipe").setScale(0.5, 1).setAlpha(0)
      );
      this.pipePool.push(
        this.pipeGroup.create(0, 0, "pipe").setScale(0.5, 1).setAlpha(0)
      );
      this.placePipes(false);
    }
    //How fast the pipes move
    this.pipeGroup.setVelocityX(-birdSpeed);

    //Sets Initial Score
    this.score = 0;
    //Sets Best Score
    this.topScore =
      localStorage.getItem(Score) == null ? 0 : localStorage.getItem(Score);
    //initializes score text
    this.scoreText = this.add.text(10, 10, "");
    this.updateScore(this.score);
  }
  //Adds num and updates score text
  updateScore(num) {
    this.score += num;
    this.scoreText.text = "Score: " + this.score + "\nBest: " + this.topScore;
  }
  //
  placePipes(addScore) {
    //Initializes pipehole heights
    let rightmost = this.getRightmostPipe();

    let pipeHoleHeight = Phaser.Math.Between(pipeHole[0], pipeHole[1]);
    let pipeHolePosition = Phaser.Math.Between(
      minPipeHeight + pipeHoleHeight / 2,
      game.config.height - minPipeHeight - pipeHoleHeight / 2
    );

    //Positions pipes so they are placed next to each other with pipe hole in between
    this.pipePool[0].x =
      rightmost +
      this.pipePool[0].getBounds().width +
      Phaser.Math.Between(pipeDistance[0], pipeDistance[1]);
    this.pipePool[0].y = pipeHolePosition - pipeHoleHeight / 2;
    this.pipePool[0].setOrigin(0, 1);
    this.pipePool[1].x = this.pipePool[0].x;
    this.pipePool[1].y = pipeHolePosition + pipeHoleHeight / 2;
    this.pipePool[1].setOrigin(0, 0);

    //Firewall particles
    this.particles = this.add.particles("matrix").setDepth(0);
    let mt = 3;

    if (this.score <= 1) {
      mt = 0;
    } else if (this.score < 3) {
      mt = 4;
    } else if (this.score <= 5) {
      mt = 1;
    } else if (this.score <= 7) {
      mt = 6;
    } else if (this.score < 10) {
      mt = 5;
    } else if (this.score < 15) {
      mt = 3;
    } else if (this.score < 20) {
      mt = 2;
    } else {
      mt = 3;
    }
    //Top Firewall
    this.Top = this.particles.createEmitter({
      frame: mt,
      x: { min: -40, max: 40 },
      y: {
        min: minPipeHeight - pipeHoleHeight / 2 - 315,
        max: minPipeHeight - pipeHoleHeight / 2
      },
      follow: this.pipePool[0],
      followOffset: {
        x: 40,
        y: 5
      },
      lifespan: 400,
      speedX: { min: -200, max: 50 },
      scale: { start: 0.5, end: 0 },
      alpha: { start: 1, end: 0 },
      quantity: 30,
      blendMode: "ADD"
    });

    //Bottom Firewall
    this.Bottom = this.particles.createEmitter({
      frame: mt,
      x: { min: -40, max: 40 },
      y: { min: minPipeHeight - pipeHoleHeight / 2, max: 300 },
      follow: this.pipePool[1],
      followOffset: {
        x: 40,
        y: 10
      },
      lifespan: 400,
      speedX: { min: -200, max: 50 },
      scale: { start: 0.5, end: 0 },
      alpha: { start: 1, end: 0 },
      quantity: 30,
      blendMode: "ADD"
    });

    this.pipePool = [];

    //if pipe disappears update score
    if (addScore) {
      this.updateScore(1);
    }
  }

  flap() {
    this.bird.body.velocity.y = -birdFlapPower;
    this.bird.setAngle(-60);
    this.bird.setAngularVelocity(100);

    //Magic Flap Particles
    let magic = this.add.particles("matrix").setDepth(5);
    let magicEm = magic.createEmitter({
      frame: [0, 1, 2, 3, 4, 5, 6, 7],
      x: { min: 0, max: 0 },
      y: { min: 0, max: 0 },
      lifespan: 1000,
      speedX: { min: -400, max: -100 },
      speedY: { min: 100, max: 400 },
      scale: { start: 0.5, end: 0 },
      quantity: 2,
      blendMode: "ADD",
      fill: 0xff0000
    });
    magicEm.explode(38, this.bird.x, this.bird.y);

    //Trampoline Rigley makes

    var tramp = this.add.particles("spark").createEmitter({
      x: 400,
      y: 300,
      blendMode: "SCREEN",
      scale: { start: 0.2, end: 0 },
      speed: { min: -100, max: 100 },
      angle: 135,
      gravityY: 100,
      quantity: 50,
      emitZone: {
        source: new Phaser.Geom.Line(-25, -25, 25, 0),
        type: "edge",
        quantity: 50
      }
    });

    tramp.explode(38, this.bird.x, this.bird.y + 25);
  }

  getRightmostPipe() {
    let rightmostPipe = 0;
    this.pipeGroup.getChildren().forEach(function (pipe) {
      rightmostPipe = Math.max(rightmostPipe, pipe.x);
    });
    return rightmostPipe;
  }
  update() {
    //Death By Firewall
    this.physics.world.collide(
      this.bird,
      this.pipeGroup,
      function () {
        this.die();
      },
      null,
      this
    );

    //Death by Floor or Ceiling
    if (this.bird.y > game.config.height || this.bird.y < 0) {
      this.die();
    }

    //Places next pipe if a pipe goes off screen
    this.pipeGroup.getChildren().forEach(function (pipe) {
      if (pipe.getBounds().right < 0) {
        this.pipePool.push(pipe);
        if (this.pipePool.length == 2) {
          this.placePipes(true);
        }
      }
    }, this);
  }
  die() {
    //Makes gameover sound
    var deathSound = this.sound.add("plush");
    deathSound.play({ volume: 0.1 });

    //score text disappears
    this.scoreText.destroy();
    //Camera Shake
    this.cameras.main.shake(100);
    //HighScore Updates
    localStorage.setItem(Score, Math.max(this.score, this.topScore));

    //Rigley Lines disappear
    this.Lines.setAlpha(0);

    //Death Explosion
    let particles1 = this.add.particles("matrix").setDepth(5);
    let emitter1 = particles1.createEmitter({
      frame: [0, 1, 2, 3, 4, 5, 6, 7],
      x: { min: -200, max: 200 },
      y: { min: -200, max: 200 },
      lifespan: 1000,
      speedX: { min: -800, max: 800 },
      speedY: { min: -800, max: 800 },
      scale: { start: 1, end: 0 },
      quantity: 20,
      blendMode: "ADD",
      fill: 0xff0000
    });
    emitter1.explode(70, this.bird.x, this.bird.y);
    //Bird Disappears
    this.bird.setAlpha(0);
    this.physics.pause();
    this.bird.y = 0;
    this.bird.x = -20;

    //Ending Score Text
    this.add.image(160, 105, "Score").setDepth(2).setScale(0.5).setOrigin(0.5);
    this.add
      .image(160, 110, "Score")
      .setDepth(1)
      .setScale(0.5)
      .setOrigin(0.5)
      .setTint(0x000000);
    let lastScore = this.add
      .image(160, 113, "Score")
      .setDepth(0)
      .setScale(0.5)
      .setOrigin(0.5)
      .setTint(0xff0000);
    //First digit of Score
    this.add
      .sprite(135, 150, "silverScore")
      .setDepth(0)
      .setScale(0.5)
      .setFrame(Math.floor(this.score / 10));
    //Second Digit of Score
    this.add
      .sprite(185, 150, "silverScore")
      .setDepth(0)
      .setScale(0.5)
      .setFrame(this.score % 10);

    //Ending Hi-Score Text
    let highScore = this.add
      .image(160, 263, "HiScore")
      .setDepth(0)
      .setScale(0.4, 0.5)
      .setOrigin(0.5)
      .setTint(0xff0000);
    this.add
      .image(160, 255, "HiScore")
      .setDepth(2)
      .setScale(0.4, 0.5)
      .setOrigin(0.5);
    this.add
      .image(160, 260, "HiScore")
      .setDepth(1)
      .setScale(0.4, 0.5)
      .setOrigin(0.5)
      .setTint(0x000000);

    //First Digit of Hi-Score
    this.add
      .sprite(135, 300, "goldScore")
      .setDepth(0)
      .setScale(0.5)
      .setFrame(Math.floor(this.topScore / 10));
    //Second Digit of Hi-Score
    this.add
      .sprite(185, 300, "goldScore")
      .setDepth(0)
      .setScale(0.5)
      .setFrame(this.topScore % 10);

    let Click = this.add
      .image(160, 370, "clickText")
      .setOrigin(0.5)
      .setScale(0.6)
      .setDepth(4);

    let ClickS = this.add
      .image(162, 374, "clickText")
      .setOrigin(0.5)
      .setScale(0.6)
      .setTint(0xff0000)
      .setDepth(2);

    let ClickBS = this.add
      .image(161, 373, "clickText")
      .setOrigin(0.5)
      .setScale(0.6)
      .setTint(0x000000)
      .setDepth(3);

    let soundButt = this.add
      .sprite(298, 15, "buttons")
      .setAlpha(1)
      .setOrigin(0.5)
      .setDepth(1)
      .setFrame(2)
      .setScale(0.2, 0.7)
      .setInteractive()
      .on("pointerdown", () => {
        if (game.sound.mute === false) {
          game.sound.mute = true;
          soundButt.setFrame(4);
          soundButt.y = 23;
        } else {
          game.sound.mute = false;
          var coin = this.sound.add("click");
          coin.play();
          soundButt.y = 15;
          soundButt.setFrame(2);
        }
      });

    this.add
      .image(299, 23, "musicIcon")
      .setOrigin(0.5)
      .setScale(0.1)
      .setDepth(4)
      .setTint(0xffffff);
    this.add
      .image(299, 24, "musicIcon")
      .setOrigin(0.5)
      .setScale(0.1)
      .setDepth(3)
      .setTint(0x000000);
    let soundIcon = this.add
      .image(299, 26, "musicIcon")
      .setOrigin(0.5)
      .setScale(0.1)
      .setDepth(2)
      .setTint(0xff0000);

    if (game.sound.mute === true) {
      soundButt.setFrame(4);
      soundButt.y = 23;
    }
    this.add.image(22, 24, "home").setScale(0.05).setDepth(4);
    this.add.image(22, 28, "home").setScale(0.05).setDepth(3).setTint(0x000000);

    let homeIcon = this.add
      .image(22, 29, "home")
      .setScale(0.05)
      .setDepth(2)
      .setTint(0xff0000);

    let homeButt = this.add
      .sprite(22, 15, "buttons")
      .setAlpha(1)
      .setOrigin(0.5)
      .setDepth(1)
      .setFrame(2)
      .setScale(0.2, 0.7)
      .setInteractive()
      .on("pointerdown", () => {
        this.cameras.main.fadeOut(1000);
        var coin = this.sound.add("click");
        coin.play();
        music.stop();

        setTimeout(() => {
          this.scene.stop("playGame");
          this.scene.start("StartMenu");
        }, 1500);
      });

    let Butt = this.add
      .sprite(162, 360, "buttons")
      .setAlpha(1)
      .setDepth(1)
      .setInteractive()
      .on("pointerdown", () => {
        var coin = this.sound.add("click");
        coin.play();
        this.cameras.main.fadeOut(1000);
        Butt.disableInteractive();
        setTimeout(() => {
          this.scene.restart();
        }, 1500);
      });
    Butt.setFrame(2).scaleX = 1.1;
    Butt.scaleY = 0.9;

    var hsv = Phaser.Display.Color.HSVColorWheel();
    setInterval(() => {
      var a = Phaser.Math.Between(0, 359);
      lastScore.setTint(hsv[a].color);
      highScore.setTint(hsv[a].color);
      ClickS.setTint(hsv[a].color);
      soundIcon.setTint(hsv[a].color);
      homeIcon.setTint(hsv[a].color);
    }, 3000);
  }
}
