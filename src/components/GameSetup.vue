<template>
  <div>
    <h2>Game Setup</h2>
    <div class="">
       <div v-for="diff in difficulties" :key="diff.name">
              <input type="radio" name="difficulty" :value="diff.name"> {{diff.name}}
      </div>
      <button type="button" class="btn btn-primary m-1" @click="startGame()">Start Game</button>     
    </div>    
  </div>
</template>

<script>
import {difficulties} from '../assets/data'
export default {
  name: 'GameSetup',
  props: {    
  },
  data () {
    return {  
      difficulties: difficulties(),
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
