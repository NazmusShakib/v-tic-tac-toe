import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPlayer: {
      id: null,
      icon:'X'
    },
  	history: [{
      squares: Array(9).fill(null),
      winner:null,
      nextPlayer: null
    }],
    playerOne: {
      id: null,
      icon:'X'
    },
    playerTwo: {
      id: null,
      icon:'0'
    },
  	stepNo:0,
    winner:null
  },
  getters:{
    getHistory: (state) => state.history,
    getPlayerOne: (state) => state.playerOne,
    getPlayerTwo: (state) => state.playerTwo,
    getCurrentPlayer: (state) => state.currentPlayer,
    getStepNo: (state) => state.stepNo,
    getWinner: (state) => state.winner
  },
  mutations: {
    changePlayer(state, player) {
      if(player == 'X')
        state.currentPlayer = state.playerOne
      else
        state.currentPlayer = state.playerTwo    
    },
    togglePlayer(state){
      state.currentPlayer = state.currentPlayer.icon == 'X' ? state.playerTwo : state.playerOne
      // console.log('TogglePlayer 1:: ' + JSON.stringify(state.playerOne));
      // console.log('TogglePlayer 2:: ' + JSON.stringify(state.playerTwo));
      // console.log('CurrentPlayer :: ' + JSON.stringify(state.currentPlayer));
    },
    reset(state){
      state.history = [
    		{
          squares: Array(9).fill(null),
          winner:null
        }
    	]
      state.stepNo=0
      state.currentPlayer = state.winner ? state.winner : state.currentPlayer
      state.winner=null
    },
    addHistory(state, payload){
      state.history = payload
      state.stepNo = state.history.length-1
    },
    setPlayerOne(state, playerInfo){
      state.playerOne = playerInfo
    },
    setPlayerTwo(state, playerInfo){
      state.playerTwo = playerInfo
    },
    setCurrentPlayer(state, playerInfo){
      state.currentPlayer = playerInfo
    },
    setWinner(state,winner){
      state.winner=winner;
    },
    setStepNo(state, no){
      state.stepNo = no;
    }
  },
  actions: {
  },
  modules: {
  }
})
