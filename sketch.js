var backImage, backgr;
var player;
var starfuel, starFuel;
var obst, asteroid;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var score = 0;

function preload(){

  backImage = loadImage("12571.png")
  player = loadImage("spaceship.png");
  starFuel = loadImage("111-1112062_8-pointed-star-png-8-point-star-gold.png");
  obst = loadImage("asteroid-png-11553979318e3cee5taq4.png")

}

function setup(){
  createCanvas(400,800);

  backgr = createSprite(0, 0, 400, 800);
  backgr.addImage(backImage);
  backgr.y = backgr.length / 2;
  backgr.velocityY = -4;

  
  obstacleGroup = new Group();
  FuelGroup = new Group();
   
}

function draw()
{

  background(0);

  drawSprites();

  if(gameState === PLAY)
  {
  
    if(backgr.y < 100){
      backgr.y = backgr.length / 2;
    }
  
    if(FuelGroup.isTouching(player))
      {

        FuelGroup.destroyEach();
        score = score + 1;

      }
  
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
    text("Game Over!", 220, 300);
  }
  
    
  
}
  
function spawnFuel()
{
  // code to spawn the food.
  if(frameCount % 80 === 0)
  {
  
   var starfuel = createSprite(250, 600, 40, 10);
   starfuel.addImage(starFuel);
   starfuel.scale(0.5);
   starfuel.x =  random(200, 180);
   starfuel.velocityY = - 4;
  
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

    obstacle = createSprite(350, 400, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale(0.5);
    obstacle.velocityY = - 4;

    obstacle.lifetime = 100;
    obstacleGroup.add(asteroid);

  }


}
