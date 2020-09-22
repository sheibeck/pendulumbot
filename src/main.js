import Vue from 'vue'
import App from './App.vue'
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';
import 'es6-promise/auto'; //vuex dependency
import Vuex from 'vuex';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {deck} from './assets/data'
import {difficulties} from './assets/data'

Amplify.configure(aws_exports);
Vue.use(Vuex)

Vue.config.productionTip = false

//service worker
//const serviceWorker = new ServiceWorker();
//serviceWorker.register('/service-worker.js', '/');

const store = new Vuex.Store({
  state: {
    automaDeck: deck(),
    difficulties: difficulties(),
    defaultGame: {
      round: 0,
      foreshadowing: false,
      difficulty: "B",
      deck: [],
      discard: [],
      currentCard: 0,
      automaTimerFlips: 0,
      purpleTimerFlips: 0,
      player: {
        id: 0,
        color: "blue",
        score: 0,
        votes: 0,
      },
      automa1: {
        id: 1,
        color: "orange",
        score: -30,
        scoreDisplay: -16,
        votes: 0,
        grandeWorker: false,
        cards: []
      },
      automa2: {
        id: 2,
        color: "white",
        score: -30,
        scoreDisplay: -16,
        votes: 0,
        grandeWorker: false,
        cards: []
      },
      privelege: []
    },
    currentGame: {}
  },
  mutations: {
    game (state, payload) {
      state.currentGame = payload;
    },
    round (state, num) {
      state.currentGame.round = num;
    },
    foreshadowing (state, bool) {
      state.currentGame.foreshadowing = bool;
    },
    difficulty (state, diff) {
      state.currentGame.difficulty = diff;
    },
    deck (state, payload) {
      //state.currentGame.deck = payload;
      Vue.set(state.currentGame, 'deck', [...payload])
    },
    discard (state, payload) {
      state.currentGame.discard = payload;
    },
    currentCard (state, num) {
      state.currentGame.currentCard = num;
    },
    privelege (state, priv) {
      //state.currentGame.privelege = priv;      
      Vue.set(state.currentGame, 'privelege', [...priv]);
    },
    automaTimerFlips (state) {
      state.currentGame.automaTimerFlips++;
    },
    resetAutomaTimerFlips (state) {
      state.currentGame.automaTimerFlips = 0;
    },
    purpleTimerFlips (state) {
      state.currentGame.purpleTimerFlips++;
    },
    setPurpleTimerFlips (state, num) {
      state.currentGame.purpleTimerFlips = num;
    },
    clearAutomaScoreCards (state) {      
      state.currentGame.automa1.cards = [];
      state.currentGame.automa2.cards = [];      
    },
    setAutomaScoreCards (state, payload ) {
      //state.currentGame.automa1.cards = payload.automa1;
      //state.currentGame.automa2.cards = payload.automa2;

      Vue.set(state.currentGame.automa1, 'cards', [...payload.automa1]);
      Vue.set(state.currentGame.automa2, 'cards', [...payload.automa2]);
    },
    setAutomaScore (state, payload) {
      let scoreMatrix = {
        "-16": [-30,-31],
        "-15": [-28,-29],
        "-14": [-26,-27],
        "-13": [-24,-25],
        "-12": [-22,-23],
        "-11": [-20,-21],
        "-10": [-18,-19],
        "-9": [-16,-17],
        "-8": [-15,-14],
        "-7": [-12,-13],
        "-6": [-10,-11],
        "-5": [-8,-9],
        "-4": [-6,-7],
        "-3": [-4,-5],
        "-2": [-2,-3],
        "-1": [0,-1],
      }
      
      state.currentGame.automa1.score += payload.automa1.score;

      if (state.currentGame.automa1.score <= 0) {
        for (const [key, value] of Object.entries(scoreMatrix)) {
          if (value.includes(state.currentGame.automa1.score)) {
            state.currentGame.automa1.scoreDisplay = parseInt(key);
          }
        }
      }
      else {
        state.currentGame.automa1.scoreDisplay = state.currentGame.automa1.score;
      }

      state.currentGame.automa2.score += payload.automa2.score;
      if (state.currentGame.automa2.score <= 0) {
        for (const [key, value] of Object.entries(scoreMatrix)) {
          if (value.includes(state.currentGame.automa2.score)) {
            state.currentGame.automa2.scoreDisplay = parseInt(key);
          }
        }
      }
      else {
        state.currentGame.automa2.scoreDisplay = state.currentGame.automa2.score;
      }

    },
    setAutomaVotes (state, payload) {
      state.currentGame.automa1.votes = payload.automa1.votes;
      state.currentGame.automa2.votes = payload.automa2.votes;
    },
    playerVotes (state, num) {
      state.currentGame.player.votes = num;      
    },
    playerScore (state, num) {
      state.currentGame.player.score = num;      
    }
  },
  getters: {
    game : state => {
      return state.currentGame;
    },
    privelege : state => {
      return state.currentGame.privelege;
    },
    defaultGame : state => {
      return state.defaultGame;
    },
    automaDeck: state => {
      return state.automaDeck;
    },
    difficulties: state => {
      return state.difficulties;
    }
  }
});

new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
