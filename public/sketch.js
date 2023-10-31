let socket

let normal_zombie;
let shiny_zombie;
let back;
let zombies = [];
let spawnInterval = 1500; 
let shinySpawnInterval = 5000; 
let lastSpawnTime = 0;
let lastShinySpawnTime = 0;
let positionY = [80, 200, 320, 440, 560];

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

//arduino
// Flag to track if the Arduino button is pressed
let arduinoButtonPressed = false;

class Zombie{
  constructor(img, speed){
    this.x = 1400;
    this.y = random(positionY);
    this.speed = speed;
    this.img = img;
  }

  update(){
    this.x -= this.speed;
  }

  show(){
    image(this.img, this.x, this.y, 100, 140);
  }
}
//-----------------------------------------Socket-------------------------------------//


//-----------------------------------------Socket-------------------------------------//
function preload() {
  normal_zombie = loadImage('./images/normal_zombie.png'); 
  shiny_zombie = loadImage('./images/soccer_zombie.png');
  game_cursor = loadImage('./images/mira.png');
  back = loadImage('./images/back.png');
}

function setup() {
  frameRate(60)
  createCanvas(1490, 750);
  cursor(game_cursor);
  noCursor();

    // Inicializa la conexión con el servidor
    socket = io.connect('http://localhost:3000');
    socket.on('connect', () => {
      console.log('User is connected');
  
    });

    socket.on('arduinoData', (data) => {
      console.log(data)
      if (data === pinButton) {
        arduinoButtonPressed = true; // Establecer el estado del botón de Arduino en verdadero cuando se detecta un disparo
      }
    });

    
    
}

function draw() {
  background(220);
  image(back, 0, 0, 1490, 750 )
  

  //timer
  if (!isGameOver && millis() - lastCountUpdate > countInterval && count > 0) {
    count--;
    lastCountUpdate = millis();
  }
  textSize(24);
  fill(0);
  stroke(10);
  text(`Time: ${count} `, 1100, 30);
  text(`Score: ${score}`,1100, 70)

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
    if (!isGameOver && (mouseIsPressed || arduinoButtonPressed)) {
      for (let i = zombies.length - 1; i >= 0; i--) {
        const zombie = zombies[i];
        const zombieX = zombie.x;
        const zombieY = zombie.y;
        const zombieWidth = 100;
        const zombieHeight = 140;
    
        if (
          (mouseIsPressed &&
            mouseX >= zombieX &&
            mouseX <= zombieX + zombieWidth &&
            mouseY >= zombieY &&
            mouseY <= zombieY + zombieHeight) ||
          (arduinoButtonPressed &&
            cursorX >= zombieX &&
            cursorX <= zombieX + zombieWidth &&
            cursorY >= zombieY &&
            cursorY <= zombieY + zombieHeight)
        ) {
          if (zombie.img === shiny_zombie) {
            score += 30;
          } else {
            score += 10;
          }
    
          zombies.splice(i, 1);
        }
      }
    
      arduinoButtonPressed = false; // Reiniciar el estado del botón de Arduino
    }


    //normal_zombie spaws
    if(!isGameOver && millis() - lastSpawnTime > spawnInterval){
      let newZombie = new Zombie(normal_zombie, 1);
      zombies.push(newZombie);
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

