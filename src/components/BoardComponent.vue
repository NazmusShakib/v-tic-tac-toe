<template>
  <div>
    <div> <h3> Hi, Mr. <b>{{ playerName }}</b></h3> </div>
    
    <div class="wrapper wrapper--rounded">
      <h4 style="color: red;"> {{ turnMessage }} </h4>
      <div v-for="i in 3" :key="i" class="board">
        <Square v-for="j in 3" :key="j" :idx="getSquareIndex(i,j)"></Square>
      </div>
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
  }
  .wrapper {
    box-sizing: border-box;
    margin: 1rem auto 2rem;
    padding: 1rem;
    width: 80%;
    max-width: 16rem;
    background: linear-gradient(#222, #222), 
                linear-gradient(to right, red, purple);
    border: 5px solid transparent;
    background-repeat: no-repeat;
    background-origin: padding-box, border-box;
  }
  .wrapper--rounded {
    border-radius: 1rem;
    border-width: 10px;
    position: relative;
  }
  .wrapper--rounded::before {
    position: absolute;
    top: -5px;
    bottom: -5px;
    left: -5px;
    right: -5px;
    border: 6px solid #222;
    border-radius: .8rem;
  }
</style>
