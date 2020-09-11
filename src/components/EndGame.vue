<template>
  <div>
    <h2>End Game</h2>
    <div class="">      
      <button type="button" class="btn btn-primary m-1" @click="newGame()">New Game</button>     
    </div>    
  </div>
</template>

<script>
import {difficulties} from '../assets/data';
export default {
  name: 'EndGame',
  props: {    
  },
  data () {
    return {  
      difficulties: difficulties(),
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
