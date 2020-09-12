<template>
  <div>
    <h4>Automa Score Cards</h4>
    <div class="">
      {{automa1ScoreCards}}
    </div>
    <div class="">
      {{automa2ScoreCards}}
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
