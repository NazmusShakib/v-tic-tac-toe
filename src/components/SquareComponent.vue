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
      'addHistory', 'togglePlayer', 'setCurrentPlayer', 'setScore'
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
      if(this.getCurrentPlayer.icon == this.getMyself.icon) {
        let channel = Channel.subscribeToPusher()
        let history = this.getHistory;
        let squares = history.squares.slice();

        if(history.winner || squares[idx]) {
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

        this.addHistory(payload);
        this.setCurrentPlayer({
          'icon' : payload.nextPlayer,
          'id' : channel.members.me.id
        })
        
        if(winner) {
          this.setScore(winner);
        }
      }
    },
  },
  computed: {
    ...mapGetters([
      'getHistory', 'getCurrentPlayer', 'getMyself', 'getScore'
    ]),
    getVal: function () {
      return this.getHistory['squares'][this.idx];
    },
  }
}
</script>
<style scoped>
  .square{
    border: 3px solid;
    background-color: #222;
    border-image-source: linear-gradient(45deg, rgb(0,143,104), rgb(250,224,66));
    border-image-slice: 1;
    float: left;
    font-size: 40px;
    font-weight: bold;
    height: 50px;
    line-height: 38px;
    color: white;
    /* margin-right: -1px;
    margin-top: -1px; */
    padding: 0;
    text-align: center;
    width: 50px;
  }
</style>
