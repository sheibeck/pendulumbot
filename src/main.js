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
      automa1: {
        color: "orange",
        score: -22,
        votes: 0,
        grandeWorker: false,
      },
      automa2: {
        color: "white",
        score: -22,
        votes: 0,
        grandeWorker: false,
      }
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
      state.currentGame.deck = payload;
    },
    discard (state, payload) {
      state.currentGame.discard = payload;
    },
  },
  getters: {
    game : state => {
      return state.currentGame;
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
