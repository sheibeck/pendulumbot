<template>
  <div>    
    <div class="small">
      <h6>Automa 1 <AutomaColor :id="1" /></h6>
      <div class="d-flex">
        <div class="mx-3 border border-dark w-25" v-for="card in automa1ScoreCards" :key="card">{{getCardDetails(card)}}</div>
      </div>
    </div>
    <div class="small mt-4">
      <h6>Automa 2 <AutomaColor :id="2" /></h6>
      <div class="d-flex">
        <div class="mx-3 border border-dark w-25" v-for="card in automa2ScoreCards" :key="card">{{getCardDetails(card)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import AutomaColor from './AutomaColor.vue'
export default {
  name: 'AutomaScoreCards',
  props: {    
  },
  data () {
    return {      
    }
  },
  components: {    
    AutomaColor
  },
  computed: {
    automa1ScoreCards() {
      return this.$store.state.currentGame.automa1.cards;
    },
    automa2ScoreCards() {
      return this.$store.state.currentGame.automa2.cards;
    }, 
  },
  methods: {
    getCardDetails(cardNum) {
      var card = this.$parent.$parent.automaDeck.find(obj => {
            return obj.id === cardNum;
          });

      return card.council.cards[0];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
