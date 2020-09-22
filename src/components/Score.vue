<template>
  <div>
    <div class="small">(Difficulty: {{game.difficulty}} ) Privelege &rarr;</div>
    <div class="d-flex justify-content-between pb-2 border-bottom border-dark">
      <PlayerPrivelege v-for="id in privelege" :key="id" class="" :player="id" />
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
      'privelege',
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
