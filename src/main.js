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
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import { Integrations } from "@sentry/tracing";
import wb from "./registerServiceWorker";

Vue.prototype.$workbox = wb;

Sentry.init({
  dsn: "https://7e70848b69f74f31901fa0ac48209780@o302915.ingest.sentry.io/5437673",
  ignoreErrors: [
    // Random plugins/extensions
    "top.GLOBALS",
    // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
    "originalCreateNotification",
    "canvas.contentDocument",
    "MyApp_RemoveAllHighlights",
    "http://tt.epicplay.com",
    "Can't find variable: ZiteReader",
    "jigsaw is not defined",
    "ComboSearch is not defined",
    "http://loading.retry.widdit.com/",
    "atomicFindClose",
    // Facebook borked
    "fb_xd_fragment",
    // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to
    // reduce this. (thanks @acdha)
    // See http://stackoverflow.com/questions/4113268
    "bmi_SafeAddOnload",
    "EBCallBackMessageReceived",
    // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
    "conduitPage",
  ],
  denyUrls: [
    // Facebook flakiness
    /graph\.facebook\.com/i,
    // Facebook blocked
    /connect\.facebook\.net\/en_US\/all\.js/i,
    // Woopra flakiness
    /eatdifferent\.com\.woopra-ns\.com/i,
    /static\.woopra\.com\/js\/woopra\.js/i,
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    // Other plugins
    /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
    /webappstoolbarba\.texthelp\.com\//i,
    /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
  ],
  integrations: [
    new VueIntegration({
      Vue,
      tracing: true,
      logErrors: true,
      tracingOptions: {
        trackComponents: true,
      },
    }),
    new Integrations.BrowserTracing(),
  ],
  tracesSampleRate: 0.25,
});

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
