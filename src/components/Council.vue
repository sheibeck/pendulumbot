<template>
  <div class="d-flex flex-column">
    <h2>Council</h2> 
    <div>      
      Enter your votes: <input type="number" v-model="playerVotes" class="text-center" style="width: 50px;" @change="updatePrivelege()" />      
    </div>
    <div class="my-4">
      <AutomaScoreCards />
    </div>    
    <div class="">
      <button type="button" class="btn btn-primary m-1" @click="endCouncil()">End Council</button>     
    </div>
  </div>
</template>

<script>
import AutomaScoreCards from './AutomaScoreCards.vue'
export default {
  name: 'Council',
  props: {    
  },
  components: {
    AutomaScoreCards,
  },
  data () {
    return {      
    }
  },
  computed: {
    playerVotes: {
      get() {
        return this.$store.state.currentGame.player.votes;
      },
      set(value) {
        this.$store.commit('playerVotes', parseInt(value ?? 0));
      }
    },
  },
  methods: {
    endCouncil() {
      //TODO: make sure the player has entered votes or do not allow ending council
      //TODO: add any extra points to the automa for privelege track      
      this.$parent.endCouncil();
    },
    updatePrivelege() {            
      this.$parent.determinePrivelege(false);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
