<template>
  <div>
    <div class="small">Privelege &rarr;</div>
    <div class="d-flex justify-content-between pb-2 border-bottom border-dark">
      <PlayerPrivelege v-for="player in game.privelege" :key="player.id" class="" :player="player" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import PlayerPrivelege from './PlayerPrivelege.vue'

export default {
  name: 'Score',
  props: {    
  },
  components: {
   PlayerPrivelege,
  },
  computed: {
    ...mapGetters([
      'game'
    ]),
  },
  data () {
    return {      
    }
  },  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
