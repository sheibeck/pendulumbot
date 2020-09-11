<template>
  <div class="">
    <h2>Playing</h2>
    <div id="action">
      <div id="card">
      </div>
    </div>
    <div class="d-flex">
      <button type="button" class="btn btn-primary m-1">Draw</button>
      <button type="button" class="btn btn-secondary m-1 mr-auto">Shuffle</button>
      <button type="button" class="btn btn-dark m-1" @click="startCouncil()">Council</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayGame',
  props: {   
  },
  data () {
    return {
     
    }
  },
  methods: {
    startCouncil() {
      this.$parent.startCouncil();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
