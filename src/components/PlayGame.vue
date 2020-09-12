<template>
  <div class="d-flex flex-column">
    <h4>Playing <img src="../assets/purple-timer.png" />:{{purpleTimerFlips}}</h4>   
    <div class="d-flex flex-column mb-3">
      <button type="button" class="btn btn-secondary m-1" @click="drawCard()">You moved <img src="../assets/any-worker.png" /> from the bottom of an action space</button>
      <button type="button" class="btn btn-secondary m-1" @click="drawCard()">The <img src="../assets/purple-timer.png" /> timer is out and you flipped <img src="../assets/black-timer.png" /> or <img src="../assets/green-timer.png" /> </button>
      <div class="d-flex">
        <button type="button" class="btn btn-dark m-1" @click="incrementTimerFlip(false)">You flipped <img src="../assets/purple-timer.png" /> </button>
        <button type="button" class="btn btn-dark m-1" @click="incrementTimerFlip(true)">Automa flipped <img src="../assets/purple-timer.png" /> </button>
      </div>
    </div>
    
    <!-- current action -->
    <div v-if="hasCurrentCard" class="py-4 border border-dark d-flex justify-content-center">       
        <img v-if="showCurrentAction.worker.purple" class="mx-2" src="../assets/purple-worker.png" />      
        <img v-if="showCurrentAction.worker.green" class="mx-2" src="../assets/green-worker.png" />      
        <img v-if="showCurrentAction.timer.purple" class="mx-2" src="../assets/purple-timer.png" />      
        <img v-if="showCurrentAction.timer.green" class="mx-2" src="../assets/green-timer.png" />      
        <img v-if="showCurrentAction.timer.black" class="mx-2" src="../assets/black-timer.png" />                
    </div>
    <div  v-if="hasCurrentCard">
      #{{showCurrentAction.id}}
    </div>

    <AutomaScoreCards v-if="1==2" />    
  </div>
</template>

<script>
import AutomaScoreCards from './AutomaScoreCards.vue'
export default {
  name: 'PlayGame',
  props: {   
  },
  components: {
    AutomaScoreCards,
  },
  computed: {
    showCurrentAction() {
      let currentCard = this.$parent.currentCard;
      if (this.hasCurrentCard) {
        return this.$parent.automaDeck.find(obj => {
          return obj.id === currentCard;
        });
      } else {
        return null;
      }
    },
    hasCurrentCard() {
      return this.$parent.currentCard > 0;
    },
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

      if (this.$parent.game.purpleTimerFlips == 4) {
        this.$parent.startCouncil();
      }
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img {
    width: 30px;
    height: 30px;
  }
</style>
