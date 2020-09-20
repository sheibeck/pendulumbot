<template> 
  <div class="">
    <div class="mr-1" v-if="!isEditing" @click="isEditing = true">
      <AutomaColor :id="player" /> <span>{{getPlayerLabel}}</span>
    </div>
    <div class="mr-1" v-if="isEditing">
        <button v-for="color in colors" :key="color" class="p-2" :style="{ 'background-color': color}" @click="setColor(color)">&nbsp;</button>
    </div>
    <div class="p-0 m-0">
      <span v-if="detail.id != 0 || game.round == 4"><img src="../assets/vp.png" />{{detail.score}}</span><img src="../assets/votes.png" />{{detail.votes}}      
    </div>
  </div>    
</template>

<script>
import { mapGetters } from "vuex"
import AutomaColor from './AutomaColor.vue'
export default {
  name: 'PlayerPrivelege',
  props: {
    player: Number
  },
  components: {    
    AutomaColor
  },
  computed: {
    ...mapGetters([
      'game'
    ]),
    detail: {
      get() {
        switch(this.player) {
          case 1:
            return this.game.automa1;
          case 2:
            return this.game.automa2;
          default:
            return this.game.player;
        }
      },
      set(value) {
        switch(this.player) {
          case 1:
            this.$store.commit('automa1', value)
            break;
          case 2:
            this.$store.commit('automa2', value)
            break;
          default:
            this.$store.commit('player', value)
            break;
        }
      }
    },
    color: {
      get() {
        switch(this.player) {
          case 1:
            return this.game.automa1.color;
          case 2:
            return this.game.automa2.color;
          default:
            return this.game.player.color;
        }
      },
      set(value) {
        switch(this.player) {
          case 1:
            this.$set(this.$store.state.currentGame.automa1, 'color', value);
            break;
          case 2:
            this.$set(this.$store.state.currentGame.automa2, 'color', value);
            break;
          default:
            this.$set(this.$store.state.currentGame.player, 'color', value);
            break;
        }
      }      
    },
    getPlayerLabel() {
      return this.detail.id == 0 ? "You" : this.detail.id;
    }
  },
  data () {
    return { 
      isEditing: false, 
      colors: ["blue","white","black","orange","green"]    
    }
  },
  methods: {    
    setColor(color) {
      this.color = color;
      this.isEditing = false;
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
