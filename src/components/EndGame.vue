<template>
  <div>
    <h2>Game Over</h2>

    <div>
      <div v-for="thing in finalScore" :key="thing.id">
        <div class="d-flex justify-content-center py-4">
          <AutomaColor :id="thing.id" class="mt-2 mr-1" /> <h4 v-if="thing.id==0" class="mt-2">You</h4><h4 v-else class="mt-2">Automa {{thing.id}}</h4>
          <img class="sm-img mx-2" src="../assets/vp.png" /><h4 class="mt-2">{{thing.score}}</h4>
        </div>
      </div>
    </div>

    <div class="">      
      <button type="button" class="btn btn-primary m-1 w-100" @click="newGame()">New Game</button>     
    </div>    
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import {difficulties} from '../assets/data';
import AutomaColor from './AutomaColor.vue'
export default {
  name: 'EndGame',
  props: {    
  },
  components: {
    AutomaColor
  },
  data () {
    return {  
      difficulties: difficulties(),
    } 
  },
  computed: {
    ...mapGetters([
      'game',      
    ]),
    finalScore() {
      return [this.game.player, this.game.automa1, this.game.automa2 ].sort(function(a, b) {        
        return b.score - a.score;
      })
    }
  },
  methods: {
    newGame() {
      this.$parent.newGame();
    },    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .sm-img {
   width:40px;
   height: 40px;
 }
</style>
