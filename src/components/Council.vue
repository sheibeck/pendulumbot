<template>
  <div class="d-flex flex-column">
    <h2>Council</h2> 
    <div>      
      Enter your votes: <input type="number" v-model="playerVotes" class="text-center" style="width: 50px;" />      
    </div>        
    <div class="mt-3">      
      <AutomaScoreCards v-if="game.round < 4" />
      <div v-if="game.round == 4" class="d-flex flex-column align-items-start text-left mb-0">
        <ol>
          <li>If you don’t have the legendary achievement victory point and the corresponding reward card is available, the Automa takes it.</li>
          <li>Otherwise, among the remaining council rewards, the Automa takes the reward corresponding to the track on which you’re the farthest 
            from the end (this includes glory, if you use the advanced variant) from among those tracks that are available as rewards.
            If 2 or more tracks tie for this, the Automa takes the one that’s topmost on your player mat.</li>
        </ol>
      </div>
    </div>
    <div class="mt-3">
        The Automa flipped the <img src="../assets/purple-timer.png" /> <span clas="h5">{{game.automaTimerFlips}}</span> times.
    </div>
    <div class="mt-3" v-if="game.round < 4">
      <div class="form-check w-100">
        <input type="checkbox" id="automa1nocard" class="form-check-input" v-model="automa1DidNotTakeCard">
        <label class="form-check-label" for="automa1nocard">Did Automa 1 <AutomaColor :id="1" /> <b>not</b> take a card?</label>  
      </div>
       <div class="form-check w-100">
        <input type="checkbox" id="automa2nocard" class="form-check-input" v-model="automa2DidNotTakeCard">
        <label class="form-check-label" for="automa2nocard">Did Automa 2 <AutomaColor :id="2" /> <b>not</b> take a card?</label>  
      </div>
    </div>    
    <div class="mt-3">      
      <h6>Council Phase</h6>
      <p class="d-flex flex-column align-items-start text-left mb-0">
        <ol>
          <li><button type="button" class="btn btn-primary m-1 btn-sm" :disabled="councilScored" @click="scoreCouncil()">Set Privelege &amp; Score Automas</button></li>
          <li>Claim rewards</li>
          <li>Check max provinces</li>
          <li>Setup for new round (reward cards, provinces, achievement, timer tokens)</li>
          <li>Place and/or move workers</li>
        </ol>
      </p>

      <button type="button" class="btn btn-secondary m-1 mt-0 w-100" @click="drawCard()">You moved <img src="../assets/any-worker.png" /> from the bottom of an action space</button>
      <AutomaCard :council="true" />
      
      <button type="button" class="btn btn-primary m-1 w-100" :disabled="!councilScored" @click="endCouncil()">End Council</button>     
    </div>
  </div>
</template>

<script>
import AutomaScoreCards from './AutomaScoreCards.vue'
import AutomaColor from './AutomaColor.vue'
import AutomaCard from './AutomaCard.vue'
import { mapGetters } from "vuex"

export default {
  name: 'Council',
  props: {    
  },
  components: {
    AutomaScoreCards,
    AutomaColor,
    AutomaCard
  },
  data () {
    return {    
      automa1DidNotTakeCard: false,
      automa2DidNotTakeCard: false,
      councilScored: false,
    }
  },
  computed: {
     ...mapGetters([
      'game',      
    ]),
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
    scoreCouncil() {      
      this.$parent.scoreRound();
      this.councilScored = true;
    },
    endCouncil() {       
      if (this.automa1DidNotTakeCard) this.$parent.game.automa1.score += 1;
      if (this.automa2DidNotTakeCard) this.$parent.game.automa1.score += 1;

      this.$parent.endCouncil();
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
