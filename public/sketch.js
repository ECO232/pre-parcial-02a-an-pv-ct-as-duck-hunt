let socket

let normal_zombie
let shiny_zombie
let zombies = [];
let spawnInterval = 400; 
let shinySpawnInterval = 5000; 
let lastSpawnTime = 0;
let lastShinySpawnTime = 0;

//timer
let count = 30;
let countInterval = 1000;
let lastCountUpdate = 0;

//game status
let isGameOver = false

//Cursor and position
let cursorX;
let cursorY;
let game_cursor;

//score
let score = 0;

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
//-----------------------------------------Socket-------------------------------------//


//-----------------------------------------Socket-------------------------------------//
function preload() {
  normal_zombie = loadImage('./images/zombie-walking.png')
  shiny_zombie = loadImage('./images/shiny-walking.png')
  game_cursor = loadImage('./images/mira.png')
}

function setup() {
  frameRate(60)
  createCanvas(400, 400);
  cursor(game_cursor);
  noCursor();
/* 
  socket = io.connect('http://localhost:3000');

  socket.on('connect', () => {
    console.log('User is connected');
  }); */
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
  text(`Score: ${score}`,10, 50)

  if(count == 0){
    isGameOver = true
    //esto hara que cuando se active algo similar a un return y PARA por completo el draw y todo lo que vaya despues
  }


    //Crosshair code
    cursorX = mouseX;
    cursorY = mouseY;
    fill(255,0,0  );
    stroke(255, 100);
    ellipse(cursorX, cursorY, 20, 20);


    //kill zombies code
    if (!isGameOver && mouseIsPressed) {
      for (let i = zombies.length - 1; i >= 0; i--) {
        const zombie = zombies[i];
        const zombieX = zombie.x;
        const zombieY = zombie.y;
        const zombieSize = 30; // Tamaño del zombie
  
        // Verificar si se hizo clic en el zombie
        if (
          mouseX >= zombieX &&
          mouseX <= zombieX + zombieSize &&
          mouseY >= zombieY &&
          mouseY <= zombieY + zombieSize
        ) {
          if(zombie.img === shiny_zombie){
            score += 30;
          }else{
            score += 10;
          }

          zombies.splice(i, 1);
        }
      }
    }


    //normal_zombie spaws
    if(!isGameOver && millis() - lastSpawnTime > spawnInterval){
      let newZombie = new Zombie(normal_zombie, 2);
      let newZombie2 = new Zombie(normal_zombie, 2);
      zombies.push(newZombie);
      zombies.push(newZombie2);
      lastSpawnTime = millis();
    }
    
    //shiny_zombie spaws
  if(!isGameOver && millis() - lastShinySpawnTime > shinySpawnInterval){
    let newShinyZombie = new Zombie(shiny_zombie, 4);
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
    text(`Score: ${score}`, width / 2, height / 2+20)
  }
}

