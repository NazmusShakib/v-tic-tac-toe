<template>
  <div>
    <div> <h3> Hi, Mr. <b>{{ playerName }}</b></h3> </div>
    <div style="margin-bottom: 5px;"> {{ turnMessage }} </div>

    <div v-for="i in 3" :key="i" class="board">
      <Square v-for="j in 3" :key="j" :idx="getSquareIndex(i,j)"></Square>
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
        'getCurrentPlayer', 'getMyself'
      ]),
      playerName() {
        // You go first. It's your turn.
        // Opponent's turn
        // It's your turn
        return this.getMyself.icon
      },
      turnMessage() {
        if(this.getCurrentPlayer.icon == this.getMyself.icon)
          return 'It\'s your turn'
        else
          return 'Opponent\'s turn'
      }
    }
  }
</script>

<style scoped>
  .board{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
 .board > div {
    background-color: #f1f1f1;
    width: 50px;
    margin: 5px;
    text-align: center;
    line-height: 75px;
    font-size: 30px;
  }
</style>
