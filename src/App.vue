<template>
  <div id="app">
    <div class="p-2 mt-0 bg-dark d-flex justify-content-between text-light">
      <div>Pendulum Bot <a class="text-light" href="">?</a></div>
      <div>Round: {{round}}</div>
    </div>

    <!-- game state --> 
    <div class="container mb-3">
      <Score />
    </div>

    <main role="main" class="container">
      <GameSetup v-if="isSetup" />
      <PlayGame v-if="isPlaying" />
      <Council v-if="isCouncil" />
      <EndGame v-if="isEndGame" />
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
import {deck} from './assets/data'
import {difficulties} from './assets/data'

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
    this.newGame();
  },
  computed: {
    ...mapGetters([
      'defaultGame'
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
    clearAutomaScoreCards() {      
        this.$store.commit('clearAutomaScoreCards');
        return true;
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
      automaDeck: deck(),
      difficulties: difficulties(),
    }
  },
  methods: {
    newGame() {
      //TODO: reset the game state to it's default      
      this.game = JSON.parse(JSON.stringify(this.defaultGame));
      if (!this.isSetup) {
        this.toggleEndGame();
        this.toggleSetup();
      }
      else {
        this.determinePrivelege(true);
        this.shuffleDeck();
      }
    },
    startGame() {      
      this.nextRound();
      this.toggleSetup();
      this.togglePlaying();
    },
    nextRound() {
      //set votes = 0;
      this.currentCard = 0;
      let newRound = this.round + 1;
      this.$store.commit('setPurpleTimerFlips', 0);

      if (newRound === 5) {
        this.togglePlaying();
        this.toggleEndGame();
      }
      else {
        this.round = newRound;
      }

      this.shuffleDeck(true);
    },
    startCouncil() {
      this.togglePlaying();
      this.toggleCouncil();

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

      this.scoreRound(this.round);
    },
    scoreRound(roundNum) {
      let difficulty = this.difficulties.find(obj => {
          return obj.id === this.game.difficulty;
        });
      
      if (!difficulty) return;

      let diffScore = eval(`difficulty.details.round${roundNum}.score`);
      let diffVotes = eval(`difficulty.details.round${roundNum}.votes`);

      let scores = {
        automa1: { score: 0, votes: 0 },
        automa2: { score: 0, votes: 0 },
      }  

      //automa 1
      this.game.automa1.cards.forEach( (element) =>
        {
          let card = this.getCardDetails(element);
          scores.automa1.score += card.council.vp;
          scores.automa1.votes += card.council.votes;
        }
      );
      scores.automa1.votes += this.game.automaTimerFlips + diffVotes;
      scores.automa1.score += diffScore;
      //count points for privelege;
      
      //automa 2
      this.game.automa2.cards.forEach( (element) =>
        {
          let card = this.getCardDetails(element);
          scores.automa2.score += card.council.vp;
          scores.automa2.votes += card.council.votes;
        }
      );
      scores.automa2.votes += this.game.automaTimerFlips + diffVotes;
      scores.automa2.score += diffScore;
      //count points for privelege

      this.setAutomaScore = scores;
      this.setAutomaVotes = scores;
    },
    drawCardForAutoma(objAutoma) {
      if(this.deckIsEmpty) this.shuffleDeck();
      //draw a new card out of the current deck
      let currentDeck = Array.from(this.deck);
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
        let privOrder = this.shuffle([this.game.automa1, this.game.automa2, this.game.player]);
        this.privelege = privOrder;
      }
      else {
        let privOrder = this.privelege.sort((a,b) => (a.votes > b.votes) ? 1 : ((b.votes > a.votes) ? -1 : 0)); 
        this.privelege = privOrder;
      }
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
      if (this.deckIsEmpty) {
        this.shuffleDeck();
      }

      //discard the current card
      if (this.currentCard > 0) {
        let currentDiscard = Array.from(this.discard);
        currentDiscard.push(this.currentCard);
        this.discard = currentDiscard;
      }

      //draw a new card
      let currentDeck = Array.from(this.deck);
      this.currentCard = currentDeck.pop();
      this.deck = currentDeck;
    },
    shuffleDeck(reshuffleAllCards) {
      //TODO: during council, we might need to shuffle the remainder of the deck, but not the cards that we're using for scoring. Account for this
      if(reshuffleAllCards) {
        this.deck = this.shuffle(this.automaDeck.map(a => a.id));
        this.discard = [];
        this.clearAutomaScoreCards;
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap');

#app {
  font-family: Cinzel, Helvetica, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  margin-bottom: 60px;  
}

html {
  background-color: rgb(248, 236, 195);
  background-image: linear-gradient(rgb(248, 236, 195), rgb(252, 205, 103));  
}
html {
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
</style>
