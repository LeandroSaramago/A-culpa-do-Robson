class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
  }

  addPlayer() {
    var playerIndex = "players/player" + this.index; // cria o index de cada jogador

    if (this.index === 1) { // posição de cada jogador na pista
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    database.ref(playerIndex).set({ // atualiza no banco de dados
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY
    });
  }

  getCount() { // pega a informaçao da quantidade de players do banco de dados
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }

  updateCount(count) { // atualiza sempre no banco de dados(escreve)
    database.ref("/").update({
      playerCount: count
    });
  }
 
  static getPlayersInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
      ///console.log(allPlayers)
    });
   
  }


}
