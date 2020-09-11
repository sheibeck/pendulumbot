<template>
  <div class="d-flex flex-column">
    <h2>Council</h2> 
    <div class="mb-auto">   
      <AutomaScoreCards />
    </div>
    <div>
      <!-- council rules -->
      
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
  methods: {
    endCouncil() {
      this.$parent.endCouncil();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
