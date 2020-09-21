<template>
  <div class="">    
    <div class="small">
      <h6>Automa 1 <AutomaColor :id="1" /></h6>
      <div class="d-flex justify-content-center">            
        <div class="mx-3 border border-secondary p-1" v-for="card in automa1ScoreCards" :key="card">
          <div class="d-flex flex-column">
            <div class="d-flex justify-content-center">
              <div><img class="sm-img" src="../assets/vp.png" /> {{getCardScore(card)}}</div>
              <div><img class="sm-img" src="../assets/votes.png" /> {{getCardVotes(card)}}</div>
            </div>
            <div class="mt-1" v-if="game.round < 4"><img class="card-img img-fluid img-thumbnail" :src="getCardDetails(card)"/></div>
          </div>
          <div class="w-100 text-center mt-1">
            #{{card}}
          </div>
        </div>
      </div>   
    </div>
    <div class="small mt-4">
      <h6>Automa 2 <AutomaColor :id="2" /></h6>
      <div class="d-flex justify-content-center">
        <div class="mx-3 border border-secondary p-1" v-for="card in automa2ScoreCards" :key="card">
          <div class="d-flex flex-column">
            <div class="d-flex justify-content-center">
              <div><img class="sm-img" src="../assets/vp.png" /> {{getCardScore(card)}}</div>
              <div><img class="sm-img" src="../assets/votes.png" /> {{getCardVotes(card)}}</div>
            </div>
            <div class="mt-1" v-if="game.round < 4"><img class="card-img img-fluid img-thumbnail" :src="getCardDetails(card)"/></div>
          </div>
          <div class="w-100 text-center mt-1">
            #{{card}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AutomaColor from './AutomaColor.vue'
import GrandeWorker from '../assets/GrandeWorker.png'
import ExtraProvince from '../assets/ExtraProvince.png'
import MoneyForYellowVictory from '../assets/2-Money-YellowVictory.png'
import MilitaryVotesForProvince from '../assets/3-Military-2Votes-GainProvince.png'
import MilitaryCultureForWorker from '../assets/2-MilitaryCulture-TakeWorkerFromTimerRow.png'
import { mapGetters } from "vuex"
    
export default {
  name: 'AutomaScoreCards',
  props: {    
  },
  data () {
    return {
      GrandeWorker,
      ExtraProvince,
      MoneyForYellowVictory,
      MilitaryVotesForProvince,
      MilitaryCultureForWorker
    }
  },
  components: {    
    AutomaColor
  },
  computed: {
    ...mapGetters([
      'game',      
    ]),
    automa1ScoreCards() {
      return this.$store.state.currentGame.automa1.cards;
    },
    automa2ScoreCards() {
      return this.$store.state.currentGame.automa2.cards;
    }, 
  },
  methods: {
    getCard(cardNum) {
      return this.$parent.$parent.automaDeck.find(obj => {
            return obj.id === cardNum;
          });
    },
    getCardDetails(cardNum) { 
      var card = this.getCard(cardNum);
      switch(card.council.card) {
        case "ExtraProvince":
          return this.ExtraProvince;
        case "GrandeWorker":
          return this.GrandeWorker;
        case "2-Money-YellowVictory":
          return this.MoneyForYellowVictory;
        case "3-Military-2Votes-GainProvince":
          return this.MilitaryVotesForProvince;
        case "2-MilitaryCulture-TakeWorkerFromTimerRow":
          return this.MilitaryCultureForWorker;
      }          
    },
    getCardVotes(cardNum) {
      var card = this.getCard(cardNum);
      return card.council.votes;
    },
    getCardScore(cardNum) {
      var card = this.getCard(cardNum);
      return card.council.vp;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sm-img {
    width: 20px;
    height: 20px;
  }

  .card-img {
    max-height: 80px;
    max-width: 70px;
  }
</style>
