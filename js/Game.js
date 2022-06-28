class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2"); //Titulo do quadro de placar

    this.leader1 = createElement("h2"); // condutor 1
    this.leader2 = createElement("h2"); // condutor 2
  }

  getState() {  // 1º
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  } 

  update(state) { // atualiza sempre no banco de dados(escreve)
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    form = new Form();
    form.display();

    player = new Player();
    playerCount = player.getCount(); // identificar quantos jogadores temos
    car1 = createSprite(width /2 -100, height -100);
    car1.addImage(car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width /2 +100, height -100);
    car2.addImage(car2_img);
    car2.scale = 0.07;

    cars =[car1, car2];

     // var obstaclesPositions = [
    //   { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
    //   { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
    //   { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
    //   { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
    //   { x: width / 2, y: height - 2800, image: obstacle2Image },
    //   { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
    //   { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
    //   { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
    //   { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
    //   { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
    //   { x: width / 2, y: height - 5300, image: obstacle1Image },
    //   { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
    // ];

    fuels = new Group();
    powerCoins  = new Group();
    
    // Adicionar sprite de combustível no jogo
    this.addSprites(fuels, 4, fuelImage, 0.02);

    // Adicionar sprite de moeda no jogo
    this.addSprites(powerCoins, 18, powerCoinImage, 0.09);
  }

  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, POSIcao=[]){
    for (var i = 0; i< numberOfSprites; i++ ){
     // fazer uma moeda ou combustível
      var x, y;
      x = random(width/2+150, width/2-150);
      y = random(-height * 4.5, height-400)

      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);
      sprite.scale = scale;
      spriteGroup.add(sprite);

    }
  }

  handleElements() {
    form.hide(); // paga o form
    form.titleImg.position(40, 50); // redefine o titulo
    form.titleImg.class("gameTitleAfterEffect"); // novo estilo do titulo

    this.resetTitle.html("Reiniciar");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width/2+200,50);
  
    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

    this.leadeboardTitle.html("Placar");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  }

  play(){
   this.handleElements();

   Player.getPlayersInfo(); // o temto todo atualizando a informação dos players 
   if (allPlayers !== undefined) {  
    image (track, 0, -height *5, width, height *6);

    var index = 0;
    for(var plr in allPlayers){
      index++;
      var x = allPlayers[plr].positionX;
      var y = height - allPlayers[plr].positionY;
      cars[index-1].position.x = x;
      cars[index-1].position.y = y;

      if(index === player.index){
        stroke(10);
        fill("red");
        ellipse(x, y, 60, 60);

        camera.position.y = cars[index-1].position.y;
      }
    }

    this.Setinha();
    this.showLeaderboard();
    this.reset();
    drawSprites();
   }
  }

  reset(){
    this.resetButton.mousePressed(
      ()=>{
        database.ref("/").set({
          playerCount: 0,
          gameState: 0,
          players: {}
        })
        window.location.reload()
      }
    )
  }

  showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      // &emsp;    Essa etiqueta é usada para exibir quatro espaços.
      leader1 =
        players[0].rank +
        "&emsp;"  +
        players[0].name +
        "&emsp;" +
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
       "&emsp;" +
        players[1].score;
    }

    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }
  
  Setinha(){
    if(keyIsDown(UP_ARROW)){
      player.positionY += 10;
      player.update();
    }
    if(keyIsDown(LEFT_ARROW)){
      player.positionX -= 5;
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW)){
      player.positionX += 5;
      player.update();
    }
  }
}
 