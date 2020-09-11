<template>
  <div id="app">
    <div>
      <img alt="Vue logo" src="./assets/logo.png">
    </div>

    <!-- game state --> 
    <div>
      Round: {{this.round}}
    </div>

    <main role="main" class="container">
      <GameSetup v-if="isSetup" />
      <PlayGame v-if="isPlaying" />
      <Council v-if="isCouncil" />
      <EndGame v-if="isEndGame" />
    </main>
     
    <footer class='footer'>
      <div class="container">       
        <small>Built by Darktier Studios, LLC. Not an official Stonemaier Games project.</small>
      </div>
    </footer>

  </div>
</template>

<script>
import GameSetup from './components/GameSetup.vue'
import PlayGame from './components/PlayGame.vue'
import Council from './components/Council.vue'
import EndGame from './components/EndGame.vue'

export default {
  name: 'App',
  components: {
    GameSetup,
    PlayGame,
    Council,
    EndGame,
  },
  computed: {
    round: {
      get () {
        return this.$store.state.round
      },
      set (value) {
        this.$store.commit('round', value)
      }
    }
  },
  data () {
    return {
      title: "Pendulum",      
      isSetup: true,
      isPlaying: false,
      isCouncil: false,
      isEndGame: false,
    }
  },
  methods: {
    newGame() {
      //TODO: reset the game state to it's default
      this.round = 0;      
      this.toggleEndGame();
      this.toggleSetup();
    },
    startGame() {
      this.nextRound();
      this.toggleSetup();
      this.togglePlaying();
    },
    nextRound() {
      let newRound = this.round + 1;

      if (newRound === 5) {
        this.togglePlaying();
        this.toggleEndGame();
      }
      else {
        this.round = newRound;
      }
    },
    startCouncil() {
      this.togglePlaying();
      this.toggleCouncil();      
    },
    endCouncil() {
      this.nextRound();
      this.toggleCouncil();
      this.togglePlaying();
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
  margin-top: 10px;  
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
  line-height: 60px; /* Vertically center the text there */
  background-color: #f5f5f5;
}
</style>
