<template>
  <div>
    <h2>Council</h2>    
    <div class="">
      <button type="button" class="btn btn-primary m-1" @click="endCouncil()">End Council</button>     
    </div>
  </div>
</template>

<script>
export default {
  name: 'Council',
  props: {    
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
