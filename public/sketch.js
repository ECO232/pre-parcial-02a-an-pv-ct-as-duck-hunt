let normal_zombie
let shiny_zombie
let zombies = [];
let spawnInterval = 400; 
let shinySpawnInterval = 5000; 
let lastSpawnTime = 0;
let lastShinySpawnTime = 0;

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
  createCanvas(400, 400);
}

function draw() {
  background(220);

  if(millis() - lastSpawnTime > spawnInterval){
      let newZombie = new Zombie(normal_zombie, 3);
      let newZombie2 = new Zombie(normal_zombie, 3);
      zombies.push(newZombie);
      zombies.push(newZombie2);
    lastSpawnTime = millis();
  }

  if(millis() - lastShinySpawnTime > shinySpawnInterval){
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
}
