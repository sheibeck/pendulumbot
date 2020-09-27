<template>
  <div id="app">
    <div class="p-2 mt-0 bg-dark d-flex justify-content-between text-light">
      <div>Pendulum Bot <button title="Start Over" class="btn btn-link text-light p-0 m-0" @click="startOver()">&#8635;</button></div>
      <div>Round: {{round}}</div>
    </div>
    
    <main role="main" class="container col col-md-6">
      <Score v-if="!isEndGame" class="mb-2" />
      <GameSetup v-if="isSetup" />
      <PlayGame v-if="isPlaying" />
      <Council v-if="isCouncil" />
      <EndGame v-if="isEndGame" />

      <div class="update-dialog" v-if="prompt">
        <div class="update-dialog__content">
          A new version is found. Refresh to load it?
        </div>
        <div class="update-dialog__actions">
          <button
            class="update-dialog__button update-dialog__button--confirm"
            @click="update"
          >
            Update
          </button>
          <button
            class="update-dialog__button update-dialog__button--cancel"
            @click="prompt = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
     
    <footer class='footer'>         
        <small>Built by Darktier Studios, LLC.<br/>Not an official Stonemaier Games project.</small>      
    </footer>

  </div>
</template>

<script>
import { mapGetters } from "vuex"
import GameSetup from './components/GameSetup.vue'
import PlayGame from './components/PlayGame.vue'
import Council from './components/Council.vue'
import EndGame from './components/EndGame.vue'
import Score from './components/Score.vue'
import bootbox from 'bootbox';

