<template> 
  <div class="">
    <div class="mr-1" v-if="!isEditing">
      <svg width="20" height="20">
        <rect width="20" height="20" :style="'fill:' + detail.color +';stroke-width:3;stroke:rgb(0,0,0)'" />
      </svg>
    </div>
    <div class="mr-1" v-if="isEditing">
        COLOR PICKER
    </div>
    <div class="p-0 m-0">
      <img src="../assets/vp.png" />{{detail.score}}<img src="../assets/votes.png" />{{detail.votes}}
    </div>
  </div>    
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: 'PlayerPrivelege',
  props: {
    player: Object
  },
  computed: {
    ...mapGetters([
      'game'
    ]),
    detail: {
      get() {
        switch(this.player.id) {
          case 1:
            return this.game.player;
          case 2:
            return this.game.automa1;
          default:
          return this.game.automa2;
        }
      },
      set(value) {
        switch(this.player.id) {
          case 1:
            this.$store.commit('automa', value)
            break;
          case 2:
            this.$store.commit('automa', value)
            break;
          case 3:
            this.$store.commit('player', value)
            break;
        }
      }      
    }
  },
  data () {
    return { 
      isEditing: false,     
    }
  },
  methods: {
    updateAutoma() {
      if (this.automa == 1) {
        this.detail = {};
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img {
    width: 20px;
    height: 20px;
  }
</style>
