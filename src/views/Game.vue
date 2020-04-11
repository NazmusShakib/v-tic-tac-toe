<template>
  <div class="game">
    <div v-if="!getReady">
      <div class="inner">
        <h1>Welcome to Tic-Tac-Toe Game!</h1>
        <p>Invite a second player by sending them this link {{url}}.</p>
      </div>
    </div>
    <div v-else>
      
    </div>
    <Board v-if="getReady"></Board>
    <div>
      <ol>
          <li v-for="n in getHistoryLen" :key="n">
            <a href="#" @click.prevent="goToStep(n-1)">{{ n-1 == 0 ? 'Game Start':'Move #'+(n-1)}}</a>
          </li>
      </ol>
      <div v-if="getWinner">Winner is {{getWinner}} <button class='reset' @click.prevent="reset()"> reset</button></div>
      <div v-else-if="getHistoryLen == 10">Match Draw <button @click.prevent="reset()"> reset</button></div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { mapMutations } from 'vuex'
  import Board from '@/components/BoardComponent'
  import Channel from '@/components/ChannelComponent'

  export default {
    name: 'game',
    data: () => ({
      presenceid: null,
      players: 1,
      getReady: false,
      url: null
    }),
    created () {
      this.fetchPresence()
    },
    methods:{
      ...mapMutations([
        'changePlayer','reset','setStepNo','setWinner', 'addHistory', 'setCurrentPlayer', 'setPlayerOne', 'setPlayerTwo'
      ]),
      fetchPresence: function() {
        this.presenceid = this.getUniqueId()
        if (!this.checkPresenceID()) {
          var separator = (window.location.href.indexOf('?') === -1) ? '?' : '&'
          window.location.href = window.location.href + separator + this.presenceid
        }
        this.url = window.location.href
        let channel = Channel.subscribeToPusher()
        
        channel.bind('pusher:member_added', members => {
          this.players += 1
          this.getReady = true
        })

        channel.bind('pusher:subscription_succeeded', members => {
          if (members.count === 1 && !this.getPlayerOne.id) {
            this.setPlayerOne({ id: members.myID, icon:'X' })
          } else if (members.count === 2) {
            this.getReady = true
            this.setPlayerTwo({ id: members.myID, icon:'0' })
          }
        })

        channel.bind('pusher:member_removed', member => {
          this.players -= 1
          if (member.count === 1) {
            this.getReady = false
          }
        })

        let history = this.getHistory.slice(0, this.getStepNo+1);
        channel.bind('client-send', (payload) => {
          this.addHistory(history.concat([payload]) );
          this.setCurrentPlayer({
            'icon' : payload.nextPlayer,
            'id' : null
          })
          console.log("OUT:: " + JSON.stringify(this.getCurrentPlayer));
          console.log("Channel IN ID:: " + channel.members.me.id);
        })
      },
      goToStep: function(idx){
        let current = this.getHistory[idx];
        this.setStepNo(idx);
        this.setWinner(current.winner);
        this.changePlayer(current.player);
      },
      getUniqueId () {
        return 'id=' + Math.random().toString(36).substr(2, 8)
      },
      checkPresenceID () {
        let getQueryString = (field, url) => {
          let href = url ? url : window.location.href
          let reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i')
          let string = reg.exec(href)
          return string ? string[1] : null
        }
        let id = getQueryString('id')
        return id
      },
    },
    components:{
      'Board':Board
    },
    computed: {
      ...mapGetters([
        'getHistory','getWinner', 'getPlayerOne', 'getPlayerTwo', 'getStepNo'
      ]),
      getHistoryLen(){
        return this.getHistory.length
      }
    }
  }
</script>
<style scoped>
.game{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
button.reset{
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}
</style>
