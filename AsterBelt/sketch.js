var wave, waveImg, waveAnim, orb, orbImg1, orbImg2, orbImg3;
var space1, space2, spaceImg, gameOver, gameOverImg;
var numer, numer0, numer1, numer2, numer3, numer4, numer5;
var PLAY = 2;
var Invensiblity= 3;
var MEGAInvensiblity= 4;
var SERVE=1;
var END = 0;
var gameState = SERVE;
var wake, wakeImg,wakeG;
var asteroid1, asteroid1Img, asteroid2, asteroid2Img, asteroidG;
var energy, energyAnim, energyG;
var score=0, count=0,lifes=3, KM=0;

function preload(){ 
musicSound = loadSound("MusicSpace.mp3");
waveImg = loadImage("wave.png");
wakeImg = loadImage("wake.png");
waveAnim = loadAnimation("wake.png","wave.png");
orbImg1 = loadImage("orb1.png");
orbImg2 = loadImage("orb2.png");
orbImg3 = loadImage("orb3.png");
numer0 = loadImage("0.png");
numer1 = loadImage("1.png");
numer2 = loadImage("2.png");
numer3 = loadImage("3.png");
numer4 = loadImage("4.png");
numer5 = loadImage("5.png");
spaceImg = loadImage("space.png");
gameOverImg = loadImage("gameover.png")
asteroid1Img = loadImage("asteroid1.png");
asteroid2Img = loadImage("asteroid2.png");
energyAnim = loadAnimation("energy2.png","energy1.png",
"energy4.png","energy3.png");
}

function setup() {
 createCanvas(1000,600);
 space1=createSprite(500,300)
 space1.addImage("espacio",spaceImg)
 space1.scale=1

 space2=createSprite(300,-800)
 space2.addImage("espacio",spaceImg)
 space2.scale=1

 wave=createSprite(700,300,90,90);
 wave.addImage("nave",waveImg);
 wave.debug=false;
 wave.setCollider("rectangle",0,0,30,32.5);

 numer=createSprite(950,550,90,90)

 orb=createSprite(300,300,90,90);
 orb.scale=0.5

 gameOver=createSprite(500,300,0,0)
 gameOver.addImage("fin del juego",gameOverImg);
 gameOver.scale=1;
 gameOver.visible=false;

 musicSound.loop();

 //grupos
 energyG = new Group();
 asteroidG = new Group();
 wakeG = new Group();

}

function draw() {
background("black");
textSize(50);
fill("blue");
text("KM: "+KM,200,550)
//estado de juego: serve
if (gameState===SERVE) {
  OrbsLife();
  NUMERS();
  SpaceV();
  if (keyDown("space")) {
    gameState=PLAY
  }
}

//estado de juego: play
if(gameState===PLAY){
  SpaceV();
  //mover el personaje
if (keyDown("space")) {
  Turbo();
}
if (keyDown("w")) {
  wave.y=wave.y-10
  orb.y=orb.y+10
}
if (keyDown("a")) {
  wave.x=wave.x-10
  orb.x=orb.x+10
}
if (keyDown("s")) {
  wave.y=wave.y+10
  orb.y=orb.y-10
}
if (keyDown("d")) {
  wave.x=wave.x+10
  orb.x=orb.x-10
}
if (keyDown("e")) {
  if (score>4){
  score=score-5
  gameState=MEGAInvensiblity;
  wave.addAnimation("wave",waveAnim);
  wave.changeAnimation("wave",waveAnim);
  }
}
//colisiones
if (asteroidG.isTouching(wave)) {
  lifes=lifes-1
  wave.y=wave.y+30
  gameState=Invensiblity;
  wave.addAnimation("wave",waveAnim);
  wave.changeAnimation("wave",waveAnim);
}

if (energyG.collide(wave)) {
  energyG.destroyEach();
  if (score<5) {
  score=score+1
  }
}
if (energyG.collide(wakeG)) {
  energyG.destroyEach();
  if (score<5) {
  score=score+1
  }
}
OrbsLife();
NUMERS()
Wakes();
KM = KM + Math.round(getFrameRate()/60);
count=0;
gameOver.visible=false;

//generador de asteroides
  if(frameCount % 10 === 0){
    var delta=Math.round(random(1,2))
    switch (delta) {
      case 1:
      CreateAsteroidBrown()
        break;
    
      case 2:
        CreateAsteroidGray()
        break; 
    } 

    if (frameCount%180===0) {
      CreateEnergy()
    }
  }
}
//estado de juego: invensiblity
if (gameState===Invensiblity) {
  count = count + Math.round(getFrameRate()/60);
  KM = KM + Math.round(getFrameRate()/60);
SpaceV();

if (energyG.collide(wave)) {
  energyG.destroyEach();
  if (score<5) {
  score=score+1
  }
}

if(frameCount % 10 === 0){
  var delta=Math.round(random(1,2))
  switch (delta) {
    case 1:
    CreateAsteroidBrown()
      break;
  
    case 2:
      CreateAsteroidGray()
      break; 
  } 

  if (frameCount%180===0) {
    CreateEnergy()
  }
}
    
if (keyDown("w")) {
  wave.y=wave.y-10
  orb.y=orb.y+10
}
if (keyDown("a")) {
  wave.x=wave.x-10
  orb.x=orb.x+10
}
if (keyDown("s")) {
  wave.y=wave.y+10
  orb.y=orb.y-10
}
if (keyDown("d")) {
  wave.x=wave.x+10
  orb.x=orb.x-10
}
  if (count>30) {
  gameState=PLAY;
  wave.addImage("wave",waveImg);
  wave.changeAnimation("wave",waveImg);
  }
}
//estado de juego: megainvensiblity
if (gameState===MEGAInvensiblity) {
    count = count + Math.round(getFrameRate()/60);
    KM = KM + Math.round(getFrameRate()/60)

   SpaceV();
   
  if (energyG.collide(wave)) {
    energyG.destroyEach();
    gameState=PLAY;
    wave.addImage("wave",waveImg);
    wave.changeAnimation("wave",waveImg);
    if (score<5) {
    score=score+1
    }
  }
  
  if(frameCount % 10 === 0){
    var delta=Math.round(random(1,2))
    switch (delta) {
      case 1:
      CreateAsteroidBrown()
        break;
    
      case 2:
        CreateAsteroidGray()
        break; 
    } 
  
    if (frameCount%180===0) {
      CreateEnergy()
    }
  }

  if (keyDown("space")) {
    Turbo();
  }
  if (keyDown("w")) {
    wave.y=wave.y-10
    orb.y=orb.y+10
  }
  if (keyDown("a")) {
    wave.x=wave.x-10
    orb.x=orb.x+10
  }
  if (keyDown("s")) {
    wave.y=wave.y+10
    orb.y=orb.y-10
  }
  if (keyDown("d")) {
    wave.x=wave.x+10
    orb.x=orb.x-10
  }
    if (count>100) {
    gameState=PLAY;
    wave.addImage("wave",waveImg);
    wave.changeAnimation("wave",waveImg);
    }
  
  }

if (lifes===0) {
  gameState=END;
}

//estado de juego: end
if (gameState===END) {
  wave.y=wave.y+0
  wave.x=wave.x+0
  gameOver.visible=true;
  wave.x=500;
  wave.y=530;
  wakeG.destroyEach();
  space1.velocityY=+10
  space2.velocityY=+10
  orb.destroy();
  wave.addImage("wave",waveImg);
  wave.changeAnimation("wave",waveImg);
  asteroidG.destroyEach();
  energyG.destroyEach();
}

edges = createEdgeSprites();
wave.collide(edges);
orb.collide(edges);
drawSprites();
}

