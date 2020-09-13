<template>
  <div class="">
    <h4>Game Setup</h4>
        
    <!-- purple starting worker -->
    <h6>Purple Worker Setup</h6>
    <div class="d-flex flex-column justify-content-center w-50 m-auto">
      <div class="d-flex w-100">
        <div class="bg-purple border border-dark m-1 p-1 w-75"><img v-if="!purpleWorker" src="../assets/purple-worker.png" /></div>
        <div class="bg-purple border border-dark m-1 p-1 w-25"><img v-if="purpleWorker" src="../assets/purple-worker.png" /></div>
      </div>
      <div class="d-flex w-100">
        <div class="bg-purple border border-dark m-1 p-1 w-25"><img src="../assets/purple-worker.png" /></div>
        <div class="bg-purple border border-dark m-1 p-1 w-75"><img src="../assets/purple-worker.png" /></div>
      </div>
    </div>

    <!-- green starting worker -->
    <h6 class="mt-2">Green Worker Setup</h6>
    <div class="d-flex flex-column justify-content-center w-50 m-auto">
      <div class="d-flex w-100">
        <div class="bg-green border border-dark m-1 p-1 w-75"><img v-if="!greenWorker" src="../assets/green-worker.png" /></div>
        <div class="bg-green border border-dark m-1 p-1 w-25"><img v-if="greenWorker" src="../assets/green-worker.png" /></div>
      </div>
      <div class="d-flex w-100">
        <div class="bg-green border border-dark m-1 p-1 w-25"><img src="../assets/green-worker.png" /></div>
        <div class="bg-green border border-dark m-1 p-1 w-75"><img src="../assets/green-worker.png" /></div>
      </div>
    </div>

    <h6 class="mt-2">Difficulty</h6>
    <div class="d-flex align-items-center flex-column mx-4 mb-2 small">
      <div v-for="diff in difficulties" :key="diff.id" class="py-1">
        <input type="radio" v-model="difficulty" :id="'difficulty'+diff.id" name="difficulty" :value="diff.id">
        <label class="ml-1" :for="'difficulty'+diff.id">{{diff.name}}</label>
      </div>      
      <div class="form-group form-check border-top border-light pt-3 w-100">
        <input type="checkbox" class="form-check-input" id="foreshadowing" v-model="foreshadowing" disabled>
        <label class="form-check-label" for="foreshadowing">Enable Foreshadowing?</label>  
      </div>
    </div>

    <button type="button" class="btn btn-primary m-1 w-100" @click="startGame()">Start Game</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: 'GameSetup',
  created() {
    this.drawStartingWorkers();
  },
  props: {    
  },
  data () {
    return {        
      purpleWorker: false,
      greenWorker: false,    
    } 
  },  
  computed: {
    ...mapGetters([
      'game',
      'difficulties'
    ]),
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
    drawStartingWorkers() {
      this.$parent.shuffleDeck(true);
      this.$parent.drawCard();
      let details = this.$parent.getCardDetails(this.game.currentCard);
      this.purpleWorker = details.worker.purple;

      this.$parent.drawCard();
      details = this.$parent.getCardDetails(this.game.currentCard);
      this.greenWorker = details.worker.green;
    },
    startGame() {
      this.$parent.startGame();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg-green {
  background-color: #6B8330;
}
.bg-purple {
  background-color: #6F4D9C;
}

img {
  height: 30px;
  width: 30px;
}
</style>
