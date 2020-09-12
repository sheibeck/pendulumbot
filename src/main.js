import Vue from 'vue'
import App from './App.vue'
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';
import 'es6-promise/auto'; //vuex dependency
import Vuex from 'vuex';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

Amplify.configure(aws_exports);
Vue.use(Vuex)

Vue.config.productionTip = false

//service worker
//const serviceWorker = new ServiceWorker();
//serviceWorker.register('/service-worker.js', '/');

const store = new Vuex.Store({
  state: {
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
        score: -22,
        votes: 0,
        grandeWorker: false,
        cards: []
      },
      automa2: {
        id: 2,
        color: "white",
        score: -22,
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
      Vue.set(state.currentGame, 'privelege', []);
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
      //state.currentGame.automa1.cards = [];
      //state.currentGame.automa2.cards = [];
      Vue.set(state.currentGame.automa1, 'cards', []);
      Vue.set(state.currentGame.automa2, 'cards', []);
    },
    setAutomaScoreCards (state, payload ) {
      //state.currentGame.automa1.cards = payload.automa1;
      //state.currentGame.automa2.cards = payload.automa2;

      Vue.set(state.currentGame.automa1, 'cards', [...payload.automa1]);
      Vue.set(state.currentGame.automa2, 'cards', [...payload.automa2]);
    },
    setAutomaScore (state, payload) {
      state.currentGame.automa1.score += payload.automa1.score;
      state.currentGame.automa2.score += payload.automa2.score;
    },
    setAutomaVotes (state, payload) {
      state.currentGame.automa1.votes = payload.automa1.votes;
      state.currentGame.automa2.votes = payload.automa2.votes;
    },
    playerVotes (state, num) {
      state.currentGame.player.votes = num;      
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
  }
});

new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
