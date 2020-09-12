<template>
  <div class="d-flex flex-column">
    <h2>Council</h2> 
    <div>      
      Enter your votes: <input type="number" v-model="playerVotes" class="text-center" style="width: 50px;" @change="updatePrivelege()" />      
    </div>    
    <div class="mt-4">
      <AutomaScoreCards />
    </div>
    <div class="mt-4">      
      <div class="form-check w-100">
        <input type="checkbox" id="automa1nocard" class="form-check-input" v-model="automa1DidNotTakeCard">
        <label class="form-check-label" for="automa1nocard">Automa 1 <AutomaColor :id="1" /> did not take a card</label>  
      </div>
       <div class="form-check w-100">
        <input type="checkbox" id="automa2nocard" class="form-check-input" v-model="automa2DidNotTakeCard">
        <label class="form-check-label" for="automa2nocard">Automa 2 <AutomaColor :id="2" /> did not take a card</label>  
      </div>
    </div>    
    <div class="mt-3">
      <!--TODO: Show the worker movement actions based on which card you drew -->
      <button type="button" class="btn btn-secondary m-1 w-100" @click="drawCard()">You moved <img src="../assets/any-worker.png" /> from the bottom of an action space</button>
      <button type="button" class="btn btn-primary m-1 w-100" @click="endCouncil()">End Council</button>     
    </div>
  </div>
</template>

<script>
import AutomaScoreCards from './AutomaScoreCards.vue'
import AutomaColor from './AutomaColor.vue'
export default {
  name: 'Council',
  props: {    
  },
  components: {
    AutomaScoreCards,
    AutomaColor
  },
  data () {
    return {    
      automa1DidNotTakeCard: false,
      automa2DidNotTakeCard: false,
    }
  },
  computed: {
    playerVotes: {
      get() {
        return this.$store.state.currentGame.player.votes;
      },
      set(value) {
        this.$store.commit('playerVotes', parseInt(value ?? 0));
      }
    },
    playerScore: {
      get() {
        return this.$store.state.currentGame.player.score;
      },
      set(value) {
        this.$store.commit('playerScore', parseInt(value ?? 0));
      }
    },
  },
  methods: {
    endCouncil() {       
      if (this.automa1DidNotTakeCard) this.$parent.game.automa1.score += 1;
      if (this.automa2DidNotTakeCard) this.$parent.game.automa1.score += 1;

      this.$parent.endCouncil();
    },
    updatePrivelege() {            
      this.$parent.determinePrivelege(false);
    },
    drawCard() {
      this.$parent.drawCard();
    },
    getAutomaColor(automaId) {
      return automaId == 1 ? this.$parent.game.automa1.color : this.$parent.game.automa2.color;
    }    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img {
    height: 20px;
    width: 20px;
  }
</style>
