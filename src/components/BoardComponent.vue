<template>
  <div>
    <div> <h3> Hi, Mr. <b>{{ playerName }}</b></h3> </div>

    <div class="row justify-content-center">
      <div class="col-md-4 col-sm-12 col-md-offset-2">
        <div class="wrapper wrapper--rounded">
          <h4 style="color: red;"> {{ turnMessage }} </h4>
          <div v-for="i in 3" :key="i" class="board">
            <Square v-for="j in 3" :key="j" :idx="getSquareIndex(i,j)"></Square>
          </div>
        </div>
        <div class="wrapper">
          <h6>SCORE</h6>
          {{ getScore }}
          <div class="d-flex flex-row bg-secondary">
            <div class="p-2 bg-info flex-fill">X: {{ this.x_score }}</div>
            <div class="p-2 bg-warning flex-fill">O: {{ this.o_score}} </div>
            <div class="p-2 bg-primary flex-fill">Draw: {{ this.draw_score }}</div>
          </div>
        </div>
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
      x_score: 0,
      o_score: 0,
      draw_score: 0
    }),
    mounted() {

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
        'getCurrentPlayer', 'getMyself', 'getScore'
      ]),
      playerName() {
        return this.getMyself.icon
      },
      turnMessage() {
        if(this.getCurrentPlayer.icon == this.getMyself.icon)
          return 'It\'s your turn'
        else
          return 'Opponent\'s turn'
      },
      calculateScore() {
        this.getScore.forEach((icon, index) => {
          this.x_score = (icon == 'X') ? this.x_score ++ : this.x_score
          this.o_score = (icon == 'O') ? this.o_score ++ : this.o_score
          this.draw_score = (icon == 'Draw') ? this.draw_score ++ : this.deaw_score
        });
      },
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

  h6 { 
    display: flex; 
    flex-direction: row;
    color: white 
  } 
          
  h6:before, 
  h6:after { 
    content: "";
    flex: 1 1; 
    border-bottom: 2px solid #fff; 
    margin: auto; 
  } 

</style>
