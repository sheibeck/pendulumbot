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
    round: 0,
    foreshadowing: false,
    difficulty: "B",
    automaPlayed: [],
    automaRemaining: [],    
  },
  mutations: { 
    round (state, num) {
      state.round = num;
    },
    foreshadowing (state, bool) {
      state.foreshadowing = bool;
    },
    difficulty (state, diff) {
      state.difficulty = diff;
    },
    automaPlayed (state, payload) {
      state.automaPlayed = payload;
    },
    automaRemaining (state, payload) {
      state.automaRemaining = payload;
    },
  },
  getters: {
    isSubscriber : state => {
      return state.hasActiveSubscription;
    },
  }
});

new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
