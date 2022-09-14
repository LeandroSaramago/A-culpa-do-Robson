class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0; // ranking 
    this.score = 0; // pontuação
    this.fuel = 185
    this.life = 185; // vida 
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
      positionY: this.positionY,
      rank: this.rank,                       
      score: this.score, 
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

  update(){ 
    database.ref("players/player"+this.index).update({
      positionX : this.positionX,
      positionY : this.positionY,
      rank: this.rank,                       
      score: this.score,
    });
  }

  getDistance() { //pega no banco de dados! 
    var playerDistanceRef = database.ref("players/player" + this.index);
    playerDistanceRef.on("value", data => {
      var data = data.val();
      this.positionX = data.positionX;
      this.positionY = data.positionY;
    });
  }

  
  getCarsAtEnd() {
    database.ref("carsAtEnd").on("value", data => {
      this.rank = data.val();
    });
  }

  static updateCarsAtEnd(rank) {
    database.ref("/").update({
      carsAtEnd: rank
    });
  }
 
  static getPlayersInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
      //console.log(allPlayers)
    });
   
  }
}
