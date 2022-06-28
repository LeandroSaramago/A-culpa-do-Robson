var canvas;
var backgroundImage, car1_img, car2_img, track;
var bgImg;
var database, gameState;
var form, player;
var playerCount;
var allPlayers, car1, car2;
var cars = [];
var fuelImage, powerCoinImage, obstacle1Image,obstacle2Image;
var fuels,powerCoins;

function preload() {
  backgroundImage = loadImage("assets/planodefundo.png");
  car1_img = loadImage("assets/car1.png");
  car2_img = loadImage("assets/car2.png");
  track = loadImage("assets/PISTA.png");

  fuelImage = loadImage("assets/fuel.png");
  powerCoinImage = loadImage("assets/goldCoin.png");
  obstacle1Image = loadImage("assets/obstacle1.png");
  obstacle2Image = loadImage("assets/obstacle2.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState(); // pega o valor do estado do jogo!
  game.start();

}

function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1); 
  }

  if (gameState === 1) {
    game.play(); 
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
