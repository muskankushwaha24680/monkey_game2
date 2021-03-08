
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var bg , bgImg;

function preload(){
  
  
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImg = loadImage("jungle.jpg");
 
}



function setup() {
  

  bg = createSprite(0,0)
  bg.addImage(bgImg);
  bg.velocityX = -4 ;
  bg.x = bg.width/2 ;
  bg.scale = 1

monkey = createSprite(80,270,20,20)
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.2;
  
  ground = createSprite(400,275,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false ;
  //console.log(ground.x);
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
  
}


function draw() {
background(225);
  
  stroke("black");
  fill("black");
 textSize(20);
  text("survival Time:"+ score ,100,50)
  
  
  
if(gameState === PLAY){

  ground.velocityX = -4;
   score = score + Math.round(getFrameRate()/60);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if(bg.x < 0 ){
      bg.x = bg.width/2 ; 
    }
  
   if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -10;
     //console.log(monkey.y);
    }
  
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
     spawnobstacles();
  spawnbananas();

  
  monkey.velocityY = monkey.velocityY + 1;
  
}
  
  if(gameState === END){
    
    fill("black")
    textSize(40);
    text("GAME OVER",100,100);

   monkey.velocityY = 0;
   monkey.velocityX = 0;
   obstacleGroup.setVelocityXEach(0);
   obstacleGroup.destroyEach;
   ground.velocityX = 0;
   FoodGroup.setVelocityXEach(0);
   FoodGroup.destroyEach;
    
    
  FoodGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1);
 }
     
  monkey.collide(ground);
  
  
  drawSprites();
  
}

function spawnbananas(){
  
  if(frameCount % 80 === 0){
     banana = createSprite(350,150,10,20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(120,150));
    banana.velocityX = -3;
    banana.lifetime = 85;
    
    FoodGroup.add(banana);
  }
}

function spawnobstacles(){
  if(frameCount % 200 === 0){
    obstacle = createSprite(400,260,40,40);
      obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -5;
   // console.log(obstacle.y);
    obstacle.lifetime = 80;
    
    obstacleGroup.add(obstacle);

  
  }
  
}