function Turbo() {
  if (keyDown("w")) {
    wave.y=wave.y-20
    orb.y=orb.y+20
  }
  if (keyDown("a")) {
    wave.x=wave.x-20
    orb.x=orb.x+20
  }
  if (keyDown("s")) {
    wave.y=wave.y+20
    orb.y=orb.y-20
  }
  if (keyDown("d")) {
    wave.x=wave.x+20
    orb.x=orb.x-20
  }
}

function Wakes() {
  var wake=createSprite(0,0,100,100)
  wake.addImage("estela del wave",wakeImg);
  wake.x=wave.x 
  wake.y=wave.y
  wake.lifetime=15;
  wake.depth=wave.depth-1
  wakeG.add(wake);
  wake.debug=false;
  wake.setCollider("rectangle",0,0,30,32.5);

}

function CreateAsteroidBrown() {
 var asteroid1=createSprite(Math.round(random(30,970)),-60,100,100);
  asteroid1.addImage("asteroides",asteroid1Img);
  asteroid1.velocityY=20
  asteroid1.lifetime=50;
  asteroidG.add(asteroid1)
}

function CreateAsteroidGray() {
 var asteroid2=createSprite(Math.round(random(30,970)),-60,100,100);
  asteroid2.addImage("asteroide",asteroid2Img);
  asteroid2.velocityY=20
  asteroid2.lifetime=50;
  asteroidG.add(asteroid2)
}

function CreateEnergy() {
  var energy=createSprite(Math.round(random(30,970)),-60,100,100)
  energy.addAnimation("asteroide",energyAnim);
  energy.scale=0.5
  energy.velocityY=8
  energy.lifetime=90;
  energyG.add(energy)
}

function OrbsLife() {
  if (lifes===3) {
    orb.changeAnimation("orbes de vida",orbImg1)
    orb.addImage("orbes de vida",orbImg1)
  }
  if (lifes===2) {
    orb.changeAnimation("orbes de vida",orbImg2)
    orb.addImage("orbes de vida",orbImg2)
  }
  if (lifes===1) {
    orb.changeAnimation("orbes de vida",orbImg3)
    orb.addImage("orbes de vida",orbImg3)
  }
  
}
function NUMERS() {
  if (score===0) {
    numer.addImage("numero 0",numer0)
    numer.changeAnimation("numero 0",numer0)
  }
  if (score===1) {
    numer.addImage("numer 1",numer1)
    numer.changeAnimation("numer 1",numer1)
  }
  if (score===2) {
    numer.addImage("numero 2",numer2)
    numer.changeAnimation("numero 2",numer2)
  }
  if (score===3) {
    numer.addImage("numero 3",numer3)
    numer.changeAnimation("numero 3",numer3)
  }
  if (score===4) {
    numer.addImage("numero 4",numer4)
    numer.changeAnimation("numero 4",numer4)
  }
  if (score===5) {
    numer.addImage("numero 5",numer5)
    numer.changeAnimation("numero 5",numer5)
  }
}

function SpaceV() {
space1.velocityY=+10
space2.velocityY=+10

if (space1.y > 1400){
   space1.y = -1200
  }

if (space2.y > 1400){
    space2.y = -1200
  }
}