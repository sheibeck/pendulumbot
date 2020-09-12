<template>
  <svg width="20" height="20">
    <rect width="20" height="20" :style="'fill:' + getAutomaColor +';stroke-width:3;stroke:rgb(0,0,0)'" />
  </svg>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: 'AutomaColor',
  props: { 
    id: Number   
  }, 
  data () {
    return {         
    }
  },
  computed: {
    ...mapGetters([
      'game'
    ]), 
    getAutomaColor() {
      if (this.id == 1) return this.game.automa1.color;
      if (this.id == 2) return this.game.automa2.color;
      else return this.game.player.color;
    }    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
