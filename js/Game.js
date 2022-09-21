class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2"); //Titulo do quadro de placar

    this.leader1 = createElement("h2"); // condutor 1
    this.leader2 = createElement("h2"); // condutor 2

    this.moving = false
    this.left = false
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

     var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
      { x: width / 2, y: height - 2800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
      { x: width / 2, y: height - 5300, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
    ];

    fuels = new Group();
    powerCoins  = new Group();
    obstacles = new Group();
    
    // Adicionar sprite de combustível no jogo
    this.addSprites(fuels, 4, fuelImage, 0.02);

    // Adicionar sprite de moeda no jogo
    this.addSprites(powerCoins, 18, powerCoinImage, 0.09);

    this.addSprites(obstacles, obstaclesPositions.length, obstacle1Image, 0.04, obstaclesPositions)
  }

  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, POSIcao=[]){
    for (var i = 0; i< numberOfSprites; i++ ){
     // fazer uma moeda ou combustível
      var x, y;
      

      if(POSIcao.length>0){
        x = POSIcao[i].x   
        y = POSIcao[i].y  
        spriteImage = POSIcao[i].image 
      }else{
        x = random(width/2+150, width/2-150);
        y = random(-height * 4.5, height-400)
      }
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
   player.getCarsAtEnd();

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
        this.pegaasgasolina(index);
        this.pegaasmoeda(index);
        this.Explosao(index);
        this.Carrin(index);
      }
    }

    //Linha de chegada

    const finishLine = height*6-100;

    if (player.positionY>finishLine){
      gameState = 2;
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);
      player.update(); 
      this.showRank()
    }

    this.showLeaderboard() 
    this.Setinha();
    this.reset();
    drawSprites();
    this.showLife();
    this.showFuelBar();
   }
  }

  Carrin(index){
  if(index === 1){
  if(cars[index-1].collide(cars[1])){
  if(player.life > 0){
  player.life-=185/4
  }
  if(this.left){
    player.positionX+= 100
  }else{
    player.positionX-=100
  }
  if(player.life <= 0){
    gameState = 2
    this.gameOver()
  }
  }
  }
  if(index === 2){
    if(cars[index-1].collide(cars[0])){
    if(player.life > 0){
    player.life-=185/4
    }
    if(this.left){
    player.positionX+= 100
    }else{
    player.positionX-=100
    }
  if(player.life <= 0){
  gameState = 2
  this.gameOver()
  }
  }
  }
  }

  Explosao(index){
  if(cars[index-1].collide(obstacles)){
  if(player.life > 0){
    player.life-=185/4
  }
  if(this.left){
    player.positionX+= 100
  }else{
    player.positionX-=100
  }
  if(player.life <= 0){
    gameState = 2
    this.gameOver()
  }
  }
  }
  showRank(){
    swal({
      title: `Incrível!${"\n"}Rank${"\n"}${player.rank}`,
      text: "Você alcançou a linha de chegada com sucesso!",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });
  }

  showLife() {
    push();
    image(lifeImage, width / 2 - 130, height - player.positionY - 300, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 300, 185, 20);
    fill("#f50057");
    rect(width / 2 - 100, height - player.positionY - 300, player.life, 20);
    noStroke();
    pop();
  }

  showFuelBar(){
    push();
    image(fuelImage, width / 2 - 130, height - player.positionY - 250, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 250, 185, 20);
    fill("#ffc400");
    rect(width / 2 - 100, height - player.positionY - 250, player.fuel, 20);
    noStroke();
    pop();
  }


  reset(){
    this.resetButton.mousePressed(
      ()=>{
        database.ref("/").set({
          playerCount: 0,
          gameState: 0,
          players: {},
          carsAtEnd:0
        })
        window.location.reload()
      }
    )
  }

  showLeaderboard() {
    var leader1, leader2;
    //var players = Object.values(allPlayers);
    //Player.getPlayersInfo()
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
      this.moving = true
    }
    if(keyIsDown(LEFT_ARROW)){
      player.positionX -= 5;
      player.update();
      this.left = true
    }
    if(keyIsDown(RIGHT_ARROW)){
      player.positionX += 5;
      player.update();
      this.left = false
    }
  }

  pegaasmoeda(index){
    cars[index-1].overlap(powerCoins, function(coletor, coletado){
  player.score += 1
  player.update()
  coletado.remove()
    })
  }

  pegaasgasolina(index){
    cars[index-1].overlap(fuels, function(coletor, coletado){
  player.fuel = 185
  coletado.remove()
    })
    if(player.fuel > 0 && this.moving){
      player.fuel -= 0.3 
    }
    if(player.fuel <= 0){
      gameState = 2
      this.gameOver()
    }
  }

  gameOver(){
    swal({
      title: `GameOver`,
      text: "Mission Failed! Better luck next time",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });
    // imageUrl:
    // "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
  
  }
}
 