import App from "@/App.vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import Vuex from "vuex";

chai.use(sinonChai);
const localVue = createLocalVue();
localVue.use(Vuex);

describe("App.vue", () => {  
  let store;
  const state = { 
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
  };

  const mutations = {   
    game: () => {},      
    privelege: () => {}
  }

  const getters = {    
    game: () => {},
    privelege: () => {},
    defaultGame: () => { return state.defaultGame; },
    automaDeck: () => {},
    difficulties: () => {}  
  }; 

  let component;

  beforeEach(() => {
    store = new Vuex.Store({
      state,
      mutations,
      getters,      
    });

    component = shallowMount(App, {
      store,
      localVue     
    });
  });

  describe('the getPrivelegeOrder method', () => {    
    it('ordered from hightest to lowest votes', () => {
        let players = [{id:0, votes:2}, {id:1, votes:4}, {id:2, votes: 6}]
        let lastPriv = [0,1,2];
        const result = component.vm.getPrivelegeOrder(players, lastPriv);
        const expected = [2,1,0];
        expect(result).to.eql(expected);
    });

    it('ties go to previous loser', () => {
      let players = [{id:0, votes:4}, {id:1, votes:4}, {id:2, votes: 1}]
      let lastPriv = [0,1,2];
      const result = component.vm.getPrivelegeOrder(players, lastPriv);
      const expected = [1,0,2];
      expect(result).to.eql(expected);
    });

    it('three way tie should swap 1st and 3rd position', () => {
        let players = [{id:0, votes:4}, {id:1, votes:4}, {id:2, votes: 4}]
        let lastPriv = [0,1,2];
        const result = component.vm.getPrivelegeOrder(players, lastPriv);
        const expected = [2,1,0];
        expect(result).to.eql(expected);  
    });  
    
  });
});