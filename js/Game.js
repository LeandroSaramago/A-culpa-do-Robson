class Game {
  constructor() {}
  getState() {  // 1º
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  } 

  start() {
    form = new Form();
    form.display();

    player = new Player();
    playerCount = player.getCount(); // identificar quantos jogadores temos
  
  }

  handleElements() {
    form.hide(); // paga o form
    form.titleImg.position(40, 50); // redefine o titulo
    form.titleImg.class("gameTitleAfterEffect"); // novo estilo do titulo
  }

  play(){
   
  }

}
 