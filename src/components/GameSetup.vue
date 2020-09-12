<template>
  <div class="">
    <h4>Game Setup</h4>
    <div class="d-flex align-items-center flex-column mx-4 mb-2">
      <div v-for="diff in difficulties" :key="diff.id" class="py-2">
        <input type="radio" v-model="difficulty" :id="'difficulty'+diff.id" name="difficulty" :value="diff.id">
        <label class="ml-1" :for="'difficulty'+diff.id">{{diff.name}}</label>
      </div>      
      <div class="form-group form-check border-top border-light pt-3 w-100">
        <input type="checkbox" class="form-check-input" id="foreshadowing" v-model="foreshadowing">
        <label class="form-check-label" for="foreshadowing">Enable Foreshadowing?</label>  
      </div>
    </div>
    <button type="button" class="btn btn-primary m-1" @click="startGame()">Start Game</button>
  </div>
</template>

<script>
import {difficulties} from '../assets/data';
export default {
  name: 'GameSetup',
  props: {    
  },
  data () {
    return {  
      difficulties: difficulties(),    
    } 
  },  
  computed: {
    foreshadowing: {
      get () {
        return this.$store.state.currentGame.foreshadowing
      },
      set (value) {
        this.$store.commit('foreshadowing', value)
      }
    },
    difficulty: {
      get () {
        return this.$store.state.currentGame.difficulty
      },
      set (value) {
        this.$store.commit('difficulty', value)
      }
    }    
  },
  methods: {
    startGame() {
      this.$parent.startGame();
    },    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
