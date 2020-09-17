<template>
  <div class="d-flex flex-column align-items-center">
    <h4>Playing <img class="img-sm" src="../assets/purple-timer.png" />:{{purpleTimerFlips}}</h4>   
    <div class="d-flex flex-column mb-3">
      <button type="button" class="btn btn-secondary m-1" @click="drawCard()">You moved <img class="img-sm" src="../assets/any-worker.png" /> from the bottom of an action space</button>
      <button type="button" class="btn btn-secondary m-1" @click="drawCard()">The <img class="img-sm" src="../assets/purple-timer.png" /> timer is out and you flipped <img class="img-sm" src="../assets/black-timer.png" /> or <img class="img-sm" src="../assets/green-timer.png" /> </button>
      <div class="d-flex justify-content-between">
        <button type="button" class="btn btn-dark m-1 w-100" @click="incrementTimerFlip(false)">You flipped <img class="img-sm" src="../assets/purple-timer.png" /> </button>
        <button type="button" class="btn btn-dark m-1 w-100" @click="incrementTimerFlip(true)">Automa flipped <img class="img-sm" src="../assets/purple-timer.png" /> </button>
      </div>
    </div>
    
    <AutomaCard :council="false" />
    
    <div v-if="purpleTimerFlips >= 2" class="mt-3 mb-3">
      &#8734; Remove the <img class="img-sm mx-2" src="../assets/legendary-achievement.png" /> achievement &#8734;
    </div>
         
    <AutomaScoreCards v-if="game.foreshadowing" />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import AutomaScoreCards from './AutomaScoreCards.vue'
import AutomaCard from './AutomaCard.vue'
export default {
  name: 'PlayGame',
  props: {   
  },
  components: {
    AutomaScoreCards,
    AutomaCard
  },
  computed: {  
     ...mapGetters([
      'game',      
    ]),  
    purpleTimerFlips() {
      return this.$parent.game.purpleTimerFlips;
    }
  },
  data () {
    return {
     
    }
  },
  methods: {   
    drawCard() {
      this.$parent.drawCard();
    },
    incrementTimerFlip(flippedByAutoma) {
      if (flippedByAutoma) {
        this.$store.commit('automaTimerFlips');
      }

      this.$store.commit('purpleTimerFlips');

      if (this.game.purpleTimerFlips == 3) {
        this.$parent.startCouncil();
      }

      this.$parent.drawForeshadowingCard();
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .img-sm {
    width: 30px;
    height: 30px;
  }

  .action {   
    min-height: 80px;
  }

</style>
