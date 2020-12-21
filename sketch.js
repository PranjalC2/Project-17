
var monkey , monkey_running,ground,invisibleGround;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var PLAY=1;
var END=0;
var gameState=PLAY;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
   monkey=createSprite(80,350);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,380,900,10);
  ground.shapeColor="darkgreen";
  ground.x=ground.width/2;
  
  invisibleGround=createSprite(400,390,900,10);
  invisibleGround.visible=false;
  
  foodGroup=createGroup();
  obstacleGroup=createGroup();
  
   //monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
   //monkey.debug=true;

  score=0;
  
 
  
}


function draw() {
  background("lightskyblue");
    //displaying score
  text("Survival Time: "+ score, 500,50);
  

 
  if(gameState===PLAY){
    ground.velocityX = -(4 + 3* score/100)
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    //jump
      //monkey jump when space is pressed
      if(keyDown("space") ) {
        monkey.velocityY = -12;
        //console.log("happy");
     }
    
  //adding gravity to the jump
  
   monkey.velocityY = monkey.velocityY + 0.8;
     food();
  obstacle();
    // ending transition
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
      console.log("hi")
  }
  }
  
    
    
  monkey.collide(invisibleGround);
     //functions
    
     if(gameState===END){
      //velocity
      ground.velocityX = 0;
      monkey.velocityY = 0;
      
      //lifetime
      obstacleGroup.setLifetimeEach(-1);
      foodGroup.setLifetimeEach(-1);
      
      
    }
  
    
    
  

  drawSprites();
}

function food(){
  if(frameCount%80===0){
    var food=createSprite(600,170);
    
   food.y=Math.round(random(120,200));
    food.addImage(bananaImage);
    food.scale=0.1;
    food.velocityX=-3;
    food.lifetime=135;
    foodGroup.add(food);
    
    //depth
    food.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
  }
  
}

function obstacle(){
  if(frameCount%300===0){
    var obstacle=createSprite(600,350);
    obstacle.x=Math.round(random(200,350));
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-3;
    obstacle.lifetime=135;
    obstacleGroup.add(obstacle);
    
    
    
  }
  
}




