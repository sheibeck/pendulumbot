<template>
  <div class="d-flex flex-column">
    <h2>Council Phase</h2>    
    <div class="mt-0">          
      <div class="d-flex flex-column align-items-start text-left mb-0">        
        <div>1. Enter your votes: <input type="number" v-model="playerVotes" class="text-center" style="width: 50px;" /> and <button type="button" class="btn btn-primary m-1 btn-sm" :disabled="privelegeSet" @click="setPrivelege()">Set Privelege</button>
          <ul class="mb-2">
            <li>Discard votes</li>
          </ul>
        </div>
        <div>2. Claim rewards in privelege order</div>  
        <div class="w-100 mr-0">              
          <div class="mt-1 w-100" v-if="game.round < 4">
            <AutomaScoreCards v-if="game.round < 4" />
            <div class="form-check mt-3 ml-3">
              <input type="checkbox" id="automa1nocard" class="form-check-input" v-model="automa1DidNotTakeCard">
              <label class="form-check-label" for="automa1nocard">Did Automa 1 <AutomaColor :id="1" /> <b>not</b> take a card?</label>  
            </div>            
            <div class="form-check mt-3 ml-3">
              <input type="checkbox" id="automa2nocard" class="form-check-input" v-model="automa2DidNotTakeCard">
              <label class="form-check-label" for="automa2nocard">Did Automa 2 <AutomaColor :id="2" /> <b>not</b> take a card?</label>  
            </div>
          </div>  
          <div v-if="game.round == 4" class="mt-3">                    
            <div class="d-flex flex-column align-items-start text-left mb-0">
              <ol>
                <li>If you don’t have the legendary achievement victory point and the corresponding reward card is available, the Automa takes it.</li>
                <li>Otherwise, among the remaining council rewards, the Automa takes the reward corresponding to the track on which you’re the farthest 
                  from the end (this includes glory, if you use the advanced variant) from among those tracks that are available as rewards.
                  If 2 or more tracks tie for this, the Automa takes the one that’s topmost on your player mat.</li>
              </ol>
            </div>
          </div>    
        </div>        
        <div class="mt-2">
          3. <button type="button" class="btn btn-primary m-1 btn-sm" :disabled="councilScored || !privelegeSet" @click="scoreAutomas()">Score Automas</button>
          <ul class="mb-0">
            <li>The Automa flipped the <img src="../assets/purple-timer.png" /> <span clas="h5">{{game.automaTimerFlips}}</span> times</li>
          </ul>    
        </div>
        <div v-if="game.round < 4" class="mt-3">
          <div class="mt-1">4. Check max provinces</div>
          <div class="mt-2">5. Setup for new round
            <ul class="mb-1">            
              <li>Clear and set reward cards</li>
              <li>Clear and set new provinces</li>
              <li>Draw new achievement</li>
              <li>Reset purple timer tokens</li>
            </ul>
          </div>
          <div class="mt-0">6. Place and/or move workers</div>
          <button type="button" class="btn btn-secondary m-1 mt-2 w-100" @click="drawCard()">You moved <img src="../assets/any-worker.png" /> from the bottom of an action space</button>          
          <div class="mt-2">7. Flip <img src="../assets/purple-timer.png" /><img src="../assets/green-timer.png" /><img src="../assets/black-timer.png" />, then click the <u>End Council</u> button and begin play</div>
        </div>
      </div>

      <div v-if="game.round < 4" class="pt-2">        
        <AutomaCard :council="true" />        
        <button type="button" class="btn btn-primary m-1 w-100" :disabled="!councilScored || !privelegeSet" @click="endCouncil()">End Council</button>
      </div>
      <div v-if="game.round == 4" class="text-left">
        <div class="my-3">4. Enter your final score: <input type="number" v-model="playerScore" class="text-center" style="width: 60px;" /></div>
        <button type="button" class="btn btn-primary m-1 w-100" :disabled="!councilScored || !privelegeSet" @click="endCouncil()">End Council</button>
      </div>

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
      privelegeSet: false,
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
    setPrivelege() {
      this.$parent.setPrivelege();
      this.privelegeSet = true;
    },
    scoreAutomas() {
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
