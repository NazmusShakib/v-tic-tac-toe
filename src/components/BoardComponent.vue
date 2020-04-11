<template>
  <div>
    <div> <h3> Hi, Mr. <b>{{ playerName }}</b></h3> </div>
    <div> Next Player is <b>{{ getCurrentPlayer.icon }}</b></div>
    <div v-for="i in 3" :key="i" class="board-row">
      <Square v-for="j in 3" :key="j" :idx="getSquareIndex(i,j)" ></Square>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Square from '@/components/SquareComponent'
  export default {
    name:'board',
    data: () => ({
      //
    }),
    mounted() {
      //
    },
    methods:{
      getSquareIndex(i,j){
        return 3*(i-1) + (j-1)
      },
    },
    components:{
      'Square':Square
    },
    computed: {
      ...mapGetters([
        'getCurrentPlayer', 'getPlayerOne', 'getPlayerTwo'
      ]),
      playerName() {
        return (!this.getPlayerOne.id) ? this.getPlayerTwo.icon : this.getPlayerOne.icon
      }
    }
  }
</script>
