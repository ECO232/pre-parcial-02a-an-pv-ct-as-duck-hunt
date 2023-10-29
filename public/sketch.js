let normal_zombie
let shiny_zombie
let zombies = [];
let spawnInterval = 400; 
let shinySpawnInterval = 5000; 
let lastSpawnTime = 0;
let lastShinySpawnTime = 0;

//timer
let count = 5;
let countInterval = 1000;
let lastCountUpdate = 0;

//game status
let isGameOver = false

class Zombie{
  constructor(img, speed){
    this.x = 0;
    this.y = random(height);
    this.speed = speed;
    this.img = img;
  }

  update(){
    this.x += this.speed;
  }

  show(){
    image(this.img, this.x, this.y, 50, 50);
  }
}


function preload() {
  normal_zombie = loadImage('./images/zombie-walking.png')
  shiny_zombie = loadImage('./images/shiny-walking.png')
}

function setup() {
  frameRate(60)
  createCanvas(400, 400);
}

function draw() {
  background(220);

  //timer
  if (!isGameOver && millis() - lastCountUpdate > countInterval && count > 0) {
    count--;
    lastCountUpdate = millis();
  }
  textSize(24);
  fill(0);
  text(`Tiempo restante: ${count} segundos`, 10, 30);

  if(count == 0){
    isGameOver = true
    //esto hara que cuando se active el return PARA por completo el draw y todo lo que vaya despues
  }


    //normal_zombie spaws
    if(!isGameOver && millis() - lastSpawnTime > spawnInterval){
      let newZombie = new Zombie(normal_zombie, 3);
      let newZombie2 = new Zombie(normal_zombie, 3);
      zombies.push(newZombie);
      zombies.push(newZombie2);
      lastSpawnTime = millis();
    }
    
    //shiny_zombie spaws
  if(!isGameOver && millis() - lastShinySpawnTime > shinySpawnInterval){
    let newShinyZombie = new Zombie(shiny_zombie, 6);
    zombies.push(newShinyZombie);
    lastShinySpawnTime = millis();
  }

  for (let i = zombies.length - 1; i >= 0; i--) {
    zombies[i].update();
    zombies[i].show();

    if (zombies[i].x < -50) {
      zombies.splice(i, 1); 
    }
  }

  //GameOver overlay
  if(isGameOver){
    fill(0, 100);
    rect(0, 0, width, height);

    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    text('Game Over', width / 2, height / 2 -20);
    text(`Score: ${spawnInterval}`, width / 2, height / 2+20)
  }
}
