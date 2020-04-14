<template>
  <div class="game">
    <div v-if="!getReady">
      <div class="inner">
        <h1>Welcome to Tic-Tac-Toe Game!</h1>
        <p>Invite a second player by sending this link: <br/><span class="invitation-link">{{url}}</span></p>
      </div>
    </div>
    <div v-else>
      <Board></Board>
    </div>

    <div>
      <div v-if="getWinner">
        Winner is {{ getWinner }} <button class='reset' @click.prevent="restartPlay()"> reset</button>
      </div>
      <div v-else-if="getSquaresLength == 9">
        Match Draw <button @click.prevent="restartPlay()"> reset</button>
      </div>
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
      url: null,
      channel: null
    }),
    created () {
      this.channel = Channel.subscribeToPusher()
      this.fetchPresence()
    },
    methods:{
      ...mapMutations([
        'changePlayer','reset', 'addHistory', 'setCurrentPlayer', 'setMyself', 'setScore'
      ]),
      fetchPresence: function() {
        this.presenceid = this.getUniqueId()
        if (!this.checkPresenceID()) {
          var separator = (window.location.href.indexOf('?') === -1) ? '?' : '&'
          window.location.href = window.location.href + separator + this.presenceid
        }
        this.url = window.location.href
        // let channel = Channel.subscribeToPusher()
        
        this.channel.bind('pusher:member_added', members => {
          this.players += 1
          this.getReady = true
        })

        this.channel.bind('pusher:subscription_succeeded', members => {
          if (members.count === 1 && !this.getMyself.id) {
            this.setMyself({ id: members.myID, icon:'X' })
          } else if (members.count === 2) {
            this.getReady = true
            this.setMyself({ id: members.myID, icon:'O' })
          }
        })

        this.channel.bind('pusher:member_removed', member => {
          this.players -= 1
          if (member.count === 1) {
            this.getReady = false
          }
        })

        let history = this.getHistory;
        this.channel.bind('client-send', (payload) => {
          this.addHistory(payload);
          this.setCurrentPlayer({
            'icon' : payload.nextPlayer,
            'id' : this.channel.members.me.id
          })
          if(payload.winner) {
            this.setScore(payload.winner);
          }
        })

        this.channel.bind('client-reset', () => {
          this.reset();
        })
        
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

      restartPlay() {
        this.channel.trigger('client-reset', 'reset-triggered')
        this.reset();
      }
    },
    components:{
      'Board':Board
    },
    computed: {
      ...mapGetters([
        'getHistory', 'getMyself', 'getCurrentPlayer'
      ]),
      getSquaresLength() {
        let length = 0
        let squares = this.getHistory.squares.slice();
        squares.forEach((square, index) => {
          square ? length++ : null
        });
        if(length == 9 && !this.getHistory.winner)
          this.setScore('Draw');

        return length;
      },
      getWinner() {
        return this.getHistory.winner;
      }
    }
  }
</script>
<style scoped>

.invitation-link{
  color: green;
  font-size: 20px;
}

.invitation-link:hover{
  cursor: pointer;
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
