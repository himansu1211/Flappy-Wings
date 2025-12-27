let config = {
      renderer: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      physics: {
            default: "arcade",
            arcade: {
                  gravity: { y: 200 },
                  debug: false
            }
      },
      scene: {
            preload: preload,
            create: create,
            update: update
      },
      scale: {
            mode: Phaser.Scale.RESIZE,
            autoCenter: Phaser.Scale.CENTER_BOTH
      }

};


let game = new Phaser.Game(config);
var bird;
var cursors;
var background;
var messageToPlayer;
let hasLanded = false;
let hasBumped = false;
let isGameStarted = false;

function preload () {
      this.load.image("background", "assets/background.png");
      this.load.image("road", "assets/road.png");
      this.load.image("column", "assets/column2.png");
      this.load.image("title", "assets/title.png")
      // 'sprite' can be animated
      this.load.spritesheet("bird", "assets/bird.png", { frameWidth: 104, frameHeight: 106 });
}

function create () { 
      const { width, height } = this.sys.game.config;

      background = this.add.tileSprite(0, 0, width, height, 'background').setOrigin(0, 0).setScale(1.35);
      background.setName('background');
      
      const columnGap = width / 7;
      const topColumns = this.physics.add.staticGroup();
      const bottomColumns = this.physics.add.staticGroup();

      for (let i = 1; i <= 1; i++) {
            let topCol = topColumns.create(i * columnGap + 150, height / 9, 'column');
            let bottomCol = bottomColumns.create(i * columnGap + 400, height / 1.5, 'column');
            let colScale = Math.min(width / 1000, height / 1000);
            topCol.setScale(colScale).refreshBody();
            bottomCol.setScale(colScale).refreshBody();
            topCol.setAlpha(0.85);
            bottomCol.setAlpha(0.85);
      }

      for (let i = 1; i <= 1; i++) {
            let topCol = topColumns.create(2 * i * columnGap + 480, height / 9, 'column');
            let bottomCol = bottomColumns.create(2 * i * columnGap + 750, height / 1.5, 'column');
            let colScale = Math.min(width / 1000, height / 1000);
            topCol.setScale(colScale).refreshBody();
            bottomCol.setScale(colScale).refreshBody();
            topCol.setAlpha(0.85);
            bottomCol.setAlpha(0.85);
      }
      
      this.roadVisual = this.add.tileSprite(width / 2, height - 60, width, 66, 'road')
            .setOrigin(0.5, 0.5).setDepth(1);
      const roads = this.physics.add.staticGroup();
      const roadCollider = roads.create(width / 2, height - 50, 'road');
      roadCollider.setScale(width / 800, 1.5).refreshBody();
      
      const road = roads.create(width / 2, height - 50, 'road');
      road.setScale(width/800,1.5).refreshBody();
      
      bird = this.physics.add.sprite(0, 50, 'bird').setScale(width/500);
      
      // setBounce() to specify that the bird should bounce slightly if it collides with something
      bird.setBounce(0.2);
      
      // .setCollideWorldBounds() to enable bumping into the edges of the screen, but not go through it
      bird.setCollideWorldBounds(true);
      
      // to specify that when the bird hits the road, we will set hasLanded to true
      this.physics.add.overlap(bird, road, () => hasLanded = true, null, this);
      this.physics.add.collider(bird, road);

      // to make the bird not pass through the column and 
      // if the bird hits one of the columns, hasBumped will be set to true
      this.physics.add.overlap(bird, bottomColumns, ()=>hasBumped=true,null, this);
      this.physics.add.overlap(bird, topColumns, ()=>hasBumped=true,null, this);
      this.physics.add.collider(bird, bottomColumns);
      this.physics.add.collider(bird, topColumns);

      // createCursorKeys() creates and returns an object containing 4 hotkeys for
      // Up, Down, Left, Right, Space Bar and shift
      cursors = this.input.keyboard.createCursorKeys();
      
      messageToPlayer = this.add.text(width / 2, height - 50,
      "Instructions: Press space bar to start", {
            fontFamily: '"Comic Sans MS", Times, serif',
            fontSize: "20px",
            color: "#000000",
            backgroundColor: "#ffffff"
      }).setOrigin(0.5, 0.5).setDepth(10);

      // to centre the text
      messageToPlayer.setOrigin(0.5,0.5);
      messageToPlayer.setName('message');

      // to handle window resize
      this.scale.on('resize', resize, this);
}

