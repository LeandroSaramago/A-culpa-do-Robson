class Game {
  constructor() {}
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
    car1 = createSprite(width /2 -100, height -100)
    car1.addImage(car1_img)
    car1.scale = 0.07

    car2 = createSprite(width /2 +100, height -100)
    car2.addImage(car2_img)
    car2.scale = 0.07

    cars =[car1, car2]
  }

  handleElements() {
    form.hide(); // paga o form
    form.titleImg.position(40, 50); // redefine o titulo
    form.titleImg.class("gameTitleAfterEffect"); // novo estilo do titulo
  }

  play(){
   this.handleElements()

   Player.getPlayersInfo(); // o temto todo atualizando a informação dos players 
  if (allPlayers !== undefined) {  
   //if(playerCount === 2){
    image (track, 0, -height *5, width, height *6)
    drawSprites()
   }
  }

}
 