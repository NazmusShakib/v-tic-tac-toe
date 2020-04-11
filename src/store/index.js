import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPlayer: {
      id: null,
      icon:'X'
    },
    myself: {
      id: null,
      icon:null
    },
  	history: [{
      squares: Array(9).fill(null),
      winner:null,
      nextPlayer: null
    }],
  	stepNo:0,
    winner:null
  },
  getters:{
    getHistory: (state) => state.history,
    getCurrentPlayer: (state) => state.currentPlayer,
    getMyself: (state) => state.myself,
    getStepNo: (state) => state.stepNo,
    getWinner: (state) => state.winner
  },
  mutations: {
    togglePlayer(state){
      state.currentPlayer.icon = state.currentPlayer.icon == 'X' ? '0' : 'X'
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
    setCurrentPlayer(state, playerInfo){
      state.currentPlayer = playerInfo
    },
    setMyself(state, myInfo){
      state.myself = myInfo
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
