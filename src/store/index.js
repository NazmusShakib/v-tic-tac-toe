import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPlayer: {
      id: null,
      icon:'X',
    },
    myself: {
      id: null,
      icon:null
    },
  	history: {
      squares: Array(9).fill(null),
      winner:null,
      nextPlayer: null
    },
    winner:null
  },
  getters:{
    getHistory: (state) => state.history,
    getCurrentPlayer: (state) => state.currentPlayer,
    getMyself: (state) => state.myself,
    getWinner: (state) => state.winner
  },
  mutations: {
    togglePlayer(state){
      state.currentPlayer.icon = state.currentPlayer.icon == 'X' ? '0' : 'X'
    },
    reset(state){
      state.history =
    		{
          squares: Array(9).fill(null),
          winner:null,
          nextPlayer: null
        }
      state.currentPlayer.icon = state.winner ? state.winner : state.currentPlayer.icon
      state.winner=null
    },
    addHistory(state, payload){
      state.history = payload
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
  },
  actions: {
    //
  },
  modules: {
    //
  }
})
