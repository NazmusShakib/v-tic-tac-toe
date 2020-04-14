<template>
  <div>
    <div> <h3> Hi, Your sign is: <b>{{ playerName }}</b></h3> </div>

    <div class="row justify-content-center">
      <div class="col-md-4 col-sm-12 col-md-offset-2">
        
        <div class="wrapper wrapper--rounded">
          <h4 style="color: red;"> 

          <div v-if="getHistory.winner">
              Winner is {{ getHistory.winner }} <button type="button" class="btn btn-primary btn-sm" @click.prevent="restartPlay()">Play Again</button>
          </div>
          <div v-else-if="turnMessage == 'Match draw'">
              {{ turnMessage }} <button type="button" class="btn btn-primary btn-sm" @click.prevent="restartPlay()">Play Again</button>
          </div>
          <div v-else>
            {{ turnMessage }}
          </div>
            
          </h4>
          <div v-for="i in 3" :key="i" class="board">
            <Square v-for="j in 3" :key="j" :idx="getSquareIndex(i,j)"></Square>
          </div>
        </div>

        <div class="wrapper">
          <h6>SCORE</h6>  
          <div class="d-flex flex-row bg-secondary">
            <div class="p-2 bg-info flex-fill">X: {{ calculateScore[0] }}</div>
            <div class="p-2 bg-warning flex-fill">O: {{ calculateScore[1] }} </div>
            <div class="p-2 bg-primary flex-fill">Draw: {{ calculateScore[2] }}</div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import Square from '@/components/SquareComponent'
import Channel from '@/components/ChannelComponent'

  export default {
    name:'board',
    data: () => ({
      //
    }),
    mounted() {
      //
    },
    methods:{
      ...mapMutations([
        'reset','setScore'
      ]),
      getSquareIndex(i,j){
        return 3*(i-1) + (j-1)
      },
      restartPlay() {
        let channel = Channel.subscribeToPusher()
        channel.trigger('client-reset', 'reset-triggered')
        this.reset();
      }
    },
    components:{
      'Square':Square
    },
    computed: {
      ...mapGetters([
        'getCurrentPlayer', 'getHistory', 'getMyself', 'getScore'
      ]),
      playerName() {
        return this.getMyself.icon
      },
      
      turnMessage() {
        let length = 0
        let squares = this.getHistory.squares.slice();
        squares.forEach((square, index) => {
          square ? length++ : null
        });
        if(length == 9) {
          this.setScore('Draw');
          return 'Match draw';
        }

        if(this.getCurrentPlayer.icon == this.getMyself.icon)
          return 'It\'s your turn'
        else
          return 'Opponent\'s turn'
      },
    
      calculateScore() {
        let x_score = 0;
        let o_score = 0;
        let draw_score = 0;
        this.getScore.forEach((icon, index) => {
          if(icon == 'X') {
            x_score = x_score  + 1;
          } else if(icon == 'O') {
            o_score = o_score + 1;
          } else if(icon == 'Draw') {
            draw_score = draw_score + 1;
          }
        });
        
        return [
          x_score,
          o_score,
          draw_score
        ];
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
