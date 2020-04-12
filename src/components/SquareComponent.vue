<template>
  <div>
  <button class="square" @click="handleClick(idx)">{{getVal}}</button>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import { mapMutations } from 'vuex'

import Channel from '@/components/ChannelComponent'

export default {
  name: 'square',
  props:[
    'idx'
  ],
  methods:{
    ...mapMutations([
      'addHistory','setWinner','togglePlayer', 'setCurrentPlayer'
    ]),
    calculateWinner: function(squares) {
      const lines = [
        [0, 1, 2],[3, 4, 5],[6, 7, 8],
        [0, 3, 6],[1, 4, 7],[2, 5, 8],
        [0, 4, 8],[2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    },

    handleClick: function(idx) {
      let channel = Channel.subscribeToPusher()
      if(this.getCurrentPlayer.icon == this.getMyself.icon) {

        let history = this.getHistory.slice(0, this.getStepNo+1);
        let current = history[history.length - 1];
        let squares = current.squares.slice();

        if(current.winner || squares[idx]){
          return ;
        }
        squares[idx] = this.getCurrentPlayer.icon;
        let winner = this.calculateWinner(squares);

        this.togglePlayer();
        let payload = {
          'squares':squares,
          'winner': winner,
          'nextPlayer': this.getCurrentPlayer.icon
        }
        channel.trigger('client-send', payload)

        this.addHistory( history.concat([payload]) );
        this.setCurrentPlayer({
          'icon' : payload.nextPlayer,
          'id' : channel.members.me.id
        })
        
        if(winner){
          this.setWinner(winner);
          channel.trigger('client-winner', winner)
        }
      }
    },
  },
  computed: {
    ...mapGetters([
      'getHistory','getStepNo','getCurrentPlayer', 'getMyself'
    ]),
    getVal: function () {
      return this.getHistory[this.getStepNo]['squares'][this.idx];
    },
    getCurrent: function() {
      return this.getHistory[this.getStepNo]
    }
  }
}
</script>
<style scoped>
  .square{
    background: #fff;
    border: 1px solid #999;
    float: left;
    font-size: 24px;
    font-weight: bold;
    line-height: 38px;
    height: 50px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
    width: 50px;
  }
</style>
