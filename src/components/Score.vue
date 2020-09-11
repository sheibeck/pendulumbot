<template>
  <div class="d-flex justify-content-between">
    <div>
      <span class="mr-1">
        <svg width="20" height="20">
          <rect width="20" height="20" :style="'fill:' + game.automa1.color +';stroke-width:3;stroke:rgb(0,0,0)'" />
        </svg>
      </span>
      {{game.automa1.score}} ({{game.automa1.votes}})
    </div>
    <div class="px-2">
      Round: {{game.round}}
    </div>
    <div>
      <span class="mr-1">
        <svg width="20" height="20">
          <rect width="20" height="20" :style="'fill:' + game.automa2.color +';stroke-width:3;stroke:rgb(0,0,0)'" />
        </svg>
      </span>
      {{game.automa2.score}} ({{game.automa2.votes}})
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: 'Score',
  props: {    
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
