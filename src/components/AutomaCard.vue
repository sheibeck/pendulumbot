<template>  
  <div v-if="hasCurrentCard" class="action pt-4 pb-2 px-3 border border-dark d-flex flex-column w-100">
    <div class="d-flex justify-content-center ">
      <img v-if="showCurrentAction.worker.purple" class="mx-2" src="../assets/purple-worker.png" />      
      <img v-if="showCurrentAction.worker.green" class="mx-2" src="../assets/green-worker.png" />            
      <img v-if="showCurrentAction.timer.purple && !council" class="mx-2" src="../assets/purple-timer.png" />      
      <img v-if="showCurrentAction.timer.green && !council" class="mx-2" src="../assets/green-timer.png" />      
      <img v-if="showCurrentAction.timer.black && !council" class="mx-2" src="../assets/black-timer.png" />
      <div v-if="showCurrentAction.province">
        <div :class="{'bg-danger': showCurrentAction.province == 1}" class="bg-secondary border border-dark province m-1 p-1"></div>
        <div :class="{'bg-danger': showCurrentAction.province == 2}" class="bg-secondary border border-dark province m-1 p-1"></div>
        <div :class="{'bg-danger': showCurrentAction.province == 3}" class="bg-secondary border border-dark province m-1 p-1"></div>
        <div :class="{'bg-danger': showCurrentAction.province == 4}" class="bg-secondary border border-dark province m-1 p-1"></div>
      </div>
    </div>
    <div class="text-right">#{{showCurrentAction.id}}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: 'AutomaCard',
  props: {
    council: Boolean
  },
  data () {
    return {      
    }
  },
  computed: {
    ...mapGetters([
      'automaDeck'
    ]),
    getCurrentCard() {
      return this.$store.state.currentGame.currentCard;
    },
    hasCurrentCard() {
      return this.getCurrentCard > 0;
    },
    showCurrentAction() {      
      if (this.hasCurrentCard) {
        let currentCard = this.getCurrentCard;
        return this.automaDeck.find(obj => {
          return obj.id === currentCard;
        });
      } else {
        return null;
      }
    },  
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .province {
    width: 30px;
    height: 30px;
  }
</style>