// update objects in the game
function update () {
      // if the user presses the space key, and the isGameStarted variable is false (its initial value),
      // then we will set it to true and start the game
      // Start game on space press only once
      if (cursors.space.isDown && !isGameStarted) {
        isGameStarted = true;
        messageToPlayer.text = "Press \"^\" to stay upright and don't\n       hit the columns or ground";
      }

      if (isGameStarted && !hasLanded && !hasBumped) {
            background.tilePositionX += 1.6; // Speed of background movement
      }
      
      // bird doesn't move unless 'isGameStarted' is set to true
      if (!isGameStarted) {
            bird.setVelocityY(-160);
      }

      // to make sure it stops moving right if it bumps into a column
      if (cursors.up.isDown && !hasLanded && !hasBumped) {
            bird.setVelocityY(-160);
      }
      
      // bird should continually move right,
      // unless it hits a column or the ground
       if(isGameStarted && (!hasLanded || !hasBumped)) {
            bird.body.velocity.x = 55;
      } else {
            bird.body.velocity.x = -10;
      }

      if (isGameStarted && !hasLanded && !hasBumped) {
            background.tilePositionX += 1.3; // Background speed
            this.roadVisual.tilePositionX += 2; // Road moves slightly faster for depth
      }

      // when the bird hits the ground or bumps into a column
      if (hasLanded || hasBumped) {
            messageToPlayer.text = `Oh no! You crashed!`;
            createRetryButton.call(this);  // Show retry button
      }

      // when the bird reaches the far right of the screen
      if (bird.x > (this.sys.game.config.width - 235)) {
            // to slow down the speed at which it falls so that it gently floats to the road
            bird.setVelocityY(60);
            messageToPlayer.text = `Congrats! You won!`;
      }
}

// to resize accd to device accessed with
function resize (gameSize) {
      let width = gameSize.width;
      let height = gameSize.height;

      this.cameras.resize(width, height);

      // Adjust background and text position
      const background = this.children.getByName('background');
      if (background) {
            background.displayWidth = width;
            background.displayHeight = height;
      }

      const message = this.children.getByName('message');
      if (message) {
            message.setPosition(width / 2, height - 50);
            message.setFontSize(width < 600 ? "16px" : "24px");
      }
}

function createRetryButton() {
    const { width, height } = this.sys.game.config;

    const buttonWidth = 180;
    const buttonHeight = 80;
    const spacing = 70; // Space between buttons

    const centerX = width / 2;
    const centerY = height / 2.2;

    // Create "Play Again" button
    const playAgainGraphics = this.add.graphics();
    playAgainGraphics.lineStyle(8, 0xffffff);
    playAgainGraphics.strokeRect(centerX - buttonWidth - spacing / 2, centerY - buttonHeight / 2, buttonWidth, buttonHeight);
    playAgainGraphics.fillStyle(0x76c178, 1);
    playAgainGraphics.fillRect(centerX - buttonWidth - spacing / 2, centerY - buttonHeight / 2, buttonWidth, buttonHeight);

    const playAgainText = this.add.text(centerX - buttonWidth / 2 - spacing / 2, centerY, 'Play Again', {
        fontFamily: '"Comic Sans MS", Times, serif',
        fontSize: '28px',
        color: '#ffffff'
    }).setOrigin(0.5).setInteractive();

    playAgainText.on('pointerdown', () => {
        this.scene.restart();
        hasLanded = false;
        hasBumped = false;
        isGameStarted = false;
    });

    // Create "Exit" button
    const exitGraphics = this.add.graphics();
    exitGraphics.lineStyle(8, 0xffffff);
    exitGraphics.strokeRect(centerX + spacing / 2, centerY - buttonHeight / 2, buttonWidth, buttonHeight);
    exitGraphics.fillStyle(0xd9534f, 1);
    exitGraphics.fillRect(centerX + spacing / 2, centerY - buttonHeight / 2, buttonWidth, buttonHeight);

    const exitText = this.add.text(centerX + buttonWidth / 2 + spacing / 2, centerY, 'Exit', {
        fontFamily: '"Comic Sans MS", Times, serif',
        fontSize: '28px',
        color: '#ffffff',
    }).setOrigin(0.5).setInteractive();

    exitText.on('pointerdown', () => {
        window.location.href = "index.html"; // Redirect to main menu or exit page
    });
}