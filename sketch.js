var thing, thingImg, runner, runnerImg, obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstaclesGroup;
var coins, coinImg, restart, restartImg, gameState, PLAY, END, ground, runnerDeath;

var END = 0;
var PLAY = 1;
var score = 0;

gameState = PLAY; 


function preload(){
    thingImg = loadImage("background.png");
    runnerImg = loadAnimation("run 1.png", "run 2.png", "run 3.png", "run 4.png", "run 5.png", "run 6.png", "run 7.png", "run 8.png", "run 9.png");
    runnerDeath = loadAnimation("dead.png");
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    restartImg = loadImage("restart.png");
}

function setup() {
   createCanvas(535,515);

   thing = createSprite(180,50,60,60);
   thing.x = 500;
   thing.y = 250;
   thing.addImage(thingImg);
   thing.velocityX = -(6 + 3*score/100);
   thing.scale = 1.8;

   runner = createSprite(80, 90, 45, 45);
   runner.addAnimation("running", runnerImg);
   runner.scale = 0.250;
   //runner.debug = true;
   runner.x = 50;
   runner.setCollider("rectangle",0, 0, 180, 180);

   ground = createSprite(500,360, 1300, 10);
   ground.visible = false;
   ground.x = 400;

   restart = createSprite(257, 265, 45, 45);
   restart.addImage(restartImg);
   restart.scale = 0.6;
   restart.visible = false;

   obstaclesGroup = new Group();
}

function draw() {

    background(150);

   if(gameState === PLAY){
       ground.velocityX = -(6 + 3*score/100);
       score = score + Math.round(getFrameRate()/60);
   
   if(thing.x < 0){
       thing.x = thing.width/2;
   }

   if(ground.x < 0){
       ground.x = ground.width/2
}

   if(keyDown("space")){
       runner.y = runner.y - 12;
   }

   runner.collide(ground);
   runner.velocityY = runner.velocityY + 0.5;

if(obstaclesGroup.isTouching(runner)){
    gameState = END;
}

   
 

}

if(gameState === END)
{
    ground.velocityX = 0;
    thing.velocityX = 0;
    restart.visible = true;
    obstaclesGroup.setVelocityXEach(0);
    runner.velocityY  = 0;
    obstaclesGroup.destroyEach();
    runner.visible = false;

    if(mousePressedOver(restart)){
        reset();
    }
    
}




drawSprites();
createObstacles();
text("score: " + score, 450, 70);
}

function createObstacles(){
    
    if(frameCount% 120 === 0){

        obstacle = createSprite(546,335,160,160);
        
        obstacle.velocityX = thing.velocityX;

       var rand = Math.round(random(1,4));

        switch(rand){
            case 1: obstacle.addImage(obstacle1);
                    break;
            case 2: obstacle.addImage(obstacle2);
                     break;
            case 3: obstacle.addImage(obstacle3);
                    break;
            case 4: obstacle.addImage(obstacle4);
                    break;
            default: break;
        }

        obstacle.lifetime = -2;
        obstacle.scale = 0.5;

        obstaclesGroup.add(obstacle);
    }

}

function reset(){
  gameState = PLAY;
  score = 0;
  restart.visible = false;
  thing.velocityX = -(6 + 3*score/100);
  ground.visible = false;
  runner.visible = true;

  runner.changeAnimation("running", runnerImg);
  obstaclesGroup.destroyEach();
}