var torre, torreImg;
var doorImg, doorGroup;
var climberImg, climberGroup;
var ghost, ghostImg;
var invisible, invisibleGroup;
var spooky;

var gameState = "play";

function preload() {
  torreImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  
  spooky = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  
  spooky.loop();
  
  torre = createSprite(300, 300);
  torre.addImage("movingTower", torreImg);
  torre.velocityY = 1;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
  
  ghost = createSprite(300, 50);
  ghost.addImage("jump", ghostImg);
  ghost.scale = 0.3;
}

function draw() {
  background("black")
  
  if (gameState == "play") {
    
    if (torre.y > 400) {
      torre.y = 280;
    }
  
    if (keyDown("space")) {
      ghost.velocityY = -5;
    }
    if (keyDown("left")) {
      ghost.x = ghost.x - 5;
    }
    if (keyDown("right")) {
      ghost.x =  ghost.x + 5;
    }
  
    ghost.velocityY = ghost.velocityY + 1;
  
    if (climberGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if (invisibleGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }
    
    spawnDoor();
    drawSprites();
  }
  
  if (gameState == "end") {
    fill("yellow");
    textSize(30);
    text("Game Over", 220, 300);
  }
}

function spawnDoor() {
  if (frameCount % 250 === 0) {
    var door = createSprite(300, -70);
    door.addImage(doorImg);
    door.x = Math.round(random(150, 400));
    door.velocityY = 1;
    
    var climber = createSprite(300, -10);
    climber.addImage(climberImg);
    climber.x = door.x;
    climber.velocityY = 1;
    
    invisible = createSprite(150, 10);
    invisible.visible = false;
    invisible.x = climber.x;
    invisible.width = climber.width;
    invisible.height = 30;
    invisible.velocityY = 1;
    
    //Profundidad
    ghost.depth = door.depth;
    ghost.depth += 1;
    
    //Agregar sprites al grupo
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleGroup.add(invisible);
    
    //Ciclo de vida 
    door.lifetime = 700;
    climber.lifetime = 700;
  }
}