export default {
  name: 'App',
  components: {
    GameSetup,
    PlayGame,
    Council,
    EndGame,
    Score,
  },
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.prompt = true;
      });      
    }
    
    this.newGame();
  },
  computed: {
    ...mapGetters([
      'defaultGame',
      'automaDeck',
      'difficulties'
    ]),
    round: {
      get () {
        return this.$store.state.currentGame.round == undefined ? 0 : this.$store.state.currentGame.round;
      },
      set (value) {
        this.$store.commit('round', value);
      }
    },
    purpleTimerFlips: {
      get () {
        return this.$store.state.currentGame.purpleTimerFlips;
      },
      set (value) {
        this.$store.commit('purpleTimerFlips', value);
      }
    },
    game: {
      get () {
        return this.$store.state.currentGame;
      },
      set (value) {
        this.$store.commit('game', value);
      }
    },
    deck: {
      get () {
        return this.$store.state.currentGame.deck;
      },
      set (value) {
        this.$store.commit('deck', value);
      }
    },
    discard: {
      get () {
        return this.$store.state.currentGame.discard;
      },
      set (value) {
        this.$store.commit('discard', value);
      }
    },
    currentCard: {
      get () {
        return this.$store.state.currentGame.currentCard;
      },
      set (value) {
        this.$store.commit('currentCard', value);
      }
    },
    privelege: {
      get () {
        return this.$store.state.currentGame.privelege
      },
      set (value) {
        this.$store.commit('privelege', value);
      }
    },
    clearAutomaScoreCards: {  
      get() {
        return true;
      },
      set() {    
        this.$store.commit('clearAutomaScoreCards',);        
      }
    },
    setAutomaScoreCards: {
      get() {
        return true;
      },
      set(value) {
        this.$store.commit('setAutomaScoreCards', value);
      }
    },
    setAutomaScore: {
      get() {
        return true;
      },
      set(value) {
        this.$store.commit('setAutomaScore', value);
      }
    },
    setAutomaVotes: {
      get() {
        return true;
      },
      set(value) {
        this.$store.commit('setAutomaVotes', value);
      }
    },
    playerVotes: {
      get() {
        return this.$store.state.currentGame.player.votes;
      },
      set(value) {
        this.$store.commit('playerVotes', value);
      }
    },
    deckIsEmpty() {
      return this.game.deck.length == 0;
    }
  },
  data () {
    return {
      title: "Pendulum",
      isSetup: true,
      isPlaying: false,
      isCouncil: false,
      isEndGame: false,
      prompt: false
    }
  },
  methods: {
    async update() {
      this.prompt = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    },
    startOver() {
      bootbox.confirm({
        title: "Start Over?",
        message: "Are you sure you want to start over? All of your progress will be lost.",
        buttons: {
            confirm: {
              label: 'Yes',
              className: 'btn-danger'
            },
            cancel: {
              label: 'No',
              className: 'btn-secondary'
            }
        },
        callback: (result) => {
          if (result) {
            this.resetGame();
          }
        }
      });  
    },
    resetGame() {
      this.isSetup = true;
      this.isPlaying = false;
      this.isCouncil = false;
      this.isEndGame = false;
      this.newGame(); 
    },
    newGame() {
      //TODO: reset the game state to it's default      
      this.game = JSON.parse(JSON.stringify(this.defaultGame));
      this.determinePrivelege(true);

      if (!this.isSetup) {
        this.toggleEndGame();
        this.toggleSetup();
      }      
    },
    startGame() {     
      this.nextRound();
      this.toggleSetup();
      this.togglePlaying();
    },
    nextRound() {   
      //reset votes to 0
      this.playerVotes = 0;   
      this.setAutomaVotes = { automa1: { votes: 0 } , automa2: { votes: 0 } };

      //get rid of any current cards in hand
      this.discardCurrentCard()

      //update the round number
      let newRound = this.round + 1;

      //start by flipping the purple timer
      this.$store.commit('setPurpleTimerFlips', 1);

      //reset the number of times the automa has flipped the purple timer
      this.$store.commit('resetAutomaTimerFlips');

      if (newRound === 5) {
        this.togglePlaying();
        this.toggleEndGame();
      }
      else {
        this.round = newRound;
      }
      this.shuffleDeck(true);      
      this.drawForeshadowingCard();      
    },
    startCouncil() {
      this.togglePlaying();
      this.toggleCouncil();

      this.discardCurrentCard();
      
      //make sure each automa has 3 cards
      let cards = {
        automa1: this.game.automa1.cards,
        automa2: this.game.automa2.cards,
      }

      while (cards.automa1.length < 3) {
        this.drawCardForAutoma(cards.automa1);
      }

      while (cards.automa2.length < 3) {
        this.drawCardForAutoma(cards.automa2);
      }

      this.setAutomaScoreCards = cards;

      this.discardCurrentCard();
    },
    drawForeshadowingCard() {
      //foreshadowing variant means drawing a card 
      if (this.game.foreshadowing && this.purpleTimerFlips < 3) {
        let cards = {
          automa1: this.game.automa1.cards,
          automa2: this.game.automa2.cards,
        }
        this.drawCardForAutoma(cards.automa1);
        this.drawCardForAutoma(cards.automa2);

        this.$parent.setAutomaScoreCards = cards;
      }
    },
    setPrivelege() {
      let difficulty = this.difficulties.find(obj => {
          return obj.id === this.game.difficulty;
        });

      if (!difficulty) return;      
        
      //updating votes based on privelege
      let votes = { automa1: { votes: 0 } , automa2: { votes: 0 } };
      let diffVotes = eval(`difficulty.details.round${this.round}.votes`);

       //automa 1
      this.game.automa1.cards.forEach( (element) =>
        {
          let card = this.getCardDetails(element);          
          votes.automa1.votes += card.council.votes;
        }
      );
      votes.automa1.votes += this.game.automaTimerFlips + diffVotes;      
                 
      //automa 2
      this.game.automa2.cards.forEach( (element) =>
        {
          let card = this.getCardDetails(element);          
          votes.automa2.votes += card.council.votes;
        }
      );
      votes.automa2.votes += this.game.automaTimerFlips + diffVotes;

      this.setAutomaVotes = votes;
      this.determinePrivelege(false);
    },
    scoreRound() {
      let difficulty = this.difficulties.find(obj => {
          return obj.id === this.game.difficulty;
        });          

      if (!difficulty) return;

      let diffScore = eval(`difficulty.details.round${this.round}.score`);      
      
      let scores = {
        automa1: { score: 0 },
        automa2: { score: 0 },
      }  

      //automa 1
      this.game.automa1.cards.forEach( (element) =>
        {
          let card = this.getCardDetails(element);
          scores.automa1.score += card.council.vp;          
        }
      );      
      scores.automa1.score += diffScore;
                 
      //automa 2
      this.game.automa2.cards.forEach( (element) =>
        {
          let card = this.getCardDetails(element);
          scores.automa2.score += card.council.vp;          
        }
      );      
      scores.automa2.score += diffScore;
            
      if (this.game.privelege[0] == 1) scores.automa1.score += 2;
      if (this.game.privelege[0] == 2) scores.automa2.score += 2;
      if (this.game.privelege[1] == 1) scores.automa1.score += 1;
      if (this.game.privelege[1] == 2) scores.automa2.score += 1;

      //automa max score per round is 20 min score is 0
      if (scores.automa1.score > 20) scores.automa1.score = 20;
      if (scores.automa1.score < 0) scores.automa1.score = 0;
      if (scores.automa2.score > 20) scores.automa2.score = 20;
      if (scores.automa2.score < 0) scores.automa2.score = 0;
      this.setAutomaScore = scores;      
    },
    drawCardForAutoma(objAutoma) {
      if(this.deckIsEmpty) this.shuffleDeck();
      //draw a new card out of the current deck
      let currentDeck = [...this.deck];
      let drawnCard = currentDeck.pop();
      objAutoma.push(drawnCard);
      this.deck = currentDeck;
    },
    getCardDetails(cardNum) {
      return this.automaDeck.find(obj => {
          return obj.id === cardNum;
        });
    },
    determinePrivelege(isRandom) {
      if (isRandom) {
        let startPriv = this.shuffle([0,1,2]); //store the id of the player/autom
        this.privelege = startPriv;
      }
      else {        
        let players = [{id:0, votes:this.game.player.votes}, {id:1, votes:this.game.automa1.votes}, {id:2, votes: this.game.automa2.votes}];        
        this.privelege = this.getPrivelegeOrder(players, this.privelege);
      }
    },
    getPrivelegeOrder(players, lastPrivelege) {
      players.sort(function(a, b){
          if (a.votes < b.votes) return 1;            
          //ties go to whoever was lower in the last round
          if (a.votes === b.votes) {
            let prevA = lastPrivelege.findIndex( (player) => player == a.id);
            let prevB = lastPrivelege.findIndex( (player) => player == b.id);
            if (prevA < prevB) return 1;
          }
          return -1;
      });        
      var newPrivelege = [players[0].id, players[1].id, players[2].id];
      return newPrivelege;
    },
    shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },
    endCouncil() {      
      this.nextRound();
      this.toggleCouncil();
      this.togglePlaying();
    },
    drawCard() {  
      this.discardCurrentCard()

      //shuffle the deck
      if (this.deckIsEmpty) {
        this.shuffleDeck();
      }

      //draw a new card
      let currentDeck = [...this.deck];
      this.currentCard = currentDeck.pop();
      this.deck = currentDeck;
    },
    discardCurrentCard() {
      //discard the current card
      if (this.currentCard > 0) {
        let currentDiscard = [...this.discard];
        currentDiscard.push(this.currentCard);
        this.discard = currentDiscard;
        this.currentCard = 0;
      }
    },
    shuffleDeck(reshuffleAllCards) {
      //during council, we might need to shuffle the remainder of the deck, but not the cards that we're using for scoring.
      if(reshuffleAllCards) {
        this.deck = this.shuffle(this.automaDeck.map(a => a.id));
        this.discard = [];
        //this.clearAutomaScoreCards;
        this.$store.state.currentGame.automa1.cards = [];
        this.$store.state.currentGame.automa2.cards = []; 
      }
      else {
        this.deck = this.shuffle([...this.discard]);
        this.discard = [];        
      }
    },
    togglePlaying() {
      this.isPlaying = !this.isPlaying;      
    },
    toggleCouncil() {
      this.isCouncil = !this.isCouncil;
    },
    toggleSetup() {
      this.isSetup = !this.isSetup;
    },
    toggleEndGame() {
      this.isEndGame = !this.isEndGame;
    },
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap');

#app {
  font-family: Cinzel, Helvetica, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  margin-bottom: 80px;
  font-size: 14px;
}

html {
  background-color: rgb(248, 236, 195);
  background-image: linear-gradient(rgb(248, 236, 195), rgb(252, 205, 103));  
  position: relative;
  min-height: 100%;    
}
body {
  margin-bottom: 60px; /* Margin bottom by footer height */  
  background-color: transparent !important;  
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px; /* Set the fixed height of the footer here */
  line-height: 12px; /* Vertically center the text there */
  padding-top: 15px;
  background-color: #f5f5f5;  
}

h6 {
  background-color: goldenrod;
}

.update-dialog {
  position: fixed;
  left: 50%;
  bottom: 64px;
  transform: translateX(-50%);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 12px;
  max-width: 576px;
  color: white;
  background-color: #2c3e50;
  text-align: left;
  &__actions {
    display: flex;
    margin-top: 8px;
  }
  &__button {
    margin-right: 8px;
    &--confirm {
      margin-left: auto;
    }
  }
}
</style>
