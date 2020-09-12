<template>
  <div>
    <h4>Automa Council Cards</h4>
    <div class="small pb-3">
      <h5>Automa 1</h5>
      {{getCardDetails(automa1ScoreCards[0])}} →
      {{getCardDetails(automa1ScoreCards[1])}} →
      {{getCardDetails(automa1ScoreCards[2])}}
    </div>
    <div class="small">
      <h5>Automa 2</h5>
      {{getCardDetails(automa2ScoreCards[0])}} →
      {{getCardDetails(automa2ScoreCards[1])}} →
      {{getCardDetails(automa2ScoreCards[2])}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AutomaScoreCards',
  props: {    
  },
  data () {
    return {      
    }
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
