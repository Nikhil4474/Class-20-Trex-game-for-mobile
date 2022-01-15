var trex, trexRunnning, trexcollided;
var ground, groundImage;
var invisibleGround;
var clouds, cloudImages;
var obstacles,
  obstaclesImage1,
  obstaclesImage2,
  obstaclesImage3,
  obstaclesImage4,
  obstaclesImage5,
  obstaclesImage6;
var gameOver, gameOverImage;
var restart, restartImage;
var diesound,jumpsound,checkpoint

var score = 0;
var highscore = score;

var Play = 1;
var End = 0;
var gameState = Play;

var cloudsGroup;
var obstaclesGroup;
// preload is used to load the images or sounds or videos
function preload() {
  trexRunnning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png");
  cloudsImage = loadImage("cloud.png");
  obstaclesImage1 = loadImage("obstacle1.png");
  obstaclesImage2 = loadImage("obstacle2.png");
  obstaclesImage3 = loadImage("obstacle3.png");
  obstaclesImage4 = loadImage("obstacle4.png");
  obstaclesImage5 = loadImage("obstacle5.png");
  obstaclesImage6 = loadImage("obstacle6.png");
  trexcollided = loadAnimation("trex_collided.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  jumpsound = loadSound("jump.mp3");
  checkpoint = loadSound("checkpoint.mp3");
  diesound = loadSound("die.mp3")

}

// Create object once
function setup() {
  createCanvas(windowWidth, windowHeight);
  // String concatenation
  // console.log("hello", 5, "How are you");

  // Creating Trex animation
  trex = createSprite(70, 250, 30, 30);
  trex.addAnimation("running", trexRunnning);
  trex.addAnimation("collided", trexcollided);
  trex.scale = 0.5;

  // Ground
  ground = createSprite(200, height-40, 400, 20);
  ground.addImage("ground", groundImage);

  invisibleGround = createSprite(200, height-30, 400, 20);
  invisibleGround.visible = false;

  // Creating new clouds and obstacles groups
  cloudsGroup = new Group();
  obstaclesGroup = new Group();

  trex.debug = true;
  trex.setCollider("circle", -5, 0, 30);

  // gameover
  gameOver = createSprite(width/2, height/2, 20, 20);
  gameOver.addImage("over", gameOverImage);
  gameOver.scale = 0.5;

  restart = createSprite(width/2, height/2+60, 20, 20);
  restart.addImage("restart", restartImage);
  restart.scale = 0.5;

  localStorage["HighestScore"]=0
}

// Display objects and their functions multiple times
function draw() {
  background("pink");

  // Display Score
  textSize(20);
  fill("white");
  text("Score: " + score, width/4+150, height/2-40);
  text("Highest Score: " + localStorage["HighestScore"],width/4-100, height/2-40)

  drawSprites();

  // Collide
  trex.collide(invisibleGround);

  // Check coordinates
  text(mouseX + ":" + mouseY, mouseX, mouseY);

  // Play state
  if (gameState === Play) {
    gameOver.visible = false;
    restart.visible = false;
    // increasing score by every frame count and diving it by 60
    score = score + Math.round(getFrameRate() / 60);

    // Make Trex jump
    if (keyDown("space") && trex.y >= height-70) {
      trex.velocityY = -10;
      jumpsound.play();
    }
    else if (keyDown("up") && trex.y >= height-70) {
      trex.velocityY = -10;
      jumpsound.play();
    }
    if (touches.length>0 && trex.y >= height-70) {
      trex.velocityY = -10;
      jumpsound.play();
      touches = []
    }
    // Trex Gravity
    trex.velocityY = trex.velocityY + 0.8;

    // Ground velocity
    ground.velocityX = -6;

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //  Function call - Make Clouds and spawn Obstacles
    spawnclouds();
    spawnobstacles();

    if (trex.isTouching(obstaclesGroup)) {
      gameState = End;
      highscore = score;
    }
    if(score > 0 && score%100 === 0){
      checkpoint.play()
      // console.log("worked")
    }
  } 
  
else if (gameState === End) {
  // console.log("Final Score" + score);

    // Ground velocity
    trex.velocityY = 0;
    ground.velocityX = 0;
    // trex.addImage("End", TrexEnd)
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

    trex.changeAnimation("collided", trexcollided);


    gameOver.visible = true;
    restart.visible = true;

    if (touches.length>0 || mousePressedOver(restart)) {
      restartGame();
      touches = []
    }
  }
}
function spawnclouds() {
  if (frameCount % 60 === 0) {
    clouds = createSprite(width+30, height-100, 90, 10);
    clouds.addImage("cloud", cloudsImage);
    clouds.scale = 0.6;
    clouds.y = Math.round(random((height-300), (height-400)));
    clouds.velocityX = -6;
    // Add clouds to group
    cloudsGroup.add(clouds);

    // Print trex and clouds depth
    console.log(trex.depth);
    console.log(clouds.depth);

    // Adjust depth
    clouds.depth = trex.depth;
    trex.depth = trex.depth + 1;

    // calculating life time
    // here distance = width of clouds speed = velocity of cloud
    // time - distance/speed
    // time=800/3
    // time = 183

    clouds.lifetime = 250;
  }
}

function spawnobstacles() {
  if (frameCount % 60 === 0) {
    obstacles = createSprite(740, height-45, 10, 40);
    obstacles.velocityX = -(6+score/100)
    ground.velocityX = -(6+score/100)
    console.log(obstacles.velocityX)
    obstacles.lifetime = 100;
    obstacles.scale = 0.48;
    // Add obstacles to group
    obstaclesGroup.add(obstacles);

    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacles.addImage(obstaclesImage1);
        break;
      case 2:
        obstacles.addImage(obstaclesImage2);
        break;
      case 3:
        obstacles.addImage(obstaclesImage3);
        break;
      case 4:
        obstacles.addImage(obstaclesImage4);
        break;
      case 5:
        obstacles.addImage(obstaclesImage5);
        break;
      case 6:
        obstacles.addImage(obstaclesImage6);
        break;

      default:
        break;
    }

    obstacles.lifetime = 120;
  }
}

function restartGame() {
  gameState = Play;

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running", trexRunnning);

  // 0 < Score
if(localStorage["HighestScore"]<score){
  localStorage["HighestScore"] = score
}

console.log(localStorage["HighestScore"])
score = 0
}

// Display crow every 500 score score/500 = 0
