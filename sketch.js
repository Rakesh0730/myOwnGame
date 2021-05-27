var backImage, backgr;
var playerImg, player;
var starfuel, starFuel;
var obst, asteroid;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var score = 0;

function preload(){

  backImage = loadImage("12571.png")
  playerImg = loadImage("spaceship.png");
  starFuel = loadImage("111-1112062_8-pointed-star-png-8-point-star-gold.png");
  obst = loadImage("asteroid-png-11553979318e3cee5taq4.png")

}

function setup(){
  createCanvas(400,600);

  backgr = createSprite(0, 0, 400, 800);
  backgr.addImage(backImage);
  backgr.velocityY = 1;

  player = createSprite(190, 550, 20, 50);
  player.addImage(playerImg);
  player.scale = 0.3;

  FuelGroup = new Group();
  obstacleGroup = new Group();
  
}

function draw()
{

  background(0);

  drawSprites();

  if(gameState === PLAY)
  {
  
    if(backgr.y > 800)
   {
     backgr.y = 600;
    }
  
    

   if(keyDown("left_arrow"))
   {
     player.x = player.x - 3;
     
    }
    
   if(keyDown("right_arrow"))
   {
     player.x = player.x + 3;  
     
    }

    if(keyDown("up_arrow"))
    {
      player.y = player.y - 3;  
      
    }

    if(keyDown("down_arrow"))
    {
      player.y = player.y + 3;
       
    }

    if(FuelGroup.isTouching(player))
    {

      FuelGroup.destroyEach();
      score = score + 1;

    }
  
    text("Score : " + score, 2000, 300);

    spawnFuel();
    spawnObstacles();
  
    if(obstacleGroup.isTouching(player))
    {
      gameState = END;
    }
  
  }
  else if(gameState === END)
  {
  
    backgr.velocityY = 0;
    player.visible = false;
  
    FuelGroup.destroyEach();
    obstacleGroup.destroyEach();
  
    textSize(30);
    fill(255);
    text("Game Over!", 100, 300);
  }
  
    
  
}
  
function spawnFuel()
{
  // code to spawn the food.
  if(frameCount % 80 === 0)
  {
  
   var starfuel = createSprite(250, 600, 40, 10);
   starfuel.addImage(starFuel);
   starfuel.y =  random(180, 200);
   starfuel.scale = 0.05;
   starfuel.velocityY = 4;
  
   starfuel.lifetime = 300;
   player.depth = starfuel.depth + 1;
   FuelGroup.add(starfuel);
  
  }


  drawSprites();

}

function spawnObstacles()
{
  

  if(World.frameCount % 300 === 0)
  {

    asteroid = createSprite(150, 150, 20, 20);
    asteroid.addImage(obst);
    asteroid.scale = 0.10;
    asteroid.velocityY = 4;

    asteroid.lifetime = 100;
    obstacleGroup.add(asteroid);

  }


}
